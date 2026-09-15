import { motion } from "motion/react";

const techs = [
  { name: "React.js", top: "22%", left: "8%", rotate: -45 },
  { name: "Node.js", top: "78%", left: "10%", rotate: -28 },
  { name: "MongoDB", top: "20%", right: "10%", rotate: 48 },
  { name: "Express.js", top: "62%", right: "6%", rotate: 35 },
  { name: "Next.js", top: "34%", right: "12%", rotate: 55 },
  { name: "Tailwind", top: "72%", right: "18%", rotate: 18 },
  { name: "SEO", top: "58%", left: "4%", rotate: -38 },
  { name: "Prisma", top: "80%", right: "5%", rotate: 14 },
];

export default function FloatingTech() {
  return (
    <>
      {techs.map((item, index) => (
        <motion.span
          key={index}
          className="absolute text-gray-500 text-sm tracking-[0.3em] select-none pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            rotate: `${item.rotate}deg`,
          }}
          animate={{
            y: [-6, 6, -6],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.name}
        </motion.span>
      ))}
    </>
  );
}