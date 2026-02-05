export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last updated: February 2026</p>

                <div className="prose prose-gray max-w-none">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                    <p className="text-gray-600 mb-4">
                        SmallPict (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data.
                        This privacy policy explains how we collect, use, and safeguard your information when you use our WordPress image optimization service.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Data We Collect</h2>
                    <p className="text-gray-600 mb-4">We collect the following types of information:</p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li><strong>Account Information:</strong> Email address and website URL when you activate the plugin.</li>
                        <li><strong>Usage Data:</strong> Number of images processed, file sizes, and optimization statistics.</li>
                        <li><strong>Technical Data:</strong> WordPress version, PHP version, and plugin version for compatibility.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Image Processing &amp; Storage</h2>
                    <p className="text-gray-600 mb-4">
                        <strong>We do NOT store your images.</strong> When you upload an image through our service:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Your image is temporarily processed in our secure cloud infrastructure.</li>
                        <li>The optimized image is immediately sent back to your WordPress site.</li>
                        <li>Both the original and optimized versions are deleted from our servers within minutes.</li>
                        <li>We do not keep any copies of your images.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. How We Use Your Data</h2>
                    <p className="text-gray-600 mb-4">We use collected data to:</p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Provide and maintain our image optimization service.</li>
                        <li>Track your usage quota and manage your subscription.</li>
                        <li>Send important service updates and notifications.</li>
                        <li>Improve our service quality and performance.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Security</h2>
                    <p className="text-gray-600 mb-4">
                        We implement industry-standard security measures including encryption in transit (HTTPS/TLS),
                        secure cloud infrastructure, and regular security audits to protect your data.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Third-Party Services</h2>
                    <p className="text-gray-600 mb-4">We use the following third-party services:</p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li><strong>Freemius:</strong> For license management and payment processing.</li>
                        <li><strong>AWS:</strong> For cloud infrastructure and image processing.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
                    <p className="text-gray-600 mb-4">
                        You have the right to access, correct, or delete your personal data.
                        Contact us at privacy@tuxnoob.com for any data-related requests.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
                    <p className="text-gray-600 mb-4">
                        For any questions about this Privacy Policy, please contact us at:<br />
                        Email: privacy@tuxnoob.com
                    </p>
                </div>
            </div>
        </div>
    );
}
