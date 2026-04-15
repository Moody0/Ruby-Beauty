export const IMAGE_PLACEHOLDER_SRC = "/placeholder.svg";

const isRemoteImageUrl = (url: string) => /^https?:\/\//i.test(url);

const getProxyImageUrl = (url: string) => `/api/image-proxy?url=${encodeURIComponent(url)}`;

const appendRetryParam = (url: string, attempt: number) =>
    `${url}${url.includes("?") ? "&" : "?"}retry=${attempt}`;

/**
 * Checks if an image URL needs to be proxied to bypass regional blocks (e.g., Shopify CDN in Syria).
 */
export const getSafeImageUrl = (url: string | null | undefined): string => {
    if (!url) return IMAGE_PLACEHOLDER_SRC;

    const trimmedUrl = url.trim();

    // Shopify CDN is blocked in some regions (e.g., Syria)
    if (trimmedUrl.includes("cdn.shopify.com")) {
        return getProxyImageUrl(trimmedUrl);
    }

    return trimmedUrl || IMAGE_PLACEHOLDER_SRC;
};

export const parseImageList = (images: string | null | undefined): string[] => {
    if (!images) {
        return [];
    }

    return images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean);
};

export const getPrimaryImage = (images: string | null | undefined): string =>
    parseImageList(images)[0] || IMAGE_PLACEHOLDER_SRC;

export const getImageSourceCandidates = (
    url: string | null | undefined,
    fallbackSrc: string = IMAGE_PLACEHOLDER_SRC
): string[] => {
    if (!url) {
        return [fallbackSrc];
    }

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
        return [fallbackSrc];
    }

    const safeUrl = getSafeImageUrl(trimmedUrl);
    const candidates = [safeUrl];
    const isRemote = isRemoteImageUrl(trimmedUrl);

    if (isRemote) {
        const proxyUrl = getProxyImageUrl(trimmedUrl);

        if (proxyUrl !== safeUrl) {
            candidates.push(proxyUrl);
        }

        candidates.push(appendRetryParam(proxyUrl, 1));
    }

    candidates.push(fallbackSrc);

    return [...new Set(candidates.filter(Boolean))];
};
