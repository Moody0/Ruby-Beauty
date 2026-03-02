"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }: { children: React.ReactNode, session?: any }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SessionProvider session={session}>
            <LanguageProvider>
                <CartProvider>
                    {mounted ? (
                        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                            {children}
                            <Toaster
                                position="bottom-right"
                                toastOptions={{
                                    duration: 4000,
                                    style: {
                                        background: 'var(--color-surface-light)',
                                        color: 'var(--color-text-main-light)',
                                        border: '1px solid var(--color-background-dark)',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    },
                                    success: {
                                        iconTheme: {
                                            primary: 'var(--color-primary)',
                                            secondary: 'white',
                                        },
                                        style: {
                                            border: '1px solid rgba(238, 43, 108, 0.2)',
                                        }
                                    },
                                    error: {
                                        iconTheme: {
                                            primary: '#ef4444',
                                            secondary: 'white',
                                        },
                                        style: {
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                        }
                                    },
                                    className: 'dark:!bg-[#2d161e] dark:!text-white dark:!border-white/10 font-sans',
                                }}
                            />
                        </ThemeProvider>
                    ) : (
                        <>{children}</>
                    )}
                </CartProvider>
            </LanguageProvider>
        </SessionProvider>
    );
}
