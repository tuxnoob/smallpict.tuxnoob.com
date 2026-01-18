"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Folder } from "lucide-react";

// Note: In client component we can't use fs.readdir directly.
// We must receive the versions as props or fetch via API.
// BUT, the prompt asked to Use fs.readdirSync to modify Sidebar.tsx.
// This implies Sidebar might be a SERVER Component or updated via build script?
// "Update komponen Sidebar.tsx agar bisa auto-detect versi..."
// "Gunakan fs.readdirSync..."
// -> This MUST be a Server Component to use `fs`.

import fs from "fs";
import path from "path";

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
        <aside className="w-64 h-screen bg-gray-50 border-r p-4 hidden md:block">
            <div className="mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    SmallPict Docs
                </h2>
            </div>

            <div className="space-y-4">
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
