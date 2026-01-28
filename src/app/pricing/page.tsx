'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        FS: any;
    }
}

interface PlanConfig {
    id: string; // The internal ID for our logic
    plan_id: string; // Freemius Plan ID
    title: string;
    monthlyPrice: string;
    annualPrice: string;
    description: string;
    features: string[];
    quota: string;
    highlight?: boolean;
    buttonText?: string;
    licenseConfig?: 'single' | 'select' | 'fixed_10' | 'custom';
}

const PLANS: PlanConfig[] = [
    {
        id: 'free',
        plan_id: '38287',
        title: 'Free',
        monthlyPrice: '$0',
        annualPrice: '$0',
        description: 'For hobbyists and testing.',
        features: ['20 MB Monthly Quota', '2 MB Max File', 'WebP Conversion', 'Community Support'],
        quota: '20 MB',
        buttonText: 'Get Free',
        licenseConfig: 'single'
    },
    {
        id: 'starter',
        plan_id: '38949',
        title: 'Starter',
        monthlyPrice: '$5',
        annualPrice: '$50',
        description: 'For personal blogs.',
        features: ['200 MB Monthly Quota', '10 MB Max File', 'WebP Conversion', 'Email Support'],
        quota: '200 MB',
        licenseConfig: 'single'
    },
    {
        id: 'pro',
        plan_id: '38951',
        title: 'Pro',
        monthlyPrice: '$15',
        annualPrice: '$150',
        description: 'For professionals.',
        features: ['600 MB Monthly Quota', '32 MB Max File', 'AVIF + WebP', 'Priority Support', 'Smart Scaling'],
        quota: '600 MB',
        highlight: true,
        licenseConfig: 'single'
    },
    {
        id: 'business',
        plan_id: '38952',
        title: 'Business',
        monthlyPrice: '$39',
        annualPrice: '$450',
        description: 'For growing sites.',
        features: ['1.5 GB Monthly Quota', '64 MB Max File', 'AVIF + WebP', 'Premium Support', 'Aggressive Scaling'],
        quota: '1.5 GB',
        licenseConfig: 'select'
    },
    {
        id: 'agency',
        plan_id: '38953',
        title: 'Agency',
        monthlyPrice: '$99',
        annualPrice: '$1100',
        description: 'For agencies.',
        features: ['4 GB Monthly Quota', '128 MB Max File', 'AVIF + WebP', 'Dedicated Support', '10 Site Licenses'],
        quota: '4 GB',
        licenseConfig: 'fixed_10'
    },
    {
        id: 'enterprise',
        plan_id: 'custom',
        title: 'Enterprise',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        description: 'For large scale.',
        features: ['Custom Quota', 'Unlimited File Size', 'Custom SLA', 'Dedicated Infra'],
        quota: 'Custom',
        buttonText: 'Coming Soon',
        licenseConfig: 'custom'
    }
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [businessLicenses, setBusinessLicenses] = useState(1);

    // Handlers cache
    // We can't easily cache handler instances because they depend on plan_id which is static,
    // but the OPEN call depends on billing cycle.
    // Actually, FS.Checkout instance is tied to plan_id.

    const handleCheckout = (plan: PlanConfig) => {
        if (!window.FS) {
            console.error('Freemius script not loaded');
            return;
        }

        if (plan.id === 'enterprise') return;

        const handler = new window.FS.Checkout({
            product_id: '22816',
            plan_id: plan.plan_id,
            public_key: 'pk_e17eb3527c02a11d4709dc8313f52',
            image: 'https://smallpict.tuxnoob.com/icon.ico' // Assuming generic logo or icon
        });

        const openConfig: any = {
            name: 'smallpict',
            billing_cycle: billingCycle,
            purchaseCompleted: (response: any) => {
                console.log('Purchase completed:', response);
            },
            success: (response: any) => {
                console.log('Success:', response);
            }
        };

        if (plan.licenseConfig === 'select' && plan.id === 'business') {
            openConfig.licenses = businessLicenses;
        } else if (plan.licenseConfig === 'fixed_10') {
            openConfig.licenses = 10;
        } else {
            openConfig.licenses = 1;
        }

        handler.open(openConfig);
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <Script src="https://checkout.freemius.com/js/v1/" strategy="lazyOnload" />

            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Simple, transparent pricing
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                    Choose the plan that fits your needs.
                </p>

                {/* Toggle */}
                <div className="mt-8 flex justify-center">
                    <div className="relative bg-gray-100 p-0.5 rounded-lg flex sm:mt-8">
                        <button
                            type="button"
                            className={`${billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'} relative py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-all`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly billing
                        </button>
                        <button
                            type="button"
                            className={`${billingCycle === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'} relative py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-all`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            Annual billing <span className="text-xs text-green-600 font-bold ml-1">(-20%)</span>
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-none lg:grid-cols-3 xl:grid-cols-3">
                    {PLANS.map((plan) => (
                        <div key={plan.id} className={`rounded-lg shadow-sm divide-y divide-gray-200 border ${plan.highlight ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 bg-white'} flex flex-col`}>
                            <div className="p-6 flex-1">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.title}</h3>
                                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                                <p className="mt-8">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                                    </span>
                                    {plan.monthlyPrice !== 'Custom' && plan.monthlyPrice !== '$0' && (
                                        <span className="text-base font-medium text-gray-500">
                                            {billingCycle === 'monthly' ? '/mo' : '/yr'}
                                        </span>
                                    )}
                                </p>

                                {/* License Selector for Business */}
                                {plan.id === 'business' && (
                                    <div className="mt-4">
                                        <select
                                            value={businessLicenses}
                                            onChange={(e) => setBusinessLicenses(parseInt(e.target.value))}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value="1">Single Site License</option>
                                            <option value="3">3-Site License</option>
                                        </select>
                                    </div>
                                )}

                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCheckout(plan);
                                    }}
                                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${plan.id === 'enterprise'
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : plan.highlight
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                        }`}
                                >
                                    {plan.buttonText || 'Buy ' + plan.title}
                                </a>
                            </div>
                            <div className="pt-6 pb-8 px-6 bg-gray-50 rounded-b-lg">
                                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex space-x-3">
                                            {/* Check Icon */}
                                            <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
