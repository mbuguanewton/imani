"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimedMessage } from "@/hooks/useTimedMessage";

interface MessageCardProps {
  message: TimedMessage;
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message.theme}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl"
      >
        <div
          className="absolute inset-0 -z-10 opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${message.colors[0]}, transparent)`,
          }}
        />

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message.title}
        </motion.h2>

        <motion.p
          className="text-lg leading-relaxed text-zinc-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {message.body}
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div
            className="h-1 w-12 rounded-full"
            style={{ backgroundColor: message.colors[0] }}
          />
          <span className="text-sm font-medium uppercase tracking-widest text-zinc-400">
            Valentine's Day 2026
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
