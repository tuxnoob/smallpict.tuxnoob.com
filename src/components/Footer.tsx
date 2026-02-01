"use client";

import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col items-center justify-center lg:px-8">
                <div className="text-center">
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} {t('rights')}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600 italic max-w-2xl mx-auto">
                        "{t('brandMessage')}"
                    </p>
                </div>
            </div>
        </footer>
    );
}
