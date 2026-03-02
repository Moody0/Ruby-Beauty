"use client";

import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdPayments, MdRefresh, MdCheckCircle, MdSupportAgent } from 'react-icons/md';

interface OrderSummaryProps {
    items: CartItem[];
    subtotal: number;
    total: number;
    loading: boolean;
    discount?: number;
    onApplyPromo?: (code: string) => Promise<{ success: boolean; message?: string }>;
}

const OrderSummary = ({ items, subtotal, total, loading, discount = 0, onApplyPromo }: OrderSummaryProps) => {
    const { t } = useLanguage();
    const [promoCode, setPromoCode] = React.useState("");
    const [promoMessage, setPromoMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isApplyingPromo, setIsApplyingPromo] = React.useState(false);

    const handleApplyPromo = async () => {
        if (!promoCode.trim() || !onApplyPromo) return;

        setIsApplyingPromo(true);
        setPromoMessage(null);
        try {
            const result = await onApplyPromo(promoCode);
            if (result.success) {
                setPromoMessage({ type: 'success', text: result.message || "Promo code applied!" });
            } else {
                setPromoMessage({ type: 'error', text: result.message || "Invalid promo code" });
            }
        } catch (error) {
            setPromoMessage({ type: 'error', text: "Failed to apply code" });
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent outer form submission
            handleApplyPromo();
        }
    };

    return (
        <div className="sticky top-28 space-y-6">
            <div className="bg-white dark:bg-[#2a161d] p-8 rounded-2xl shadow-lg border border-[#f4f0f2] dark:border-[#3a2228]">
                <h2 className="text-xl font-bold mb-6">{t('cart.orderSummary')}</h2>
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto ltr:pr-2 rtl:pl-2 custom-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 !bg-white rounded-lg border border-[#e6dbdf] dark:border-gray-800/50 overflow-hidden shrink-0">
                                <Image
                                    src={item.image.split(',')[0]}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="64px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate dark:text-white" title={item.name}>{item.name}</p>
                                <p className="text-xs text-[#89616f] dark:text-[#a08590]">{t('cart.quantity')}: {item.quantity} • ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <p className="text-sm text-center py-4 text-[#89616f]">{t('cart.emptyCart')}</p>
                    )}
                </div>

                {onApplyPromo && (
                    <div className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                onKeyDown={handleKeyDown}
                                placeholder={t('checkout.promoCode')}
                                className="flex-1 px-4 py-2 rounded-lg border border-[#e6dbdf] dark:border-gray-700 bg-[#fcfafa] dark:bg-[#341a22] text-sm focus:outline-none focus:ring-1 focus:ring-primary uppercase font-medium placeholder:normal-case"
                            />
                            <button
                                type="button"
                                onClick={handleApplyPromo}
                                disabled={isApplyingPromo || !promoCode.trim()}
                                className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-bold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isApplyingPromo ? '...' : t('common.apply')}
                            </button>
                        </div>
                        {promoMessage && (
                            <p className={`text-xs mt-2 font-bold ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                {promoMessage.text}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-col gap-3 mb-6 border-t border-b border-[#f4f0f2] dark:border-[#3a2228] py-6">
                    <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                        <span>{t('cart.subtotal')}</span>
                        <span className="font-medium text-[#181113] dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-medium">
                            <span>{t('checkout.discount')}</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                        <span>{t('cart.shipping')}</span>
                        <span className="font-medium text-green-600">{t('cart.freeShipping')}</span>
                    </div>
                </div>

                <div className="bg-[#f8f6f6] dark:bg-[#341a22] rounded-xl p-4 mb-8">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#89616f] dark:text-[#a08590] uppercase tracking-wider">{t('checkout.paymentMethod')}</span>
                        <MdPayments className="text-primary text-sm" />
                    </div>
                    <p className="text-sm font-bold text-[#181113] dark:text-white">{t('checkout.cashOnDelivery')}</p>
                </div>

                <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-bold dark:text-white">{t('cart.total')}</span>
                    <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                </div>

                <button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full h-14 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? (
                        <MdRefresh className="animate-spin" />
                    ) : (
                        <>
                            <span>{t('checkout.placeOrder')}</span>
                            <MdCheckCircle className="text-sm" />
                        </>
                    )}
                </button>
                <p className="text-[10px] text-center text-[#89616f] dark:text-[#a08590] mt-4 uppercase tracking-widest font-bold">{t('checkout.secureCheckout')}</p>
            </div>

            <div className="bg-[#fcfafa] dark:bg-[#2a161d]/50 p-5 rounded-xl border border-dashed border-[#f4f0f2] dark:border-[#3a2228] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#341a22] flex items-center justify-center shadow-sm">
                    <MdSupportAgent className="text-primary text-xl" />
                </div>
                <div>
                    <p className="text-sm font-bold dark:text-white">{t('checkout.needAssistance')}</p>
                    <a 
                        className="text-xs text-[#89616f] hover:text-primary underline" 
                        href="https://wa.me/963933254796"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('checkout.speakWithExpert')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
