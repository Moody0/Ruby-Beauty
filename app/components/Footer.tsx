"use client";

import Link from 'next/link';
import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from '@/app/context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer
            className="bg-surface-light dark:bg-surface-dark border-t border-[#f4f0f2] dark:border-[#3a1d26] pt-16 pb-8"
            suppressHydrationWarning
        >
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <h4 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">{t('header.brandName')}</h4>
                        </div>
                        <p className="text-text-muted-light dark:text-text-muted-dark max-w-xs leading-relaxed">
                            {t('footer.brandDescription')}
                        </p>
                        <div className="flex gap-4 text-2xl mt-2">
                            <a
                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                                href="https://www.instagram.com/ruby.beauty.sy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">Instagram</span>
                                <FaInstagram />
                            </a>
                            <a
                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                                href="https://www.facebook.com/share/1HzXdo7sLG/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">Facebook</span>
                                <FaFacebook />
                            </a>
                            <a
                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                                href="https://wa.me/963933254796"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">WhatsApp</span>
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* Link Column 1 */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main-light dark:text-text-main-dark">{t('footer.shop')}</h5>
                        <ul className="flex flex-col gap-2.5 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition-colors" href="/products">{t('footer.skincare')}</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/products">{t('footer.makeup')}</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/products">{t('footer.fragrance')}</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/products">{t('footer.toolsAccessories')}</Link></li>
                        </ul>
                    </div>

                    {/* Link Column 2 */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main-light dark:text-text-main-dark">{t('footer.support')}</h5>
                        <ul className="flex flex-col gap-2.5 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><a className="hover:text-primary transition-colors" href="https://wa.me/963933254796" target="_blank" rel="noopener noreferrer">{t('footer.helpCenter')}</a></li>
                            <li><Link className="hover:text-primary transition-colors" href="/about-us">{t('footer.shippingReturns')}</Link></li>
                            <li><a className="hover:text-primary transition-colors" href="https://wa.me/963933254796" target="_blank" rel="noopener noreferrer">{t('footer.orderStatus')}</a></li>
                            <li><a className="hover:text-primary transition-colors" href="https://wa.me/963933254796" target="_blank" rel="noopener noreferrer">{t('footer.contactUs')}</a></li>
                        </ul>
                    </div>

                    {/* Link Column 3 */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main-light dark:text-text-main-dark">{t('footer.company')}</h5>
                        <ul className="flex flex-col gap-2.5 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition-colors" href="/about-us">{t('common.aboutUs')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#f4f0f2] dark:border-[#3a1d26] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted-light dark:text-text-muted-dark">
                    <p>{t('footer.copyright')}</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
