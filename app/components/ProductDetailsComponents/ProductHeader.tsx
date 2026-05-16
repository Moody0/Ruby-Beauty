"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductHeaderProps {
    name: string;
    brandName?: string;
    categoryName?: string;
}

const ProductHeader = ({ name, brandName, categoryName }: ProductHeaderProps) => {
    const { language } = useLanguage();

    return (
        <div className="mb-2">
            <h1 
                dir="ltr" 
                className={`text-[#2e2e2e] dark:text-white text-[25px] md:text-[30px] font-semibold leading-[1.2] mb-3 font-sans tracking-normal ${language === 'ar' ? 'text-right' : 'text-left'}`}
            >
                {name}
            </h1>

            <div className="flex items-center gap-4 text-[15px] font-semibold">
                {brandName && (
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#000000]">{language === 'ar' ? 'البراند:' : 'Brand:'}</span>
                        <span className="text-[rgb(7,40,53)] border-b border-[rgb(7,40,53)]  transition-colors cursor-pointer">{brandName}</span>
                    </div>
                )}
                <span className="opacity-20">|</span>
                {categoryName && (
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#000000]">{language === 'ar' ? 'النوع:' : 'Type:'}</span>
                        <span className="text-[rgb(7,40,53)] border-b border-[rgb(7,40,53)] transition-colors cursor-pointer">{categoryName}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductHeader;
