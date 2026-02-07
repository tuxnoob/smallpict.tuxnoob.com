"use client";

import { motion } from "framer-motion";
import { Wand2, Zap, Server, Cog } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
    const t = useTranslations("Features");

    const features = [
        {
            name: t("f1_title"),
            description: t("f1_desc"),
            icon: Zap,
        },
        {
            name: t("f2_title"),
            description: t("f2_desc"),
            icon: Wand2,
        },
        {
            name: t("f3_title"),
            description: t("f3_desc"),
            icon: Server,
        },
        {
            name: t("f4_title"),
            description: t("f4_desc"),
            icon: Cog,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">{t("title")}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={features.indexOf(feature)} // Use index/content as key since names might change on lang switch
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col items-start"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
