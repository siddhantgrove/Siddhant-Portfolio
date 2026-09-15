import { motion } from "motion/react";
import { FaCircle } from "react-icons/fa";

export default function ExperienceCard({
  icon: Icon,
  title,
  company,
  year,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="relative rounded-3xl border border-gray-200 bg-white p-10 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Icon */}

      <Icon className="text-4xl text-amber-500 mb-8" />

      {/* Date */}

      <div className="absolute right-8 top-8 rounded-full bg-gray-100 px-5 py-2 flex items-center gap-2">
        <FaCircle className="text-amber-500 text-[8px]" />
        <span className="text-gray-500 text-sm">
          {year}
        </span>
      </div>

      <h3 className="text-4xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-gray-500 text-xl">
        {company}
      </p>
    </motion.div>
  );
}