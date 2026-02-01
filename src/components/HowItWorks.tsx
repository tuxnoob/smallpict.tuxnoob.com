"use client";

import { Download, PlayCircle, Gauge } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Install Plugin",
        description: "Download dan install plugin SmallPict di WordPress dashboard Anda.",
        icon: Download,
    },
    {
        id: 2,
        title: "Otomatis Optimasi",
        description: "Upload gambar seperti biasa. SmallPict bekerja di latar belakang mengompresi gambar.",
        icon: PlayCircle,
    },
    {
        id: 3,
        title: "Website Lebih Cepat",
        description: "Nikmati loading speed yang instan dan skor SEO yang lebih baik.",
        icon: Gauge,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white" id="how-it-works">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Cara Kerja
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Tiga langkah mudah menuju website yang lebih ringan.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-gray-100 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center text-center">
                                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-blue-50 shadow-sm">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-sm font-bold text-blue-800">
                                        {step.id}
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
                                <p className="mt-2 text-gray-600 max-w-xs">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
