"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useLanguage } from '@/app/context/LanguageContext';

const CurrencyToggle = () => {
    const { currency, setCurrency } = useCurrency();
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-text-main-light dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span>{currency === 'USD' ? '$' : (language === 'ar' ? 'ل.س' : 'SYP')}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-[#2d161e] ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                            onClick={() => {
                                setCurrency('SYP');
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${currency === 'SYP' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                            role="menuitem"
                        >
                            {language === 'ar' ? 'ل.س' : 'SYP'}
                        </button>
                        <button
                            onClick={() => {
                                setCurrency('USD');
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${currency === 'USD' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                            role="menuitem"
                        >
                            USD
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrencyToggle;
