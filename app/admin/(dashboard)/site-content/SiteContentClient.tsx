"use client";

import { useState } from "react";
import { MdImage, MdImageNotSupported, MdVerified, MdSchedule, MdLocalShipping, MdWarning, MdCleanHands, MdAssignmentReturn } from "react-icons/md";
import AdminHeader from "../../components/AdminHeader";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import { updateSiteSettings } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/app/context/LanguageContext";

interface SiteSettings {
    id: string;
    categoriesCtaTitle: string | null;
    categoriesCtaDesc: string | null;
    categoriesCtaTitleAr: string | null;
    categoriesCtaDescAr: string | null;
    categoriesCtaImage: string | null;
    shippingTitle: string | null;
    shippingDesc: string | null;
    shippingTitleAr: string | null;
    shippingDescAr: string | null;
    verificationTitle: string | null;
    verificationDesc: string | null;
    verificationTitleAr: string | null;
    verificationDescAr: string | null;
    standardShippingTime: string | null;
    expressShippingTime: string | null;
    returnsTitle: string | null;
    returnsDesc: string | null;
    returnsTitleAr: string | null;
    returnsDescAr: string | null;
    finalSaleTitle: string | null;
    finalSaleDesc: string | null;
    finalSaleTitleAr: string | null;
    finalSaleDescAr: string | null;
    hygieneTitle: string | null;
    hygieneDesc: string | null;
    hygieneTitleAr: string | null;
    hygieneDescAr: string | null;
    shippingReturnsImage: string | null;
}

export default function SiteContentClient({ 
    initialSettings 
}: { 
    initialSettings: SiteSettings | null
}) {
    const { t } = useLanguage();
    const { openSidebar } = useAdminSidebar();

    // Site Settings State - Categories CTA
    const [ctaTitle, setCtaTitle] = useState(initialSettings?.categoriesCtaTitle || "");
    const [ctaDesc, setCtaDesc] = useState(initialSettings?.categoriesCtaDesc || "");
    const [ctaTitleAr, setCtaTitleAr] = useState(initialSettings?.categoriesCtaTitleAr || "");
    const [ctaDescAr, setCtaDescAr] = useState(initialSettings?.categoriesCtaDescAr || "");
    const [ctaImage, setCtaImage] = useState(initialSettings?.categoriesCtaImage || "");

    // Site Settings State - Shipping & Returns
    const [shippingTitle, setShippingTitle] = useState(initialSettings?.shippingTitle || "");
    const [shippingDesc, setShippingDesc] = useState(initialSettings?.shippingDesc || "");
    const [shippingTitleAr, setShippingTitleAr] = useState(initialSettings?.shippingTitleAr || "");
    const [shippingDescAr, setShippingDescAr] = useState(initialSettings?.shippingDescAr || "");

    const [verificationTitle, setVerificationTitle] = useState(initialSettings?.verificationTitle || "");
    const [verificationDesc, setVerificationDesc] = useState(initialSettings?.verificationDesc || "");
    const [verificationTitleAr, setVerificationTitleAr] = useState(initialSettings?.verificationTitleAr || "");
    const [verificationDescAr, setVerificationDescAr] = useState(initialSettings?.verificationDescAr || "");

    const [standardShippingTime, setStandardShippingTime] = useState(initialSettings?.standardShippingTime || "");
    const [expressShippingTime, setExpressShippingTime] = useState(initialSettings?.expressShippingTime || "");

    const [returnsTitle, setReturnsTitle] = useState(initialSettings?.returnsTitle || "");
    const [returnsDesc, setReturnsDesc] = useState(initialSettings?.returnsDesc || "");
    const [returnsTitleAr, setReturnsTitleAr] = useState(initialSettings?.returnsTitleAr || "");
    const [returnsDescAr, setReturnsDescAr] = useState(initialSettings?.returnsDescAr || "");

    const [finalSaleTitle, setFinalSaleTitle] = useState(initialSettings?.finalSaleTitle || "");
    const [finalSaleDesc, setFinalSaleDesc] = useState(initialSettings?.finalSaleDesc || "");
    const [finalSaleTitleAr, setFinalSaleTitleAr] = useState(initialSettings?.finalSaleTitleAr || "");
    const [finalSaleDescAr, setFinalSaleDescAr] = useState(initialSettings?.finalSaleDescAr || "");

    const [hygieneTitle, setHygieneTitle] = useState(initialSettings?.hygieneTitle || "");
    const [hygieneDesc, setHygieneDesc] = useState(initialSettings?.hygieneDesc || "");
    const [hygieneTitleAr, setHygieneTitleAr] = useState(initialSettings?.hygieneTitleAr || "");
    const [hygieneDescAr, setHygieneDescAr] = useState(initialSettings?.hygieneDescAr || "");

    const [shippingReturnsImage, setShippingReturnsImage] = useState(initialSettings?.shippingReturnsImage || "");

    const [isSubmittingSettings, setIsSubmittingSettings] = useState(false);

    const handleSiteSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingSettings(true);

        try {
            const result = await updateSiteSettings({
                categoriesCtaTitle: ctaTitle,
                categoriesCtaDesc: ctaDesc,
                categoriesCtaTitleAr: ctaTitleAr,
                categoriesCtaDescAr: ctaDescAr,
                categoriesCtaImage: ctaImage,
                shippingTitle,
                shippingDesc,
                shippingTitleAr,
                shippingDescAr,
                verificationTitle,
                verificationDesc,
                verificationTitleAr,
                verificationDescAr,
                standardShippingTime,
                expressShippingTime,
                returnsTitle,
                returnsDesc,
                returnsTitleAr,
                returnsDescAr,
                finalSaleTitle,
                finalSaleDesc,
                finalSaleTitleAr,
                finalSaleDescAr,
                hygieneTitle,
                hygieneDesc,
                hygieneTitleAr,
                hygieneDescAr,
                shippingReturnsImage,
            });

            if (result.success) {
                toast.success(t('admin.settingsUpdated') || "Settings updated successfully");
            } else {
                toast.error(result.error || t('admin.failedToUpdate') || "Failed to update");
            }
        } catch (error) {
            console.error("Error updating site settings:", error);
            toast.error(t('admin.failedToUpdate') || "Failed to update");
        } finally {
            setIsSubmittingSettings(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader title={t('admin.siteContent')} onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Site Content Settings */}
                    <div className="space-y-8">
                        {/* Categories Page CTA */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#e6dbdf] dark:border-gray-700 p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">
                                    {t('admin.categoriesPageCta')}
                                </h2>
                                <p className="text-text-sub dark:text-gray-400">
                                    {t('admin.categoriesCtaDescription')}
                                </p>
                            </div>

                            <form onSubmit={handleSiteSettingsSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* English Content */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">EN</span>
                                            <h3 className="font-bold text-text-main dark:text-white">{t('admin.englishContent')}</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.title')}</label>
                                            <input
                                                type="text"
                                                value={ctaTitle}
                                                onChange={(e) => setCtaTitle(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.description')}</label>
                                            <textarea
                                                rows={5}
                                                value={ctaDesc}
                                                onChange={(e) => setCtaDesc(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Arabic Content */}
                                    <div className="space-y-6" dir="rtl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">AR</span>
                                            <h3 className="font-bold text-text-main dark:text-white">{t('admin.arabicContent')}</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.title')}</label>
                                            <input
                                                type="text"
                                                value={ctaTitleAr}
                                                onChange={(e) => setCtaTitleAr(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.description')}</label>
                                            <textarea
                                                rows={5}
                                                value={ctaDescAr}
                                                onChange={(e) => setCtaDescAr(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Settings */}
                                <div className="border-t border-[#e6dbdf] dark:border-gray-700 pt-8 mt-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <MdImage className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.ctaImage')}</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.imageUrl')}</label>
                                                <input
                                                    type="text"
                                                    value={ctaImage}
                                                    onChange={(e) => setCtaImage(e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                                <p className="text-xs text-text-sub dark:text-gray-400">
                                                    {t('admin.ctaImageDescription')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.preview')}</label>
                                            <div className="aspect-video rounded-2xl border-2 border-dashed border-[#e6dbdf] dark:border-gray-700 overflow-hidden bg-background-light dark:bg-gray-800 flex items-center justify-center">
                                                {ctaImage ? (
                                                    <img 
                                                        src={ctaImage} 
                                                        alt={t('admin.ctaPreview')} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="text-center p-6">
                                                        <MdImageNotSupported className="text-4xl text-text-sub/30 mb-2 mx-auto" />
                                                        <p className="text-xs text-text-sub/50">{t('admin.noImageProvided') || "No image URL provided"}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmittingSettings}
                                        className="px-8 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                                    >
                                        {isSubmittingSettings ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                                                {t('admin.saving')}
                                            </span>
                                        ) : (
                                            t('admin.saveChanges')
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Shipping & Returns Page Content */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#e6dbdf] dark:border-gray-700 p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">
                                    {t('admin.shippingReturnsContent')}
                                </h2>
                                <p className="text-text-sub dark:text-gray-400">
                                    {t('admin.shippingReturnsDescription')}
                                </p>
                            </div>

                            <form onSubmit={handleSiteSettingsSubmit} className="space-y-12">
                                {/* Shipping & Returns Page Image */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <MdImage className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.pageHeaderImage')}</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.imageUrl')}</label>
                                                <input
                                                    type="text"
                                                    value={shippingReturnsImage}
                                                    onChange={(e) => setShippingReturnsImage(e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                                <p className="text-xs text-text-sub dark:text-gray-400">
                                                    {t('admin.shippingReturnsImageHint')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.preview')}</label>
                                            <div className="aspect-video rounded-2xl border-2 border-dashed border-[#e6dbdf] dark:border-gray-700 overflow-hidden bg-background-light dark:bg-gray-800 flex items-center justify-center">
                                                {shippingReturnsImage ? (
                                                    <img 
                                                        src={shippingReturnsImage} 
                                                        alt="Shipping & Returns Preview" 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="text-center p-6">
                                                        <MdImageNotSupported className="text-4xl text-text-sub/30 mb-2 mx-auto" />
                                                        <p className="text-xs text-text-sub/50">{t('admin.noImageProvided') || "No image URL provided"}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 1. Verification Section */}
                                <div className="space-y-6 border-t border-[#e6dbdf] dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdVerified className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.verificationSection')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">EN</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.englishContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={verificationTitle}
                                                    onChange={(e) => setVerificationTitle(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={verificationDesc}
                                                    onChange={(e) => setVerificationDesc(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4" dir="rtl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">AR</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.arabicContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={verificationTitleAr}
                                                    onChange={(e) => setVerificationTitleAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={verificationDescAr}
                                                    onChange={(e) => setVerificationDescAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Shipping Times */}
                                <div className="space-y-6 border-t border-[#e6dbdf] dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdSchedule className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.shippingTimes')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.standardTime')}</label>
                                            <input
                                                type="text"
                                                value={standardShippingTime}
                                                onChange={(e) => setStandardShippingTime(e.target.value)}
                                                placeholder="e.g. 3-5 Business Days"
                                                className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">{t('admin.expressTime')}</label>
                                            <input
                                                type="text"
                                                value={expressShippingTime}
                                                onChange={(e) => setExpressShippingTime(e.target.value)}
                                                placeholder="e.g. 1-2 Business Days"
                                                className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Shipping Section */}
                                <div className="space-y-6 border-t border-[#e6dbdf] dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdLocalShipping className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.shippingSection')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">EN</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.englishContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={shippingTitle}
                                                    onChange={(e) => setShippingTitle(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={shippingDesc}
                                                    onChange={(e) => setShippingDesc(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4" dir="rtl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">AR</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.arabicContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={shippingTitleAr}
                                                    onChange={(e) => setShippingTitleAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={shippingDescAr}
                                                    onChange={(e) => setShippingDescAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Final Sale Section */}
                                <div className="space-y-6 border-t border-[#e6dbdf] dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdWarning className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.finalSaleSection')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">EN</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.englishContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={finalSaleTitle}
                                                    onChange={(e) => setFinalSaleTitle(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={finalSaleDesc}
                                                    onChange={(e) => setFinalSaleDesc(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4" dir="rtl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">AR</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.arabicContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={finalSaleTitleAr}
                                                    onChange={(e) => setFinalSaleTitleAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={finalSaleDescAr}
                                                    onChange={(e) => setFinalSaleDescAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Hygiene Section */}
                                <div className="space-y-6 border-t border-[#e6dbdf] dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdCleanHands className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.hygieneProtocols')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">EN</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.englishContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.hygieneImage')}</label>
                                                <input
                                                    type="text"
                                                    value={hygieneTitle}
                                                    onChange={(e) => setHygieneTitle(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={hygieneDesc}
                                                    onChange={(e) => setHygieneDesc(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4" dir="rtl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">AR</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.arabicContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.hygieneImage')}</label>
                                                <input
                                                    type="text"
                                                    value={hygieneTitleAr}
                                                    onChange={(e) => setHygieneTitleAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={hygieneDescAr}
                                                    onChange={(e) => setHygieneDescAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. Returns Section */}
                                <div className="space-y-6 border-t border-[#e6dbdf] dark:border-gray-700 pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdAssignmentReturn className="text-primary text-xl" />
                                        <h3 className="font-bold text-text-main dark:text-white text-lg">{t('admin.returnsSection')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">EN</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.englishContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={returnsTitle}
                                                    onChange={(e) => setReturnsTitle(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={returnsDesc}
                                                    onChange={(e) => setReturnsDesc(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4" dir="rtl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">AR</span>
                                                <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.arabicContent')}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                                <input
                                                    type="text"
                                                    value={returnsTitleAr}
                                                    onChange={(e) => setReturnsTitleAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">{t('admin.description')}</label>
                                                <textarea
                                                    rows={3}
                                                    value={returnsDescAr}
                                                    onChange={(e) => setReturnsDescAr(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmittingSettings}
                                        className="px-8 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                                    >
                                        {isSubmittingSettings ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                                                {t('admin.saving')}
                                            </span>
                                        ) : (
                                            t('admin.saveChanges')
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
