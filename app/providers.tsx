"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
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
    );
}
