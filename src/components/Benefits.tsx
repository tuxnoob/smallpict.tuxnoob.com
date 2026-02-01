import { CheckCircle2 } from "lucide-react";

const benefits = [
    "Website lebih cepat",
    "Gambar tetap tajam",
    "Tidak perlu setting rumit",
    "Hemat bandwidth dan storage",
];

export default function Benefits() {
    return (
        <section className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-x-4 rounded-xl bg-gray-50/50 p-6 ring-1 ring-inset ring-gray-200">
                            <CheckCircle2 className="h-7 w-7 flex-none text-blue-600" aria-hidden="true" />
                            <div className="text-base leading-7 font-semibold text-gray-900">{benefit}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
