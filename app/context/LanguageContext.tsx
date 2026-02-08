"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Import translations
import en from '@/app/locales/en.json';
import ar from '@/app/locales/ar.json';

type Language = 'en' | 'ar';

// Recursive type for nested translation objects
type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationObject = { [key: string]: TranslationValue };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const translations: Record<Language, TranslationObject> = { en, ar };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguageState(savedLang);
        }
        setMounted(true);
    }, []);

    // Save language preference and update document direction
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('language', language);
            document.documentElement.lang = language;
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [language, mounted]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    // Translation function with fallback
    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let result: TranslationValue = translations[language];

        for (const k of keys) {
            if (typeof result === 'object' && result !== null && k in result) {
                result = result[k];
            } else {
                // Fallback to English if key not found
                let fallback: TranslationValue = translations['en'];
                for (const fk of keys) {
                    if (typeof fallback === 'object' && fallback !== null && fk in fallback) {
                        fallback = fallback[fk];
                    } else {
                        return key; // Return key if not found in fallback either
                    }
                }
                return typeof fallback === 'string' ? fallback : key;
            }
        }

        return typeof result === 'string' ? result : key;
    }, [language]);

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
