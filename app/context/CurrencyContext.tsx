"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Currency = 'USD' | 'SYP';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    exchangeRate: number;
    formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children, initialExchangeRate }: { children: React.ReactNode, initialExchangeRate: number }) {
    const [currency, setCurrencyState] = useState<Currency>('SYP');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedCurrency = localStorage.getItem('currency') as Currency;
        if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'SYP')) {
            setCurrencyState(savedCurrency);
        }
        setMounted(true);
    }, []);

    const setCurrency = (curr: Currency) => {
        setCurrencyState(curr);
        localStorage.setItem('currency', curr);
    };

    const formatPrice = (usdPrice: number) => {
        if (!mounted) return `${Math.round(usdPrice * initialExchangeRate).toLocaleString('ar-SY')} ل.س`; // Default SSR to SYP
        if (currency === 'USD') {
            return `$${usdPrice.toFixed(2)}`;
        } else {
            return `${Math.round(usdPrice * initialExchangeRate).toLocaleString('ar-SY')} ل.س`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate: initialExchangeRate, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
