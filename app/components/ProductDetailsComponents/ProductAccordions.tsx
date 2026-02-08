"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const ProductAccordions = () => {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col gap-4">
            {/* Rating section removed */}
        </div>
    );
};

export default ProductAccordions;
