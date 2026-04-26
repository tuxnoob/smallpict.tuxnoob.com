// src/components/marketing/ToolCta.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Image, Zap } from "lucide-react";

export default function ToolCta() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs font-medium"
          >
            <Zap className="w-3.5 h-3.5" />
            Free Browser Tool
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Convert & Compress{" "}
            <span className="gradient-text">Without Uploading</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-zinc-400 leading-relaxed"
          >
            Drag and drop your images. We convert them to WebP and compress them
            right in your browser. Your files never touch our servers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/tool"
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25"
            >
              <Image className="w-5 h-5" />
              Try the Free Tool
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-sm text-zinc-500">No signup required</span>
          </motion.div>
        </div>

        {/* Mini preview stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { label: "Avg Savings", value: "-78%" },
            { label: "Formats", value: "WebP" },
            { label: "Max File Size", value: "50 MB" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-4 text-center"
            >
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
