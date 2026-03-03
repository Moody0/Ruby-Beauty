/**
 * Checks if an image URL needs to be proxied to bypass regional blocks (e.g., Shopify CDN in Syria).
 */
export const getSafeImageUrl = (url: string | null | undefined): string => {
    if (!url) return '/placeholder.svg';

    const trimmedUrl = url.trim();

    // Shopify CDN is blocked in some regions (e.g., Syria)
    if (trimmedUrl.includes('cdn.shopify.com')) {
        return `/api/image-proxy?url=${encodeURIComponent(trimmedUrl)}`;
    }

    return trimmedUrl;
};
