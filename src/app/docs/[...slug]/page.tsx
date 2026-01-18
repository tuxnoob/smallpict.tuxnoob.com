import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import { SEO } from "@/components/SEO";

// Force static generation for GitHub Pages
export const dynamic = "force-static";

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

// Helper to get MDX source
async function getMdxContent(slug: string[]) {
    const [version, ...rest] = slug;
    if (!version) return null;

    const fileName = rest.join("/") || "index";
    const filePath = path.join(process.cwd(), "docs", version, `${fileName}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, "utf8");
    return source;
}

// 1. Generate Metadata by regex-parsing the <SEO /> tag
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const source = await getMdxContent(slug);

    if (!source) return {};

    // Naive Regex to extract title/desc from <SEO /> component
    const titleMatch = source.match(/title="([^"]+)"/);
    const descMatch = source.match(/description="([^"]+)"/);

    return {
        title: titleMatch ? titleMatch[1] : "SmallPict Documentation",
        description: descMatch ? descMatch[1] : "SmallPict Documentation",
    };
}

// 2. Static Params for Export (Required for output: export)
export async function generateStaticParams() {
    const docsDir = path.join(process.cwd(), "docs");
    if (!fs.existsSync(docsDir)) return [];

    const params: { slug: string[] }[] = [];
    const versions = fs.readdirSync(docsDir).filter((f) =>
        fs.statSync(path.join(docsDir, f)).isDirectory()
    );

    versions.forEach((version) => {
        const versionPath = path.join(docsDir, version);
        const files = fs.readdirSync(versionPath).filter((f) => f.endsWith(".mdx"));

        files.forEach((file) => {
            const name = file.replace(".mdx", "");
            // slug is [version, name]
            params.push({ slug: [version, name] });
        });
    });

    return params;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const source = await getMdxContent(slug);

    if (!source) {
        notFound();
    }

    const { content } = await compileMDX({
        source: source,
        components: { SEO, Callout: (props: any) => <div {...props} /> }, // Add components here
        options: { parseFrontmatter: true }, // We rely on component for SEO, but frontmatter support is good
    });

    return (
        <div className="flex">
            <main className="flex-1 max-w-4xl mx-auto p-8 prose prose-slate">
                {/* Render parsed MDX */}
                {content}
            </main>
        </div>
    );
}
