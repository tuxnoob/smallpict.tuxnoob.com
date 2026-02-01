'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';

declare global {
    interface Window {
        FS: any;
    }
}

interface PlanConfig {
    id: string; // The internal ID
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

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [businessLicenses, setBusinessLicenses] = useState(1);
    const t = useTranslations("Pricing");

    const PLANS: PlanConfig[] = [
        {
            id: 'free',
            plan_id: '38287',
            title: t('plans.free.title'),
            monthlyPrice: '$0',
            annualPrice: '$0',
            description: t('plans.free.description'),
            features: ['20 MB', '2 MB Max File', 'WebP', 'No Scaling (Queue)', 'Community Support'], // Retaining some technical details as they are standard units
            quota: '20 MB',
            buttonText: t('plans.free.button'),
            licenseConfig: 'single'
        },
        {
            id: 'starter',
            plan_id: '38949',
            title: t('plans.starter.title'),
            monthlyPrice: '$5',
            annualPrice: '$50',
            description: t('plans.starter.description'),
            features: ['200 MB', '10 MB Max File', 'WebP', 'No Scaling (Instant)', 'Email Support'],
            quota: '200 MB',
            buttonText: t('plans.starter.button'),
            licenseConfig: 'single'
        },
        {
            id: 'pro',
            plan_id: '38951',
            title: t('plans.pro.title'),
            monthlyPrice: '$15',
            annualPrice: '$150',
            description: t('plans.pro.description'),
            features: ['600 MB', '32 MB Max File', 'AVIF + WebP', 'Standard Scaling', 'Priority Support'],
            quota: '600 MB',
            highlight: true,
            buttonText: t('plans.pro.button'),
            licenseConfig: 'single'
        },
        {
            id: 'business',
            plan_id: '38952',
            title: t('plans.business.title'),
            monthlyPrice: '$39',
            annualPrice: '$450',
            description: t('plans.business.description'),
            features: ['1.5 GB', '64 MB Max File', 'AVIF + WebP', 'Aggressive Scaling', 'Premium Support'],
            quota: '1.5 GB',
            buttonText: t('plans.business.button'),
            licenseConfig: 'select'
        },
        {
            id: 'agency',
            plan_id: '38953',
            title: t('plans.agency.title'),
            monthlyPrice: '$99',
            annualPrice: '$1100',
            description: t('plans.agency.description'),
            features: ['4 GB', '128 MB Max File', 'AVIF + WebP', 'Aggressive Scaling', 'Dedicated Support', '10 Site Licenses'],
            quota: '4 GB',
            buttonText: t('plans.agency.button'),
            licenseConfig: 'fixed_10'
        },
        {
            id: 'enterprise',
            plan_id: 'custom',
            title: t('plans.enterprise.title'),
            monthlyPrice: 'Custom',
            annualPrice: 'Custom',
            description: t('plans.enterprise.description'),
            features: ['Custom Quota', 'Unlimited File Size', 'Aggressive Scaling', 'Dedicated Infra', 'Custom SLA'],
            quota: 'Custom',
            buttonText: t('plans.enterprise.button'),
            licenseConfig: 'custom'
        }
    ];

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
            image: 'https://smallpict.tuxnoob.com/icon.ico'
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
        <section className="bg-white py-24 sm:py-32" id="pricing">
            <Script src="https://checkout.freemius.com/js/v1/" strategy="lazyOnload" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">{t("title")}</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {t("heading")}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {t("subheading")}
                    </p>
                </div>

                {/* Toggle */}
                <div className="mt-10 flex justify-center">
                    <div className="relative bg-gray-100 p-0.5 rounded-lg flex">
                        <button
                            type="button"
                            className={`${billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'} relative py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-all`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            {t("monthly")}
                        </button>
                        <button
                            type="button"
                            className={`${billingCycle === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'} relative py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-all`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            {t("annual")} <span className="text-xs text-green-600 font-bold ml-1">{t("annualDiscount")}</span>
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {PLANS.map((plan) => (
                        <div key={plan.id} className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${plan.highlight ? 'ring-2 ring-blue-600 shadow-xl scale-105 z-10' : ''}`}>
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 className={`text-2xl font-semibold leading-8 ${plan.highlight ? 'text-blue-600' : 'text-gray-900'}`}>{plan.title}</h3>
                                    {plan.highlight && (
                                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">{t("plans.pro.popular")}</span>
                                    )}
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                                        {/* Dynamic Price Calculation for Business */}
                                        {plan.id === 'business' ? (
                                            billingCycle === 'monthly'
                                                ? (businessLicenses === 1 ? '$29' : '$39')
                                                : (businessLicenses === 1 ? '$290' : '$450')
                                        ) : (
                                            billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
                                        )}
                                    </span>
                                    {plan.monthlyPrice !== 'Custom' && plan.monthlyPrice !== '$0' && (
                                        <span className="text-sm font-semibold leading-6 text-gray-600">
                                            {billingCycle === 'monthly' ? t("monthSuffix") : t("yearSuffix")}
                                        </span>
                                    )}
                                </p>

                                {/* License Selector for Business */}
                                {plan.id === 'business' && (
                                    <div className="mt-6">
                                        <select
                                            value={businessLicenses}
                                            onChange={(e) => setBusinessLicenses(parseInt(e.target.value))}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="1">Single Site License</option>
                                            <option value="3">3-Site License</option>
                                        </select>
                                    </div>
                                )}

                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3 text-left">
                                            <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCheckout(plan);
                                }}
                                aria-describedby={plan.id}
                                className={`mt-8 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${plan.id === 'enterprise'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : plan.highlight
                                        ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600 transition-all'
                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 ring-1 ring-inset ring-blue-200 transition-all'
                                    }`}
                            >
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
