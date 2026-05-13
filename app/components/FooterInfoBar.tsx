import React from 'react';
import { MdEmail, MdCameraAlt, MdLocalOffer, MdStar } from 'react-icons/md';
import { getI18n } from '@/lib/i18n';

const FooterInfoBar = async () => {
    const { t } = await getI18n();

    const items = [
        {
            icon: MdStar,
            title: t('home.footerInfoExclusive'),
            subtitle: t('home.footerInfoExclusiveDesc'),
        },
        {
            icon: MdLocalOffer,
            title: t('home.footerInfoDiscount'),
            subtitle: t('home.footerInfoDiscountDesc'),
        },
        {
            icon: MdCameraAlt,
            title: t('home.footerInfoInstagram'),
            subtitle: t('home.footerInfoInstagramDesc'),
        },
        {
            icon: MdEmail,
            title: t('home.footerInfoNewsletter'),
            subtitle: t('home.footerInfoNewsletterDesc'),
        },
    ];

    return (
        <section className="w-full bg-[#f8f5f6] dark:bg-white/5 border-t border-[#f0eaec] dark:border-white/5">
            <div className="container-custom py-5 md:py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3 md:gap-4"
                            >
                                <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon className="text-primary text-lg md:text-xl" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs md:text-sm font-bold text-text-main-light dark:text-text-main-dark leading-tight truncate">
                                        {item.title}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-text-muted-light dark:text-text-muted-dark truncate">
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FooterInfoBar;
