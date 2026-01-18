"use client";

import React from "react";

/**
 * SEO Component for MDX.
 * In this stack (App Router), this component is a marker.
 * The metadata should ideally be extracted by the page loader.
 * However, we can use it to inject JSON-LD or similar if needed.
 * For now, it renders nothing to avoid affecting the UI.
 */
interface SEOProps {
    title: string;
    description?: string;
    url?: string;
    ogTitle?: string;
    ogDescription?: string;
}

export const SEO = ({ title, description, url }: SEOProps) => {
    return null;
};
