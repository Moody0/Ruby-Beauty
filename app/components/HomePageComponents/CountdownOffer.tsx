'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownOffer = () => {
    const { dir, language } = useLanguage();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 17, hours: 0, minutes: 6, seconds: 46 });

    // Target date: 30 days from now for demo, or a fixed date
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 17); // 17 days for matching the provided HTML

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <section className="w-full py-10 md:py-12 bg-white dark:bg-[#121212]">
            <div className="container-custom">
                <div className={`w-full rounded-[15px] bg-[#f9dae5] h-auto md:h-[160px] py-8 md:py-0 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 ${dir === 'rtl' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* 1. Subheading */}
                    <div className="flex-shrink-0">
                        <span className="text-[#333] text-xs md:text-sm font-medium opacity-70">
                            {language === 'ar' ? 'عروض لفترة محدودة' : 'Limited Time Offers'}
                        </span>
                    </div>

                    {/* 2. Timer (Middle) */}
                    <div className="flex items-center gap-3 md:gap-4 text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tabular-nums">
                        <div className="flex flex-col items-center">
                            <span>{formatNumber(timeLeft.days)}</span>
                            <span className="text-[10px] uppercase opacity-50 mt-[-5px]">{language === 'ar' ? 'يوم' : 'Day'}</span>
                        </div>
                        <span className="opacity-30 mb-4">:</span>
                        <div className="flex flex-col items-center">
                            <span>{formatNumber(timeLeft.hours)}</span>
                            <span className="text-[10px] uppercase opacity-50 mt-[-5px]">{language === 'ar' ? 'ساعة' : 'Hrs'}</span>
                        </div>
                        <span className="opacity-30 mb-4">:</span>
                        <div className="flex flex-col items-center">
                            <span>{formatNumber(timeLeft.minutes)}</span>
                            <span className="text-[10px] uppercase opacity-50 mt-[-5px]">{language === 'ar' ? 'دقيقة' : 'Min'}</span>
                        </div>
                        <span className="opacity-30 mb-4">:</span>
                        <div className="flex flex-col items-center">
                            <span>{formatNumber(timeLeft.seconds)}</span>
                            <span className="text-[10px] uppercase opacity-50 mt-[-5px]">{language === 'ar' ? 'ثانية' : 'Sec'}</span>
                        </div>
                    </div>

                    {/* 3. Heading */}
                    <div className="max-w-[300px]">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-tight text-center md:text-right">
                            {language === 'ar' ? 'أحسن العروض، في مكان واحد' : 'Best Offers, All in One Place'}
                        </h2>
                    </div>

                    {/* 3. Button (On the side) */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/products"
                            className="px-8 py-3 bg-black text-white hover:bg-black/90 rounded-full font-bold text-sm md:text-base transition-all shadow-md active:scale-95 whitespace-nowrap"
                        >
                            {language === 'ar' ? 'كل العروض' : 'All Offers'}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountdownOffer;
