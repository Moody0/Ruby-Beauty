import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer
            className="bg-surface-light dark:bg-surface-dark border-t border-[#f4f0f2] dark:border-[#3a1d26] pt-16 pb-8 px-6 md:px-20 lg:px-32 xl:px-48 2xl:px-64"
            suppressHydrationWarning
        >
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Ruby Beauty</h4>
                        </div>
                        <p className="text-text-muted-light dark:text-text-muted-dark max-w-xs leading-relaxed">
                            Premium botanical skincare designed to reveal your natural radiance. Cruelty-free, vegan, and sustainable.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a
                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                                href="https://www.instagram.com/ruby.beauty.sy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">Instagram</span>
                                <span className="material-symbols-outlined">photo_camera</span>
                            </a>
                            <a
                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                                href="https://www.facebook.com/share/1HzXdo7sLG/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">Facebook</span>
                                <span className="material-symbols-outlined">public</span>
                            </a>
                            <a
                                className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                                href="https://wa.me/963933254796"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">WhatsApp</span>
                                <span className="material-symbols-outlined">chat</span>
                            </a>
                        </div>
                    </div>

                    {/* Link Column 1 */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main-light dark:text-text-main-dark">Shop</h5>
                        <ul className="flex flex-col gap-2.5 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition-colors" href="#">Skincare</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Makeup</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Fragrance</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Tools & Accessories</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Link Column 2 */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main-light dark:text-text-main-dark">Support</h5>
                        <ul className="flex flex-col gap-2.5 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Shipping & Returns</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Order Status</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Link Column 3 */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main-light dark:text-text-main-dark">Company</h5>
                        <ul className="flex flex-col gap-2.5 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Sustainability</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Press</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#f4f0f2] dark:border-[#3a1d26] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted-light dark:text-text-muted-dark">
                    <p>© 2026 Ruby Beauty. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link className="hover:text-text-main-light dark:hover:text-text-main-dark transition-colors" href="#">Privacy Policy</Link>
                        <Link className="hover:text-text-main-light dark:hover:text-text-main-dark transition-colors" href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
