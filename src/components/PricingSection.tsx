"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

declare global {
    interface Window {
        FS: any;
    }
}

interface PlanConfig {
    id: string;
    plan_id: string;
    title: string;
    monthlyPrice: string;
    annualPrice: string;
    description: string;
    features: string[];
    quota: string;
    highlight?: boolean;
    buttonText?: string;
    licenseConfig?: "single" | "select" | "fixed_10" | "custom";
}

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
    const t = useTranslations("Pricing");

    const PLANS: PlanConfig[] = [
        {
            id: "free",
            plan_id: "38287",
            title: t("plans.free.title"),
            monthlyPrice: "$0",
            annualPrice: "$0",
            description: t("plans.free.description"),
            features: [
                "Auto-Convert to WebP",
                "20 MB Monthly Quota",
                "Max File Size 2 MB",
                "Standard Queue",
                "Community & Docs Support",
            ],
            quota: "20 MB",
            buttonText: t("plans.free.button"),
            licenseConfig: "single",
        },
        {
            id: "starter",
            plan_id: "38949",
            title: t("plans.starter.title"),
            monthlyPrice: "$5",
            annualPrice: "$50",
            description: t("plans.starter.description"),
            features: [
                "Auto-Convert to WebP",
                "200 MB Monthly Quota",
                "Max File Size 10 MB",
                "Regular Queue Priority",
                "Direct Email Support",
            ],
            quota: "200 MB",
            buttonText: t("plans.starter.button"),
            licenseConfig: "single",
        },
        {
            id: "pro",
            plan_id: "38951",
            title: t("plans.pro.title"),
            monthlyPrice: "$15",
            annualPrice: "$150",
            description: t("plans.pro.description"),
            features: [
                "AVIF + WebP (30% smaller)",
                "600 MB Monthly Quota",
                "Max File Size 32 MB",
                "Premium Queue Priority",
                "VIP Priority Support",
            ],
            quota: "600 MB",
            highlight: true,
            buttonText: t("plans.pro.button"),
            licenseConfig: "single",
        },
    ];

    const handleCheckout = (plan: PlanConfig) => {
        if (!window.FS) {
            console.error("Freemius script not loaded");
            return;
        }
        if (plan.id === "enterprise") return;

        const handler = new window.FS.Checkout({
            product_id: "22816",
            plan_id: plan.plan_id,
            public_key: "pk_e17eb3527c02a11d4709dc8313f52",
            image: "https://smallpict.tuxnoob.com/icon.ico",
        });

        handler.open({
            name: "smallpict",
            billing_cycle: billingCycle,
            licenses: 1,
            purchaseCompleted: (response: any) => console.log("Purchase:", response),
            success: (response: any) => console.log("Success:", response),
        });
    };

    return (
        <section className="py-28 relative" id="pricing">
            <Script src="https://checkout.freemius.com/js/v1/" strategy="lazyOnload" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl text-center mb-16"
                >
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3">
                        {t("title")}
                    </h2>
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {t("heading")}
                    </p>
                    <p className="mt-6 text-lg text-gray-400">{t("subheading")}</p>
                </motion.div>

                {/* Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="relative p-1 rounded-full bg-white/5 border border-white/10 inline-flex">
                        <button
                            type="button"
                            className={`${
                                billingCycle === "monthly"
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-gray-400 hover:text-white"
                            } relative py-2 px-6 rounded-full text-sm font-medium transition-all`}
                            onClick={() => setBillingCycle("monthly")}
                        >
                            {t("monthly")}
                        </button>
                        <button
                            type="button"
                            className={`${
                                billingCycle === "annual"
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-gray-400 hover:text-white"
                            } relative py-2 px-6 rounded-full text-sm font-medium transition-all`}
                            onClick={() => setBillingCycle("annual")}
                        >
                            {t("annual")}{" "}
                            <span className="text-xs text-emerald-400 font-bold ml-1">
                                {t("annualDiscount")}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all ${
                                plan.highlight
                                    ? "glass-card border-indigo-500/30 glow-md scale-105 z-10"
                                    : "glass-card glass-card-hover"
                            }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                                        {t("plans.pro.popular")}
                                    </span>
                                </div>
                            )}

                            <div>
                                <h3 className={`text-xl font-semibold ${plan.highlight ? "text-indigo-300" : "text-white"}`}>
                                    {plan.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-5xl font-bold tracking-tight text-white">
                                        {billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                                    </span>
                                    {plan.monthlyPrice !== "$0" && (
                                        <span className="text-sm font-medium text-gray-500">
                                            {billingCycle === "monthly" ? t("monthSuffix") : t("yearSuffix")}
                                        </span>
                                    )}
                                </p>

                                <ul role="list" className="mt-8 space-y-3 text-sm">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3 text-left">
                                            <Check className="h-5 w-5 flex-none text-indigo-400" />
                                            <span className="text-gray-400">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCheckout(plan);
                                }}
                                className={`mt-8 block w-full rounded-lg py-3 px-3 text-center text-sm font-semibold transition-all ${
                                    plan.highlight
                                        ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
                                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                                }`}
                            >
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Enterprise CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl text-center mt-24"
                >
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3">
                        {t("enterprise.badge")}
                    </h2>
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("enterprise.title")}
                    </p>
                    <p className="mt-4 text-lg text-gray-400">{t("enterprise.subtitle")}</p>
                    <a
                        href="mailto:support@tuxnoob.com"
                        className="mt-8 inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-400 rounded-lg border border-white/10 hover:border-indigo-500/30 hover:text-indigo-300 transition-all"
                    >
                        {t("enterprise.button")}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
