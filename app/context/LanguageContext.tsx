"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import ar from '@/app/locales/ar.json';
import en from '@/app/locales/en.json';

type Language = 'en' | 'ar';

// Recursive type for nested translation objects
type TranslationValue = string | string[] | { [key: string]: TranslationValue };
type TranslationObject = { [key: string]: TranslationValue };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
    dir: 'ltr' | 'rtl';
    isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('ar');
    const [translations, setTranslations] = useState<TranslationObject>(ar);
    const [mounted, setMounted] = useState(false);

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguageState(savedLang);
        } else {
            // Check browser language as fallback
            const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'ar';
            if (browserLang === 'en' || browserLang === 'ar') {
                setLanguageState(browserLang as Language);
            }
        }
        setMounted(true);
    }, []);

    // Load translations
    useEffect(() => {
        setTranslations(language === 'ar' ? ar : en as any);
    }, [language]);

    // Save language preference and update document direction
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('language', language);
            document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 year
            document.documentElement.lang = language;
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [language, mounted]);

    const setLanguage = useCallback((lang: Language) => {
        try {
            localStorage.setItem('language', lang);
            document.cookie = `language=${lang}; path=/; max-age=31536000`;
        } catch (e) {
            console.warn('Could not persist language immediately', e);
        }

        if (typeof window !== 'undefined') {
            // Reload the page so the entire app (including server-rendered parts)
            // reflects the new language only after the navigation completes.
            window.location.reload();
        }
    }, []);

    // Translation function with fallback
    const t = useCallback((key: string): any => {
        if (!translations) return key;

        const keys = key.split('.');
        let result: any = translations;

        for (const k of keys) {
            if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
                // Try exact match first
                if (k in result) {
                    result = result[k];
                } 
                // Fallback: search case-insensitively
                else {
                    const foundKey = Object.keys(result).find(
                        existingKey => existingKey.toLowerCase() === k.toLowerCase()
                    );
                    if (foundKey) {
                        result = result[foundKey];
                    } else {
                        return key;
                    }
                }
            } else {
                return key;
            }
        }

        return typeof result === 'string' ? result : key;
    }, [translations]);

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir, isLoaded: !!translations }}>
            <div key={language} dir={dir}>
                {children}
            </div>
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
