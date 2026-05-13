'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdLocalShipping } from 'react-icons/md';

const AnnouncementBar = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full bg-primary text-white text-center py-2 px-4 text-xs md:text-sm font-medium z-[60] relative">
            <div className="flex items-center justify-center gap-2">
                <span>💎</span>
                <span>{t('announcement.freeShipping')}</span>
                <span>💎</span>
            </div>
        </div>
    );
};

export default AnnouncementBar;
