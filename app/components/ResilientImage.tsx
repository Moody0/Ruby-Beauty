"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getImageSourceCandidates, IMAGE_PLACEHOLDER_SRC } from "@/lib/image-utils";

interface ResilientImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src: string | null | undefined;
    fallbackSrc?: string;
    skeletonClassName?: string;
}

const ResilientImage = ({
    src,
    fallbackSrc = IMAGE_PLACEHOLDER_SRC,
    alt,
    onError,
    onLoad,
    className,
    skeletonClassName,
    ...imgProps
}: ResilientImageProps) => {
    const candidates = useMemo(
        () => getImageSourceCandidates(src, fallbackSrc),
        [fallbackSrc, src]
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
        setIsLoaded(false);
    }, [candidates]);

    const currentSrc = candidates[currentIndex] || fallbackSrc;

    return (
        <span className="relative block h-full w-full overflow-hidden">
            <span
                aria-hidden="true"
                className={`absolute inset-0 animate-pulse bg-[#f4ecef] dark:bg-white/5 transition-opacity duration-300 ${
                    isLoaded ? "opacity-0" : "opacity-100"
                } ${skeletonClassName || ""}`}
            />
            <img
                {...imgProps}
                alt={alt}
                src={currentSrc}
                className={`${className || ""} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={(event) => {
                    setIsLoaded(true);
                    onLoad?.(event);
                }}
                onError={(event) => {
                    setIsLoaded(false);
                    setCurrentIndex((previousIndex) => {
                        if (previousIndex < candidates.length - 1) {
                            return previousIndex + 1;
                        }

                        return previousIndex;
                    });

                    onError?.(event);
                }}
            />
        </span>
    );
};

export default ResilientImage;
