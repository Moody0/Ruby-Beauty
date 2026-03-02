"use client";

import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface OnSaleScrollWrapperProps {
    children: React.ReactNode;
    dir: 'ltr' | 'rtl';
}

const OnSaleScrollWrapper = ({ children, dir }: OnSaleScrollWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth * 0.8
                : scrollLeft + clientWidth * 0.8;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-end mb-8 px-2 absolute -top-16 right-0 gap-4">
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90"
                    >
                        <MdChevronLeft className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90"
                    >
                        <MdChevronRight className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {children}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default OnSaleScrollWrapper;
