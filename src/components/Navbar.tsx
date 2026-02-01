"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useTranslations } from "next-intl";

export default function Navbar() {
    const t = useTranslations("Navbar");

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">SmallPict</span>
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-1 justify-end gap-x-6 items-center">
                    <Link href="/docs/v1.0.0/intro" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                        {t('docs')}
                    </Link>
                    <Link href="/docs/v1.0.0/installation" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                        {t('getStarted')}
                    </Link>
                </div>
            </nav>
        </header>
    );
}
