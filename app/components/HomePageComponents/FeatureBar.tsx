import React from 'react';
import { MdSupportAgent, MdRefresh, MdVerifiedUser, MdLocalShipping } from 'react-icons/md';
import { getI18n } from '@/lib/i18n';

const FeatureBar = async () => {
    const { t } = await getI18n();

    const features = [
        {
            icon: MdSupportAgent,
            title: t('home.customerSupport'),
            subtitle: t('home.customerSupport247'),
        },
        {
            icon: MdRefresh,
            title: t('home.easyReturns'),
            subtitle: t('home.easyReturnsDesc'),
        },
        {
            icon: MdVerifiedUser,
            title: t('home.authenticProducts'),
            subtitle: t('home.authenticProductsDesc'),
        },
        {
            icon: MdLocalShipping,
            title: t('home.fastShipping'),
            subtitle: t('home.fastShippingDesc'),
        },
    ];

    return (
        <section className="w-full bg-white dark:bg-surface-dark py-6 md:py-10 border-b border-gray-50 dark:border-white/5">
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 justify-center md:justify-start"
                        >
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center">
                                <feature.icon className="text-text-main-light dark:text-white text-2xl md:text-3xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm md:text-base font-bold text-text-main-light dark:text-text-main-dark leading-tight">
                                    {feature.title}
                                </span>
                                <span className="text-xs md:text-sm text-text-muted-light dark:text-text-muted-dark">
                                    {feature.subtitle}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureBar;