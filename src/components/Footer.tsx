export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} SmallPict (TuxNoob). All rights reserved.
                    </p>
                    <p className="mt-2 text-center text-sm leading-6 text-gray-600 italic">
                        "SmallPict — solusi ringan untuk website yang ingin tetap cepat tanpa kompromi kualitas."
                    </p>
                </div>
            </div>
        </footer>
    );
}
