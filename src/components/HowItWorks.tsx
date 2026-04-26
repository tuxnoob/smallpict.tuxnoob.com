"use client";

import { motion } from "framer-motion";
import { Download, PlayCircle, Gauge } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
    const t = useTranslations("HowItWorks");

    const steps = [
        { id: 1, title: t("step1_title"), description: t("step1_desc"), icon: Download },
        { id: 2, title: t("step2_title"), description: t("step2_desc"), icon: PlayCircle },
        { id: 3, title: t("step3_title"), description: t("step3_desc"), icon: Gauge },
    ];

    return (
        <section className="py-28 relative" id="how-it-works">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="mt-4 text-lg text-gray-400"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-16 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/5 bg-gray-900">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20">
                                        <step.icon className="h-9 w-9 text-white" />
                                    </div>
                                    <span className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-indigo-500 border-4 border-gray-950 flex items-center justify-center text-xs font-bold text-white">
                                        {step.id}
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                                <p className="mt-2 text-gray-400 max-w-xs text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
