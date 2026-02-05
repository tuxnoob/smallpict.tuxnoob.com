"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                {/* Links Section */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
                    <Link href="/docs/v1/intro" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {t('docs')}
                    </Link>
                    <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {t('privacy')}
                    </Link>
                    <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {t('terms')}
                    </Link>
                    <a href="mailto:support@tuxnoob.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {t('contact')}
                    </a>
                </div>

                {/* Brand Message & Copyright */}
                <div className="text-center border-t border-gray-100 pt-8">
                    <p className="text-sm leading-6 text-gray-600 italic max-w-2xl mx-auto mb-4">
                        "{t('brandMessage')}"
                    </p>
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} {t('rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
