import Link from 'next/link'
import React from 'react'

interface Category {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
}

const Categories = ({ categories }: { categories: Category[] }) => {
    // Fallback image if category doesn't have one
    const defaultImage = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800';

    if (!categories || categories.length === 0) {
        return null; // Or return a message, or keeping the skeleton is tricky without client side loading
    }

    return (
        <section className="px-6 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Shop by Category</h3>
                    <Link className="text-primary font-medium text-sm flex items-center gap-1 " href="/products">
                        View all <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            className="group relative overflow-hidden rounded-xl aspect-4/5 cursor-pointer"
                            href={`/products?category=${category.id}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${category.image || defaultImage}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-0 left-0 p-5">
                                <p className="text-white text-lg font-bold">{category.name}</p>
                                <p className="text-white/80 text-xs">{category.description || 'Premium collection'}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories