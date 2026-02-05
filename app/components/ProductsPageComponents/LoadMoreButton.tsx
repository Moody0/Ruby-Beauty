import React from 'react';

interface LoadMoreButtonProps {
    handleLoadMore: () => void;
    loading: boolean;
    hasMore: boolean;
}

const LoadMoreButton = ({ handleLoadMore, loading, hasMore }: LoadMoreButtonProps) => {
    if (!hasMore) return null;

    return (
        <div className="mt-16 flex items-center justify-center">
            <button
                onClick={handleLoadMore}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-white border border-[#e6dbdf] px-8 py-3 text-sm font-bold text-[#181113] hover:bg-primary hover:border-primary hover:text-white transition-colors dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Load More Products'}
                <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
        </div>
    );
};

export default LoadMoreButton;
