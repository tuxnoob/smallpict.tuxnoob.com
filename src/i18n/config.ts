export const locales = [
    'en',
    'id',
    'zh',
    'ja',
    'ru',
    'es',
    'fr',
    'de',
    'pt',
    'ar',
    'hi',
    'ko',
    'it',
    'nl',
    'pl',
    'tr',
    'vi',
    'th'
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
