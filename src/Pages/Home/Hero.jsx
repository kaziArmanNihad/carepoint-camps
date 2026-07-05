"use client";

import { motion } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineClipboardDocumentCheck,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: "120+", label: "Camps hosted" },
  { value: "40k+", label: "Patients registered" },
  { value: "2.3k", label: "Volunteers active" },
];

const roles = [
  {
    icon: HiOutlineHeart,
    title: "Doctors",
    description: "Create and run camps, track cases in real time.",
    bg: "bg-emerald-50",
    fg: "text-emerald-700",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Volunteers",
    description: "Join camps and manage tasks from one dashboard.",
    bg: "bg-orange-50",
    fg: "text-orange-700",
  },
  {
    icon: HiOutlineClipboardDocumentCheck,
    title: "Patients",
    description: "Register for free checkups in a couple of taps.",
    bg: "bg-amber-50",
    fg: "text-amber-700",
  },
  {
    icon: HiOutlineSquares2X2,
    title: "Admins",
    description: "Oversee users, resources, and camp activity.",
    bg: "bg-violet-50",
    fg: "text-violet-700",
  },
];

const camps = [
  {
    name: "Dhaka camp",
    status: "Live",
    top: "225px",
    left: "6px",
    initial: "D",
    bg: "bg-emerald-100",
    fg: "text-emerald-800",
    delay: 0,
  },
  {
    name: "Sylhet camp",
    status: "Prep",
    top: "50px",
    left: "170px",
    initial: "V",
    bg: "bg-orange-100",
    fg: "text-orange-800",
    delay: 0.6,
  },
  {
    name: "Khulna camp",
    status: "Live",
    top: "-6px",
    left: "300px",
    initial: "P",
    bg: "bg-amber-100",
    fg: "text-amber-800",
    delay: 1.2,
  },
];

export default function CarePointHero() {
  return (
    <section className="bg-white shadow-xl overflow-hidden pt-20 mx-auto">
      {/* HERO PANEL */}
      <div className="mx-4 md:mx-6 rounded-[28px] bg-gradient-to-br from-[#0A3B3A] to-[#0F5C56] px-8 md:px-12 py-12 md:py-16 relative overflow-hidden">
        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* LEFT */}
          <div>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8944A]" />
              <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">
                Medical camp management
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-white text-4xl md:text-[44px] leading-[1.1] font-semibold mb-5"
              style={{
                fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              }}
            >
              Run life changing camps, not spreadsheets
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-white/70 text-[15px] leading-relaxed mb-8 max-w-md"
            >
              CarePoint Camps handles registration, resourcing, and payments in
              one place so doctors, volunteers, and patients can focus on the
              care itself.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-10"
            >
              <button className="bg-CPC-ocean text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#e2853a] transition-colors">
                Start a camp
              </button>
              <button className="text-white text-sm font-medium px-2 py-3 flex items-center gap-2 group">
                See live demo
                <HiOutlineArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-white text-2xl font-semibold"
                    style={{
                      fontFamily:
                        "var(--font-display, 'Space Grotesk', sans-serif)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/55 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: signature "live camp map" element */}
          <motion.div
            variants={itemVariants}
            className="relative h-[360px] hidden md:block"
          >
            <svg viewBox="0 0 420 360" className="w-full h-full">
              <path
                d="M60 280 C 140 200, 160 140, 240 110 S 340 60, 380 40"
                stroke="#ffffff33"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6 8"
              />
              <circle cx="60" cy="280" r="4" fill="#ffffff55" />
              <circle cx="240" cy="110" r="4" fill="#ffffff55" />
              <circle cx="380" cy="40" r="4" fill="#ffffff55" />
            </svg>

            {camps.map((camp) => (
              <motion.div
                key={camp.name}
                className="absolute"
                style={{ left: camp.left, top: camp.top }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: camp.delay,
                }}
              >
                <div className="bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full ${camp.bg} flex items-center justify-center ${camp.fg} text-[10px] font-bold`}
                  >
                    {camp.initial}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#0A3B3A] leading-none">
                      {camp.name}
                    </p>
                    <p className="text-[10px] text-[#6b7975] leading-none mt-0.5">
                      {camp.status}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* floating summary card */}
            <div className="absolute bottom-0 right-0 bg-white rounded-2xl shadow-2xl p-4 w-[220px]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-[#0A3B3A] tracking-wide">
                  Live today
                </p>
                <span className="flex items-center gap-1 text-[10px] text-[#0F6E56] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />3
                  camps
                </span>
              </div>
              <div className="flex -space-x-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-emerald-800">
                  Dr
                </div>
                <div className="w-7 h-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-orange-800">
                  Vo
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-amber-800">
                  Pt
                </div>
                <div className="w-7 h-7 rounded-full bg-[#eef2ef] border-2 border-white flex items-center justify-center text-[9px] font-bold text-[#3c4a46]">
                  +9
                </div>
              </div>
              <p
                className="text-[20px] font-semibold text-[#0A3B3A] leading-none"
                style={{
                  fontFamily:
                    "var(--font-display, 'Space Grotesk', sans-serif)",
                }}
              >
                214{" "}
                <span className="text-[11px] font-medium text-[#6b7975]">
                  patients checked in
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ROLE CARDS */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 md:px-12 py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.title}
              variants={itemVariants}
              className="bg-sky-100 rounded-2xl p-5"
            >
              <div
                className={`w-9 h-9 rounded-full ${role.bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-4 h-4 ${role.fg}`} />
              </div>
              <p className="font-semibold text-sm text-[#0A3B3A] mb-1">
                {role.title}
              </p>
              <p className="text-[12px] text-[#6b7975] leading-relaxed">
                {role.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
