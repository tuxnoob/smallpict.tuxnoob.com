"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                            {t.rich('headline', {
                                blue: (chunks) => <span className="text-blue-600">{chunks}</span>
                            })}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {t('subheadline')}
                        </p>
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                            <Link
                                href="/docs/v1.0.0/installation"
                                className="rounded-full bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                {t('ctaPrimary')}
                            </Link>
                            <Link
                                href="#demo"
                                className="rounded-full bg-white px-8 py-3.5 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all"
                            >
                                {t('ctaSecondary')} <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Visual/Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-16 lg:mt-0 relative"
                    >
                        <div className="relative rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <div className="rounded-xl bg-white shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
                                {/* Placeholder for Dashboard Mockup */}
                                <div className="aspect-[16/10] bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center p-10">
                                    <div className="text-center">
                                        <div className="text-4xl mb-4">⚡</div>
                                        <div className="text-gray-900 font-bold text-xl mb-4">{t('compressResult')}</div>
                                        <div className="mt-4 flex flew-row gap-8 justify-center items-end">
                                            <div className="flex flex-col items-center">
                                                <div className="h-32 w-16 bg-red-200 rounded-t-lg relative group">
                                                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-red-500">2.3MB</span>
                                                </div>
                                                <span className="mt-2 text-sm text-gray-500">{t('before')}</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="h-12 w-16 bg-green-500 rounded-t-lg relative group">
                                                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-green-800">350KB</span>
                                                </div>
                                                <span className="mt-2 text-sm text-gray-500">{t('after')}</span>
                                            </div>
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
