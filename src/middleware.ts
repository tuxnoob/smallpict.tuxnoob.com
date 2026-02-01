import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: [
        'en', 'id', 'zh', 'ja', 'ru',
        'es', 'fr', 'de', 'pt', 'ar', 'hi', 'ko', 'it', 'nl', 'pl', 'tr', 'vi', 'th'
    ],

    // Used when no locale matches
    defaultLocale: 'id'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(id|en|zh|ja|ru|es|fr|de|pt|ar|hi|ko|it|nl|pl|tr|vi|th)/:path*']
};
