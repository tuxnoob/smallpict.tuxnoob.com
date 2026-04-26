"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function Testimonials() {
    const t = useTranslations("Testimonials");

    const testimonials = [
        {
            body: t("t1"),
            author: { name: "Rian Saputra", handle: "Tech Blogger" },
        },
        {
            body: t("t2"),
            author: { name: "Sarah Wijaya", handle: "Travel Enthusiast" },
        },
        {
            body: t("t3"),
            author: { name: "Budi Santoso", handle: "Agency Owner" },
        },
    ];

    return (
        <section className="py-28 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        {t("heading")}
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card rounded-2xl p-8 group hover:border-indigo-500/20 transition-all"
                        >
                            <Quote className="w-8 h-8 text-indigo-500/30 mb-4" />
                            <blockquote className="text-gray-300 text-base leading-relaxed mb-6">
                                &ldquo;{testimonial.body}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-x-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    {testimonial.author.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-white text-sm">{testimonial.author.name}</div>
                                    <div className="text-xs text-gray-500">{testimonial.author.handle}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
