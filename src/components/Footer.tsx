"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();

    return (
        <footer className="relative border-t border-white/5">
            {/* Gradient divider */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                {/* Links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
                    <Link href="/tool" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">
                        {t("tool")}
                    </Link>
                    <Link href="/docs/introduction" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">
                        {t("docs")}
                    </Link>
                    <Link href={`/${locale}/privacy`} className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">
                        {t("privacy")}
                    </Link>
                    <Link href={`/${locale}/terms`} className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">
                        {t("terms")}
                    </Link>
                    <a href="mailto:support@tuxnoob.com" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">
                        {t("contact")}
                    </a>
                </div>

                {/* Brand + Copyright */}
                <div className="text-center border-t border-white/5 pt-8">
                    <p className="text-sm leading-6 text-gray-600 italic max-w-2xl mx-auto mb-4">
                        &ldquo;{t("brandMessage")}&rdquo;
                    </p>
                    <p className="text-xs leading-5 text-gray-600">
                        &copy; {new Date().getFullYear()} {t("rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
