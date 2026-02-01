import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !['en', 'id', 'zh', 'ja', 'ru', 'es', 'fr', 'de', 'pt', 'ar', 'hi', 'ko', 'it', 'nl', 'pl', 'tr', 'vi', 'th'].includes(locale)) {
        locale = 'id';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
