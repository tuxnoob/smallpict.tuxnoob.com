
import React from 'react';
import Image from 'next/image';

export default function Logo({ className = "h-8" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 font-bold text-xl ${className}`}>
            <Image
                src="/smallpict-logo.png"
                alt="SmallPict Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
            />
            <span className="text-[#3b454e] tracking-tight">SmallPict</span>
        </div>
    );
}
