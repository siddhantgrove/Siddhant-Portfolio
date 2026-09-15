import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function CursorGlow() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      setMouse({ x, y });

      setTrail((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x,
          y,
        },
      ].slice(-15));
    };

    window.addEventListener("mousemove", move);

    return () => {
        window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Cursor Trail */}
      {/* {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: point.x - 4,
            y: point.y - 4,
            opacity: (index + 1) / trail.length,
            scale: (index + 1) / trail.length,
          }}
          transition={{
            duration: 0.15,
          }}
          className="fixed w-2 h-2 rounded-full bg-amber-600 pointer-events-none z-40"
        />
      ))} */}

      {/* Cursor Dot */}
      {/* <motion.div
        animate={{
          x: mouse.x - 5,
          y: mouse.y - 5,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
        className="fixed w-2.5 h-2.5 rounded-full bg-amber-600 pointer-events-none z-50"
      /> */}

      {/* Cursor Glow */}
      <motion.div
        animate={{
          x: mouse.x - 175,
          y: mouse.y - 175,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className="fixed top-0 left-0 w-87.5 h-87.5 rounded-full pointer-events-none z-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,199,40,0.18) 0%, transparent 90%)",
          filter: "blur(55px)",
        }}
      />
    </>
  );
}