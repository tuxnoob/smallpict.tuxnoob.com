import React from "react";
import Link from "next/link";
import { Folder } from "lucide-react";
import fs from "fs";
import path from "path";
import Logo from "./Logo";

export default async function Sidebar() {
    const docsPath = path.join(process.cwd(), "docs");
    let versions: string[] = [];

    try {
        if (fs.existsSync(docsPath)) {
            versions = fs.readdirSync(docsPath).filter((f) => {
                return fs.statSync(path.join(docsPath, f)).isDirectory();
            });
        }
    } catch (e) {
        console.error("Error reading docs versions:", e);
    }

    // Sort versions desc (v2, v1)
    versions.sort().reverse();

    return (
        <aside className="w-[280px] h-screen bg-[#f5f7f9] border-r border-[#e6ecf1] flex flex-col shrink-0 sticky top-0">
            <div className="p-6 border-b border-[#e6ecf1] bg-white">
                <Link href="/">
                    <Logo />
                </Link>
                <div className="mt-4 px-2">
                    <Link
                        href="/pricing"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md transition-all border border-transparent hover:border-gray-100 hover:shadow-sm"
                    >
                        <span className="text-lg">💰</span> Pricing
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {versions.map((version) => {
                    // Logic to read files inside each version
                    const versionPath = path.join(docsPath, version);
                    let files: string[] = [];
                    try {
                        if (fs.existsSync(versionPath)) {
                            files = fs.readdirSync(versionPath)
                                .filter(f => f.endsWith('.mdx'))
                                .map(f => f.replace('.mdx', ''));

                            // Sort: intro first, then alphabetical
                            files.sort((a, b) => {
                                if (a === 'intro') return -1;
                                if (b === 'intro') return 1;
                                return a.localeCompare(b);
                            });
                        }
                    } catch (e) {
                        console.error(`Error reading files in ${version}:`, e);
                    }

                    return (
                        <div key={version}>
                            <h3 className="font-semibold text-[#9daab6] uppercase text-xs mb-3 flex items-center gap-1 px-2 tracking-wider">
                                <Folder size={12} /> {version}
                            </h3>
                            <ul className="space-y-0.5 border-l border-[#e6ecf1] ml-2 pl-3">
                                {files.map(file => (
                                    <li key={file}>
                                        <Link
                                            href={`/docs/${version}/${file}`}
                                            className="text-[14px] text-[#5c6975] hover:text-[#3b454e] hover:border-l-4 hover:border-blue-500 hover:bg-white hover:shadow-sm block py-1.5 px-2 -ml-3 transition-all rounded-r capitalize"
                                        >
                                            {file === 'intro' ? 'Introduction' : file.replace(/-/g, ' ')}
                                        </Link>
                                    </li>
                                ))}
                                {/* Fallback if no files found (legacy support) */}
                                {files.length === 0 && (
                                    <li>
                                        <Link
                                            href={`/docs/${version}/installation`}
                                            className="text-[14px] text-[#5c6975] hover:text-[#3b454e] block py-1.5"
                                        >
                                            Installation
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    );
                })}

                {versions.length === 0 && (
                    <p className="text-sm text-gray-400">No documentation versions found.</p>
                )}
            </div>
        </aside>
    );
}
