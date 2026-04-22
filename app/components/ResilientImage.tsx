/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useRef, useState } from "react";
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
    const sourceKey = candidates.join("|");
    return (
        <ResilientImageInner
            key={sourceKey}
            candidates={candidates}
            fallbackSrc={fallbackSrc}
            alt={alt}
            onError={onError}
            onLoad={onLoad}
            className={className}
            skeletonClassName={skeletonClassName}
            imgProps={imgProps}
        />
    );
};

interface ResilientImageInnerProps {
    candidates: string[];
    fallbackSrc: string;
    alt?: string;
    onError?: React.ImgHTMLAttributes<HTMLImageElement>["onError"];
    onLoad?: React.ImgHTMLAttributes<HTMLImageElement>["onLoad"];
    className?: string;
    skeletonClassName?: string;
    imgProps: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">;
}

const ResilientImageInner = ({
    candidates,
    fallbackSrc,
    alt,
    onError,
    onLoad,
    className,
    skeletonClassName,
    imgProps,
}: ResilientImageInnerProps) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentSrc = candidates[currentIndex] || fallbackSrc;

    return (
        <span className="relative block h-full w-full overflow-hidden">
            <span
                aria-hidden="true"
                className={`absolute inset-0 bg-[#f7eef2] dark:bg-white/6 ${skeletonClassName || ""} ${isLoaded ? "opacity-0" : "opacity-100"} animate-pulse transition-opacity duration-300`}
            />

            <img
                ref={imageRef}
                {...imgProps}
                alt={alt}
                src={currentSrc}
                className={`${className || ""} block transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
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
