"use client";

import { useTranslations } from "next-intl";

export default function Testimonials() {
    const t = useTranslations("Testimonials");

    const testimonials = [
        {
            body: t("t1"),
            author: {
                name: "Rian Saputra",
                handle: "Tech Blogger",
                imageUrl: "https://ui-avatars.com/api/?name=Rian+Saputra&background=0D8ABC&color=fff",
            },
        },
        {
            body: t("t2"),
            author: {
                name: "Sarah Wijaya",
                handle: "Travel Enthusiast",
                imageUrl: "https://ui-avatars.com/api/?name=Sarah+Wijaya&background=ffb300&color=fff",
            },
        },
        {
            body: t("t3"),
            author: {
                name: "Budi Santoso",
                handle: "Agency Owner",
                imageUrl: "https://ui-avatars.com/api/?name=Budi+Santoso&background=4caf50&color=fff",
            },
        },
    ];

    return (
        <section className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">{t("title")}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {t("heading")}
                    </p>
                </div>
                <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="rounded-2xl bg-white p-8 ring-1 ring-gray-200 shadow-sm leading-relaxed">
                                <blockquote className="text-gray-900 text-lg mb-6">
                                    “{testimonial.body}”
                                </blockquote>
                                <div className="flex items-center gap-x-4">
                                    <img
                                        className="h-10 w-10 rounded-full bg-gray-50"
                                        src={testimonial.author.imageUrl}
                                        alt=""
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                                        <div className="text-sm leading-6 text-gray-600">{testimonial.author.handle}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
