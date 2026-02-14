"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ImageComparison from "./ImageComparison";

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
                                href="/docs/v1/installation"
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
                                <ImageComparison
                                    beforeLabel={t('before')}
                                    afterLabel={t('after')}
                                    beforeSubLabel="2.3MB"
                                    afterSubLabel="350KB"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
