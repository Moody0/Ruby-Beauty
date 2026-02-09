"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AboutUsPage() {
    const { t, dir } = useLanguage();

    return (
        <main className="flex-1 bg-white dark:bg-[#1a0d11]" dir={dir}>
            {/* Hero Section */}
            <section className="container-custom py-10">
                <div className="relative h-[500px] w-full overflow-hidden rounded-3xl flex items-center justify-center text-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAz8qN2iAHz-UZeEQfqOY49U5OCZ5z4ejVm7ILFjFSl9S5xg_6UuBa61qOmrkMPrBa4CuXDzHa9EN3-LNyUxi5IDK5A9TvJWkNuG-tt_RRyvJH8LvynO1daOEkTk47KDtkW3Md2ugZYShZJdxolsjiJUtDdOOz4Q7-6TNrexIvyClP0ADf1TWdbCUk1kBn8bfzhTC1cn8s9jG3yt0tDDht7__J5YKKf690SmKN4WIJX_pc2LOj3x1CnYk5JuqEu0Bzp2vGwsrYLaJWb')`
                        }}
                    ></div>
                    <div className="relative z-10 max-w-3xl px-6">
                        <h1 className="text-white text-5xl md:text-8xl font-black tracking-tight mb-6 animate-fade-in-up">
                            {t('aboutUsPage.hero.title')}
                        </h1>
                        <p className="text-white/95 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up animation-delay-200">
                            {t('aboutUsPage.hero.subtitle')}
                        </p>
                        <div className="animate-fade-in-up animation-delay-400">
                            <Link
                                href="/products"
                                className="bg-primary hover:bg-[#d43a6b] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-primary/40 active:scale-95 inline-block"
                            >
                                {t('aboutUsPage.hero.cta')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Narrative Section */}
            <section className="container-custom py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/10 rounded-3xl transition-all group-hover:bg-primary/15 blur-2xl"></div>
                        <img
                            alt="Artistic shot of natural skincare ingredients"
                            className="relative rounded-3xl w-full object-cover shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:scale-[1.02] transition-transform duration-500"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4yp4c_LJLNPwaV2ay8DZ6xRHD0UF1WqXU8eDtrdDoiVjtq9oNRc9Cn6cnbqsNwOLO-y-99jnkiLnCsGLs2rQqthU8TPqhAh2Msisbst1UyfyrILBR5fRO7KYu90u1FEoeRRjGceGVbB5vz2SJAtjzUrLLtA6BmR8VN5a5Seo4MraBJj7i4Gs4QPEZbURtSN-F7wbJsu4WNj3pEaWlye2SuJvokQhYXJ27gnAoabHg5_0_4DZY49qyKnQuMHHL9atOIILRIMD3FkeZ"
                        />
                    </div>
                </div>
                <div className="order-1 lg:order-2 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-primary font-extrabold tracking-[0.2em] uppercase text-sm">
                            {t('aboutUsPage.narrative.founded')}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black leading-tight text-text-main-light dark:text-white">
                            {t('aboutUsPage.narrative.title')}
                        </h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p className="text-[#4a353b] dark:text-gray-300 text-xl leading-relaxed">
                            {t('aboutUsPage.narrative.para1')}
                        </p>
                        <p className="text-[#4a353b] dark:text-gray-300 text-xl leading-relaxed">
                            {t('aboutUsPage.narrative.para2')}
                        </p>
                    </div>
                    <div className="flex items-center gap-6 pt-6">
                        <div className="h-px bg-primary/20 flex-1"></div>
                        <p className="italic text-primary font-semibold text-lg">
                            {t('aboutUsPage.narrative.quote')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-[#fdf9fa] dark:bg-[#150a0d] container-custom py-24 rounded-[3rem] mb-20 px-6 sm:px-10 lg:px-20">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-text-main-light dark:text-white">
                        {t('aboutUsPage.values.title')}
                    </h2>
                    <p className="text-[#88636f] dark:text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('aboutUsPage.values.description')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Value 1 */}
                    <div className="flex flex-col items-center text-center p-10 rounded-3xl border border-[#e5dcdf] dark:border-[#3d262d] bg-white dark:bg-[#1a0d11] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                            <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl">favorite</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                            {t('aboutUsPage.values.crueltyFree.title')}
                        </h3>
                        <p className="text-[#88636f] dark:text-gray-400 leading-relaxed text-lg">
                            {t('aboutUsPage.values.crueltyFree.description')}
                        </p>
                    </div>
                    {/* Value 2 */}
                    <div className="flex flex-col items-center text-center p-10 rounded-3xl border border-[#e5dcdf] dark:border-[#3d262d] bg-white dark:bg-[#1a0d11] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:-rotate-6 transition-all duration-500">
                            <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl">eco</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                            {t('aboutUsPage.values.vegan.title')}
                        </h3>
                        <p className="text-[#88636f] dark:text-gray-400 leading-relaxed text-lg">
                            {t('aboutUsPage.values.vegan.description')}
                        </p>
                    </div>
                    {/* Value 3 */}
                    <div className="flex flex-col items-center text-center p-10 rounded-3xl border border-[#e5dcdf] dark:border-[#3d262d] bg-white dark:bg-[#1a0d11] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                            <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl">recycling</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                            {t('aboutUsPage.values.sustainable.title')}
                        </h3>
                        <p className="text-[#88636f] dark:text-gray-400 leading-relaxed text-lg">
                            {t('aboutUsPage.values.sustainable.description')}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
