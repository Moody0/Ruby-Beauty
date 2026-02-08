"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const ProductAccordions = () => {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col gap-4">
            {/* Reviews Summary */}
            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-[#f4f0f2] dark:border-white/10 overflow-hidden" id="reviews" open>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-text-main dark:text-white select-none hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                    <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">rate_review</span>
                        {language === 'ar' ? 'تقييمات العملاء' : 'Customer Reviews'}
                    </span>
                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-5 pb-5 pt-2 border-t border-[#f4f0f2] dark:border-white/10">
                    <div className="flex flex-col gap-6">
                        {/* Rating Summary Component reuse style */}
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
                            <div className="flex flex-col gap-1">
                                <p className="text-text-main dark:text-white text-4xl font-black leading-tight">4.8</p>
                                <div className="flex gap-0.5 text-yellow-400">
                                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                </div>
                                <p className="text-text-muted dark:text-white/60 text-sm">{language === 'ar' ? 'بناءً على 342 تقييم' : 'Based on 342 reviews'}</p>
                            </div>
                            <div className="flex-1 min-w-[200px] grid grid-cols-[12px_1fr_30px] items-center gap-y-2 gap-x-3 text-xs">
                                <p className="text-text-main dark:text-white font-medium">5</p>
                                <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                                </div>
                                <p className="text-text-muted dark:text-white/50 ltr:text-right rtl:text-left">80%</p>
                                <p className="text-text-main dark:text-white font-medium">4</p>
                                <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '12%' }}></div>
                                </div>
                                <p className="text-text-muted dark:text-white/50 ltr:text-right rtl:text-left">12%</p>
                                <p className="text-text-main dark:text-white font-medium">3</p>
                                <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '5%' }}></div>
                                </div>
                                <p className="text-text-muted dark:text-white/50 ltr:text-right rtl:text-left">5%</p>
                                <p className="text-text-main dark:text-white font-medium">2</p>
                                <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '2%' }}></div>
                                </div>
                                <p className="text-text-muted dark:text-white/50 ltr:text-right rtl:text-left">2%</p>
                                <p className="text-text-main dark:text-white font-medium">1</p>
                                <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '1%' }}></div>
                                </div>
                                <p className="text-text-muted dark:text-white/50 ltr:text-right rtl:text-left">1%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    );
};

export default ProductAccordions;
