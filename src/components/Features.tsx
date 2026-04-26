"use client";

import { motion } from "framer-motion";
import { Zap, Wand2, Server, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
    const t = useTranslations("Features");

    const features = [
        {
            name: t("f1_title"),
            description: t("f1_desc"),
            icon: Zap,
            gradient: "from-amber-500 to-orange-500",
        },
        {
            name: t("f2_title"),
            description: t("f2_desc"),
            icon: Wand2,
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            name: t("f3_title"),
            description: t("f3_desc"),
            icon: Server,
            gradient: "from-emerald-500 to-teal-500",
        },
        {
            name: t("f4_title"),
            description: t("f4_desc"),
            icon: Shield,
            gradient: "from-sky-500 to-blue-500",
        },
    ];

    return (
        <section className="py-28 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
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
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                {feature.name}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
