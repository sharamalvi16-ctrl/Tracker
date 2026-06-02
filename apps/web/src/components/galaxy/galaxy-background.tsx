"use client";

import { motion } from "framer-motion";

export function GalaxyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden galaxy-field">
      <div className="star-layer" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] rounded-full border border-cyan-300/15"
        animate={{ rotate: 360, scale: [1, 1.06, 1] }}
        transition={{
          rotate: { duration: 34, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute bottom-[-14rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/16 blur-3xl"
        animate={{ x: [-20, 20, -20], y: [0, -26, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />
    </div>
  );
}
