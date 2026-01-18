
import Image from "next/image";
import Link from "next/link";

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

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          SmallPict Documentation
        </h1>

        <p className="text-lg text-gray-600 max-w-md">
          Serverless Image Optimization for WordPress.
          Secure, Scalable, and Cost-Effective.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/docs/v1.0.0/intro"
          >
            Read Documentation
          </Link>
          <a
            className="rounded-full border border-solid border-gray-200 transition-colors flex items-center justify-center hover:bg-gray-100 text-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://tuxnoob.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit TuxNoob
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TuxNoob. All rights reserved.
      </footer>
    </div>
  );
}
