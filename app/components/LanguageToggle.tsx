"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

const LanguageToggle = () => {
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-all duration-300 text-text-main-light dark:text-text-main-dark group relative"
            aria-label={t('language.switchTo')}
            title={language === 'en' ? 'العربية' : 'English'}
        >
            <span className="font-semibold text-sm tracking-tight">
                {language === 'en' ? 'AR' : 'EN'}
            </span>
        </button>
    );
};

export default LanguageToggle;
