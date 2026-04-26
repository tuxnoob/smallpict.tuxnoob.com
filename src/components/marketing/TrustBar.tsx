// src/components/marketing/TrustBar.tsx
"use client";

import { Shield, Lock, Cpu, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: Shield, label: "100% Browser Local", desc: "No server uploads" },
  { icon: Lock, label: "Privacy First", desc: "Images never leave your device" },
  { icon: Cpu, label: "Web Worker Powered", desc: "Non-blocking processing" },
  { icon: EyeOff, label: "Zero Tracking", desc: "Optional anonymous stats only" },
];

export default function TrustBar() {
  return (
    <section className="py-10 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
