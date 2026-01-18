const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://smallpict.tuxnoob.com';
const DOCS_DIR = path.join(__dirname, '../docs');
const OUT_DIR = path.join(__dirname, '../out');

async function generateSitemap() {
    console.log('Generating sitemap.xml...');

    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    let urls = [];

    if (fs.existsSync(DOCS_DIR)) {
        const versions = fs.readdirSync(DOCS_DIR).filter(f => fs.statSync(path.join(DOCS_DIR, f)).isDirectory());

        versions.forEach(version => {
            const versionPath = path.join(DOCS_DIR, version);
            const files = fs.readdirSync(versionPath).filter(f => f.endsWith('.mdx'));

            files.forEach(file => {
                const slug = file.replace('.mdx', '');
                const url = `${BASE_URL}/docs/${version}/${slug}`;
                urls.push(url);
            });
        });
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
    console.log(`✅ Sitemap generated at ${path.join(OUT_DIR, 'sitemap.xml')}`);
    console.log(`Included ${urls.length} URLs.`);
}

generateSitemap();
