import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const DOCS_DIR = path.join(process.cwd(), "docs", "content");

function getDocFile(slugParts: string[], locale: string): string | null {
  const slugPath = slugParts.join("/");

  // Try locale-specific file first, then fallback to English
  const localePath = path.join(DOCS_DIR, locale, `${slugPath}.mdx`);
  if (fs.existsSync(localePath)) return localePath;

  const fallbackPath = path.join(DOCS_DIR, "en", `${slugPath}.mdx`);
  if (fs.existsSync(fallbackPath)) return fallbackPath;

  return null;
}

interface Props {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugParts = slug || ["introduction"];
  const filePath = getDocFile(slugParts, locale);

  if (!filePath) {
    return buildMetadata({
      locale,
      title: "Documentation",
      description: "SmallPict documentation and guides.",
      pathname: `/docs/${slugParts.join("/")}`,
    });
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);

  return buildMetadata({
    locale,
    title: data.title || "Documentation",
    description: data.description || "SmallPict documentation and guides.",
    pathname: `/docs/${slugParts.join("/")}`,
  });
}

export default async function DocsPage({ params }: Props) {
  const { locale, slug } = await params;
  const slugParts = slug || ["introduction"];

  const filePath = getDocFile(slugParts, locale);
  if (!filePath) notFound();

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  return (
    <div>
      {data.title && (
        <div className="not-prose mb-8 pb-6 border-b border-zinc-200">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            {data.title}
          </h1>
          {data.description && (
            <p className="mt-2 text-lg text-zinc-500">{data.description}</p>
          )}
        </div>
      )}
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
