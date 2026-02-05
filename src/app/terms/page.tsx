export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">Terms of Service</h1>
                <p className="text-sm text-gray-500 mb-8">Last updated: February 2026</p>

                <div className="prose prose-gray max-w-none">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 mb-4">
                        By using SmallPict (&quot;Service&quot;), you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use our service.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
                    <p className="text-gray-600 mb-4">
                        SmallPict is a cloud-based image optimization service for WordPress. We provide automatic
                        compression and format conversion (WebP, AVIF) to help improve your website performance.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Account &amp; Registration</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>You must provide accurate information when activating the plugin.</li>
                        <li>You are responsible for maintaining the security of your WordPress site.</li>
                        <li>One license is valid for one WordPress installation unless otherwise specified.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Usage Limits &amp; Fair Use</h2>
                    <p className="text-gray-600 mb-4">
                        Each subscription plan includes a monthly image processing quota. Usage beyond your quota
                        will be queued until the next billing cycle or you upgrade your plan.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Free tier: Limited monthly quota for personal/testing use.</li>
                        <li>Paid tiers: Higher quotas based on your subscription level.</li>
                        <li>Abuse or excessive automated usage may result in service suspension.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Acceptable Use</h2>
                    <p className="text-gray-600 mb-4">You agree NOT to use our service to:</p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Process illegal, harmful, or offensive content.</li>
                        <li>Infringe on intellectual property rights of others.</li>
                        <li>Attempt to bypass usage limits or security measures.</li>
                        <li>Resell or redistribute the service without authorization.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Payment &amp; Refunds</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Payments are processed securely through Freemius.</li>
                        <li>Subscriptions auto-renew unless cancelled before the renewal date.</li>
                        <li>We offer a 14-day money-back guarantee for first-time purchases.</li>
                        <li>Refund requests after 14 days are evaluated on a case-by-case basis.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Service Availability</h2>
                    <p className="text-gray-600 mb-4">
                        We strive for 99.9% uptime but do not guarantee uninterrupted service.
                        Scheduled maintenance will be announced in advance when possible.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
                    <p className="text-gray-600 mb-4">
                        SmallPict is provided &quot;as is&quot; without warranties. We are not liable for any indirect,
                        incidental, or consequential damages arising from the use of our service.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Termination</h2>
                    <p className="text-gray-600 mb-4">
                        We reserve the right to suspend or terminate accounts that violate these terms.
                        You may cancel your subscription at any time through the WordPress dashboard.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact</h2>
                    <p className="text-gray-600 mb-4">
                        For questions about these Terms of Service, contact us at:<br />
                        Email: support@tuxnoob.com
                    </p>
                </div>
            </div>
        </div>
    );
}
