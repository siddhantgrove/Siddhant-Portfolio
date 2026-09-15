import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function Cursor() {
    const [particles, setParticles] = useState([]);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, {
    stiffness: 500,
    damping: 40,
  });

  const y = useSpring(mouseY, {
    stiffness: 500,
    damping: 40,
  });

  useEffect(() => {
   const move = (e) => {
  mouseX.set(e.clientX);
  mouseY.set(e.clientY);

  setParticles((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      x: e.clientX,
      y: e.clientY,
      offsetX: (Math.random() - 0.5) * 20,
      offsetY: (Math.random() - 0.5) * 20,
      size: Math.random() * 5 + 3,
    },
  ].slice(-25));
};

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
    {particles.map((particle) => (
  <motion.div
    key={particle.id}
    initial={{
      opacity: 1,
      scale: 1,
      x: particle.x,
      y: particle.y,
    }}
    animate={{
      opacity: 0,
      scale: 0,
      x: particle.x + particle.offsetX,
      y: particle.y + particle.offsetY,
    }}
    transition={{
      duration: 0.5,
      ease: "easeOut",
    }}
    onAnimationComplete={() =>
      setParticles((prev) =>
        prev.filter((p) => p.id !== particle.id)
      )
    }
    className="fixed pointer-events-none rounded-full z-9997"
    style={{
      width: particle.size,
      height: particle.size,
      background: "#fbbf24",
      boxShadow: "0 0 15px #fbbf24",
    }}
  />
))}
      {/* Cursor Dot */}

     <motion.div
  style={{ x, y }}
  className="fixed left-0 top-0 z-9999 h-0.1 w-0.1 rounded-full bg-amber-500 ..."
/>

      {/* Spotlight */}

   <motion.div
  style={{ x, y }}
  animate={{ rotate: 360 }}
  transition={{
    rotate: {
      repeat: Infinity,
      duration: 800,
      ease: "linear",
    },
  }}
  className="
fixed
left-0
top-0
-translate-x-1/2
-translate-y-1/2
pointer-events-none
z-9999
text-amber-500
text-2xl
font-black
"
>
  {"🌟"}
  
</motion.div>

   {/* Cursor Glow */}

     {/* <motion.div
  style={{
    x,
    y,
    background:
      "radial-gradient(circle, rgba(255,199,40,0.18) 0%, transparent 90%)",
    filter: "blur(55px)",
  }}
/> */}
    </>
  );
}