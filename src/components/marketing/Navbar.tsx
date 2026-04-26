"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Wand2 } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-xl border-b border-white/5" />
      <nav className="relative mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SmallPict</span>
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-end gap-x-8 items-center">
          <Link
            href="/tool"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Wand2 className="w-4 h-4" />
            {t("tool")}
          </Link>
          <Link
            href="/docs/introduction"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {t("docs")}
          </Link>
          <Link
            href="/pricing"
            className="relative inline-flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            {t("getStarted")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="relative md:hidden border-t border-white/5 bg-gray-950/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <Link
            href="/tool"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors py-2"
          >
            <Wand2 className="w-4 h-4" />
            {t("tool")}
          </Link>
          <Link
            href="/docs/introduction"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-zinc-400 hover:text-white transition-colors py-2"
          >
            {t("docs")}
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block text-center px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all"
          >
            {t("getStarted")}
          </Link>
        </div>
      )}
    </header>
  );
}
