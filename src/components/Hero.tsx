"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-44">
            {/* Floating Glow Orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                            WordPress Image Optimization
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 leading-[1.1]">
                            {t.rich("headline", {
                                blue: (chunks) => (
                                    <span className="gradient-text">{chunks}</span>
                                ),
                            })}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-400 max-w-xl">
                            {t("subheadline")}
                        </p>
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-4">
                            <Link
                                href="/docs/installation"
                                className="relative inline-flex items-center px-8 py-3.5 text-base font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25"
                            >
                                {t("ctaPrimary")}
                            </Link>
                            <Link
                                href="#demo"
                                className="group inline-flex items-center px-6 py-3.5 text-base font-semibold text-gray-300 rounded-full border border-white/10 hover:border-white/20 hover:text-white transition-all hover:bg-white/5"
                            >
                                {t("ctaSecondary")} <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Visual: Compression Demo Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-16 lg:mt-0 relative"
                    >
                        <div className="glass-card rounded-2xl p-1 glow-md">
                            <div className="rounded-xl bg-gray-900 overflow-hidden">
                                <div className="aspect-[16/10] flex items-center justify-center p-10 relative">
                                    {/* Subtle background grid */}
                                    <div className="absolute inset-0 grid-pattern opacity-50" />

                                    <div className="relative text-center">
                                        <div className="text-5xl mb-4">⚡</div>
                                        <div className="text-white font-bold text-xl mb-8">{t("compressResult")}</div>
                                        <div className="flex flex-row gap-12 justify-center items-end">
                                            <div className="flex flex-col items-center">
                                                <motion.div
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    transition={{ duration: 0.8, delay: 0.6 }}
                                                    className="h-32 w-20 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg relative origin-bottom"
                                                >
                                                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                                        2.3MB
                                                    </span>
                                                </motion.div>
                                                <span className="mt-3 text-sm text-gray-500 font-medium">{t("before")}</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <motion.div
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    transition={{ duration: 0.8, delay: 0.9 }}
                                                    className="h-12 w-20 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg relative origin-bottom"
                                                >
                                                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                                        350KB
                                                    </span>
                                                </motion.div>
                                                <span className="mt-3 text-sm text-gray-500 font-medium">{t("after")}</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-emerald-400 font-semibold text-sm">
                                            ↓ 85% smaller
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
