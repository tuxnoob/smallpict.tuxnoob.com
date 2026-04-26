import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const docsSidebar = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", slug: "introduction" },
      { label: "Installation", slug: "installation" },
      { label: "Quick Start", slug: "quick-start" },
    ],
  },
  {
    title: "Plugin Guide",
    items: [
      { label: "OTP Onboarding", slug: "otp-onboarding" },
      { label: "Image Settings", slug: "image-settings" },
      { label: "Quota & Usage", slug: "quota-usage" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Authentication", slug: "api/authentication" },
      { label: "Image Processing", slug: "api/image-processing" },
      { label: "Error Codes", slug: "api/error-codes" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-8">
              {docsSidebar.map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold text-sm text-zinc-900 tracking-wide uppercase mb-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {section.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/docs/${item.slug}`}
                          className="block text-sm text-zinc-500 hover:text-blue-600 transition-colors py-1 px-3 rounded-md hover:bg-blue-50"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="prose prose-zinc prose-blue max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-900 prose-pre:text-zinc-100">
            {children}
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
}
