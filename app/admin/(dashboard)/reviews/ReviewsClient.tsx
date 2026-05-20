"use client";

import { useState, useEffect } from "react";
import { MdCheckCircle, MdCancel, MdDelete, MdStar, MdImage } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/app/context/LanguageContext";

interface Review {
    id: string;
    product: { name: string };
    name: string;
    email: string | null;
    rating: number;
    feedback: string | null;
    image: string | null;
    isApproved: boolean;
    createdAt: string;
}

export default function ReviewsClient() {
    const { t } = useLanguage();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/reviews");
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            } else {
                toast.error(t("admin.errorGeneric"));
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            toast.error(t("admin.errorGeneric"));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleToggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/reviews/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isApproved: !currentStatus }),
            });

            if (res.ok) {
                toast.success(t("admin.reviewStatusUpdated"));
                setReviews(reviews.map((r) => r.id === id ? { ...r, isApproved: !currentStatus } : r));
            } else {
                toast.error(t("admin.errorGeneric"));
            }
        } catch (error) {
            console.error("Failed to update review status:", error);
            toast.error(t("admin.errorGeneric"));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t("admin.confirmDeleteReview"))) return;

        try {
            const res = await fetch(`/api/admin/reviews/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success(t("admin.reviewDeleted"));
                setReviews(reviews.filter((r) => r.id !== id));
            } else {
                toast.error(t("admin.errorGeneric"));
            }
        } catch (error) {
            console.error("Failed to delete review:", error);
            toast.error(t("admin.errorGeneric"));
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-text-main dark:text-white">
                    {t("admin.reviews")}
                </h1>
                <p className="text-text-sub dark:text-gray-400">
                    {t("admin.manageReviews")}
                </p>
            </div>

            {/* List */}
            <div className="rounded-[10px] border border-[#e6dbdf] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-surface-dark">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-text-sub dark:text-gray-400">
                        <p>{t("admin.noReviewsFound")}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-[#e6dbdf] dark:border-gray-700">
                                    <th className="pb-4 font-bold text-text-sub dark:text-gray-400">{t("admin.product")}</th>
                                    <th className="pb-4 font-bold text-text-sub dark:text-gray-400">{t("admin.reviewerName")}</th>
                                    <th className="pb-4 font-bold text-text-sub dark:text-gray-400">{t("admin.rating")}</th>
                                    <th className="pb-4 font-bold text-text-sub dark:text-gray-400 max-w-xs">{t("admin.feedback")}</th>
                                    <th className="pb-4 font-bold text-text-sub dark:text-gray-400">{t("admin.status")}</th>
                                    <th className="pb-4 text-right font-bold text-text-sub dark:text-gray-400">{t("admin.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e6dbdf] dark:divide-gray-700">
                                {reviews.map((review) => (
                                    <tr key={review.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="py-4">
                                            <span className="font-semibold text-text-main dark:text-white line-clamp-1">{review.product.name}</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-text-main dark:text-white">{review.name}</span>
                                                {review.email && (
                                                    <span className="text-xs text-text-sub dark:text-gray-400">{review.email}</span>
                                                )}
                                                <span className="text-xs text-text-sub dark:text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-[10px] w-fit">
                                                <span className="font-bold text-amber-600 dark:text-amber-500">{review.rating}</span>
                                                <MdStar className="text-amber-500" />
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex flex-col gap-2">
                                                <p className="text-text-main dark:text-gray-300 line-clamp-2 max-w-xs">{review.feedback || "-"}</p>
                                                {review.image && (
                                                    <a href={review.image} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                                                        <MdImage /> {t("products.reviewModal.uploadImage")}
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                review.isApproved 
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                            }`}>
                                                {review.isApproved ? t("admin.approvedReviews") : t("admin.pendingReviews")}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleApproval(review.id, review.isApproved)}
                                                    className={`rounded-[10px] p-2 transition-colors ${
                                                        review.isApproved
                                                            ? "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                                            : "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                                                    }`}
                                                    title={review.isApproved ? t("admin.unapprove") : t("admin.approve")}
                                                >
                                                    {review.isApproved ? <MdCancel className="text-xl" /> : <MdCheckCircle className="text-xl" />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(review.id)}
                                                    className="rounded-[10px] p-2 text-red-500 hover:bg-red-50 transition-colors dark:hover:bg-red-900/20"
                                                    title={t("admin.deleteReview")}
                                                >
                                                    <MdDelete className="text-xl" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
