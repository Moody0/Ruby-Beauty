"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }: { children: React.ReactNode, session?: any }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SessionProvider session={session}>
            <CartProvider>
                {mounted ? (
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                        {children}
                        <Toaster position="bottom-right" toastOptions={{
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                            className: 'dark:bg-surface-dark dark:text-white',
                        }} />
                    </ThemeProvider>
                ) : (
                    <>{children}</>
                )}
            </CartProvider>
        </SessionProvider>
    );
}
