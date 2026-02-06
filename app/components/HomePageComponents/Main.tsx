import Link from 'next/link';
import React from 'react';
import Categories from './Categories';
import TrendingProducts from './TrendingProducts';
import Newsletter from './Newsletter';

const Main = () => {
    return (
        <main className="w-full flex flex-col gap-16 pb-20">
            {/* Hero Section */}
            <section className="px-4 md:px-8 pt-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm">
                        <div className="flex flex-col-reverse md:flex-row items-center">
                            {/* Hero Content */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col items-start gap-6 z-10">
                                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">New Collection</span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text-main-light dark:text-text-main-dark">
                                    Radiance <br className="hidden md:block" /> <span className="text-primary">Redefined.</span>
                                </h2>
                                <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-md">
                                    Discover our new botanical collection designed to give your skin a natural, healthy glow from within.
                                </p>
                                <Link href="/products" className="mt-4 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/30 flex items-center gap-2 group">
                                    Shop New Arrivals
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                            {/* Hero Image */}
                            <div className="w-full md:w-1/2 h-[300px] md:h-[550px] relative">
                                <div className="absolute inset-0 to-transparent md:hidden z-10 h-24 bottom-0 w-full"></div>
                                <div
                                    className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y")' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <Categories />

            {/* Trending Products Section */}
            <TrendingProducts />

            {/* Newsletter Section */}
            <Newsletter />
        </main>
    );
};

export default Main;