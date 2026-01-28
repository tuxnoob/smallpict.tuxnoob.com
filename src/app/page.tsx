
import Image from "next/image";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <Image
          src="/logo.svg"
          alt="TuxNoob Logo"
          width={300}
          height={80}
          priority
        />

        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
          Image Optimization,<br />
          <span className="text-blue-600">Reimagined.</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Unlock the power of serverless image compression without the complexity.
          SmallPict offloads heavy processing to our cloud, making your WordPress site
          faster, lighter, and more scalable instantly.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <Link
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium text-lg h-14 px-8 flex items-center justify-center transform hover:-translate-y-0.5"
            href="/docs/v1.0.0/installation"
          >
            Get Started Free
          </Link>
          <Link
            className="rounded-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-lg h-14 px-8 flex items-center justify-center"
            href="/docs/v1.0.0/intro"
          >
            How it Works
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left max-w-5xl w-full">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Zero Server Load</h3>
            <p className="text-gray-600">Stop slowing down your server with heavy image processing. We handle the CPU-intensive work in the cloud.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Simply Magical</h3>
            <p className="text-gray-600">No complex server configuration, no API keys to manage. Just install the plugin and let us handle the rest.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="text-3xl mb-4">💎</div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Premium Quality</h3>
            <p className="text-gray-600">AI-powered resizing, smart compression (WebP/AVIF), and perfect visual fidelity for your media.</p>
          </div>
        </div>

        <PricingSection />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TuxNoob. All rights reserved.
      </footer>
    </div>
  );
}
