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
        <aside className="w-[280px] h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 sticky top-0">
            <div className="p-6 border-b border-gray-100">
                <Link href="/">
                    <Logo />
                </Link>
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
                            <h3 className="font-semibold text-gray-500 uppercase text-xs mb-2 flex items-center gap-1">
                                <Folder size={12} /> {version}
                            </h3>
                            <ul className="space-y-1 pl-2 border-l border-gray-200">
                                {files.map(file => (
                                    <li key={file}>
                                        <Link
                                            href={`/docs/${version}/${file}`}
                                            className="text-sm hover:text-blue-600 block py-1 capitalize"
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
                                            className="text-sm hover:text-blue-600 block py-1"
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
