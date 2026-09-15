import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer, configFromEnv } from "../server/index.mjs";
import { DEMO, DEMO_IDEA, matchesSchema, enquiryUrl } from "../src/components/concept.mjs";

const brief = { idea: DEMO_IDEA, vibe: "premium" };
const completed = (concept = DEMO) => ({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(concept) }] }] });

async function harness(t, overrides = {}, provider = async () => Response.json(completed()), now) {
  const calls = [];
  const config = { ...configFromEnv({}), key: "test-only-not-real", perHour: 20, ...overrides };
  const server = createServer({ config, now, fetchImpl: async (...args) => { calls.push(args); return provider(...args); } });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}/api/concept`;
  return {
    calls,
    async post(body = brief, options = {}) {
      return fetch(url, { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body), ...options, headers: { "Content-Type": "application/json", Origin: "http://localhost:5173", ...options.headers } });
    },
    url,
  };
}

test("shared contract and WhatsApp snapshot", () => {
  assert.equal(matchesSchema(DEMO), true);
  assert.equal(matchesSchema({ ...DEMO, palette: "url(javascript:bad)" }), false);
  assert.equal(matchesSchema({ ...DEMO, headline: "x".repeat(86) }), false);
  assert.equal(matchesSchema({ ...DEMO, sections: [] }), false);
  assert.equal(matchesSchema({ ...DEMO, script: "bad" }), false);
  assert.equal(matchesSchema(null), false);
  const link = new URL(enquiryUrl({ ...brief, source: "ai", concept: DEMO }));
  assert.equal(link.hostname, "wa.me");
  assert.ok(link.searchParams.get("text").includes(DEMO_IDEA));
  assert.ok(link.searchParams.get("text").includes("not a confirmed scope or quote"));
});

test("successful response uses the Responses API, strict schema and server-side key", async (t) => {
  const h = await harness(t);
  const response = await h.post();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { source: "ai", ...brief, concept: DEMO });
  const [url, options] = h.calls[0];
  assert.equal(url, "https://api.openai.com/v1/responses");
  assert.equal(options.headers.Authorization, "Bearer test-only-not-real");
  const request = JSON.parse(options.body);
  assert.equal(request.store, false);
  assert.equal(request.text.format.strict, true);
  assert.equal(request.max_output_tokens, 1500);
  assert.deepEqual(JSON.parse(request.input), brief);
});

test("wrong origin, method, bad JSON, oversized and invalid briefs make no provider calls", async (t) => {
  const h = await harness(t);
  assert.equal((await h.post(brief, { headers: { Origin: "https://untrusted.example" } })).status, 403);
  assert.equal((await fetch(h.url)).status, 405);
  assert.equal((await h.post("not json")).status, 400);
  assert.equal((await h.post({ idea: "short", vibe: "premium" })).status, 400);
  assert.equal((await h.post({ ...brief, vibe: "unknown" })).status, 400);
  assert.equal((await h.post({ ...brief, injected: true })).status, 400);
  assert.equal((await h.post({ idea: "x".repeat(9000), vibe: "premium" })).status, 413);
  assert.equal((await h.post(brief, { headers: { "Content-Type": "text/plain" } })).status, 415);
  assert.equal(h.calls.length, 0);
});

test("missing key and disabled production fail closed", async (t) => {
  const missing = await harness(t, { key: "" });
  assert.equal((await missing.post()).status, 503);
  assert.equal(missing.calls.length, 0);
  const disabled = await harness(t, { enabled: false });
  assert.equal((await disabled.post()).status, 503);
  assert.equal(disabled.calls.length, 0);
  assert.equal(configFromEnv({ NODE_ENV: "production" }).enabled, false);
});

test("provider failures never expose raw provider errors or return a fake AI sample", async (t) => {
  const h = await harness(t, {}, async () => Response.json({ error: "private upstream diagnostic" }, { status: 401 }));
  const response = await h.post();
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.source, undefined);
  assert.ok(!body.error.includes("private upstream"));
});

test("refusal, incomplete responses and invalid model content are handled", async (t) => {
  const variants = [
    [{ status: "completed", output: [{ content: [{ type: "refusal", refusal: "No" }] }] }, 422],
    [{ status: "incomplete", output: [] }, 502],
    [completed({ ...DEMO, palette: "invalid" }), 502],
    [{ status: "completed", output: [{ content: [{ type: "output_text", text: "{bad" }] }] }, 502],
  ];
  for (const [payload, expected] of variants) {
    const h = await harness(t, {}, async () => Response.json(payload));
    assert.equal((await h.post()).status, expected);
  }
});

test("rate limiter does not trust spoofed forwarded IP headers", async (t) => {
  const h = await harness(t, { perHour: 1 });
  assert.equal((await h.post()).status, 200);
  const limited = await h.post(brief, { headers: { "X-Forwarded-For": "203.0.113.99" } });
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);
  assert.equal(h.calls.length, 1);
});

test("global daily allowance resets the next UTC day", async (t) => {
  let timestamp = 0;
  const h = await harness(t, { dailyLimit: 1 }, undefined, () => timestamp);
  assert.equal((await h.post()).status, 200);
  assert.equal((await h.post()).status, 429);
  timestamp = 86400001;
  assert.equal((await h.post()).status, 200);
  assert.equal(h.calls.length, 2);
});

test("concurrency reservation is released after a request", async (t) => {
  let release;
  let started;
  const startedPromise = new Promise((resolve) => { started = resolve; });
  const pending = new Promise((resolve) => { release = resolve; });
  const h = await harness(t, { concurrency: 1 }, async () => { started(); await pending; return Response.json(completed()); });
  const first = h.post();
  await startedPromise;
  try { assert.equal((await h.post()).status, 429); }
  finally { release(); }
  assert.equal((await first).status, 200);
  assert.equal((await h.post()).status, 200);
});

test("upstream timeout aborts the fetch", async (t) => {
  const h = await harness(t, { timeoutMs: 10 }, async (_, options) => new Promise((resolve, reject) => {
    options.signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
  }));
  assert.equal((await h.post()).status, 504);
});
