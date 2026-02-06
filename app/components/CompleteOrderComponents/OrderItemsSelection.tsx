import React from 'react';

interface OrderItem {
    id: string;
    product: {
        images: string;
        name: string;
    };
    quantity: number;
}

interface OrderItemsSelectionProps {
    items: OrderItem[];
}

const OrderItemsSelection = ({ items }: OrderItemsSelectionProps) => {
    return (
        <div className="bg-[#fcfafa] dark:bg-white/5 p-6 border-t border-[#f4f0f2] dark:border-[#3a2228]">
            <p className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest mb-4 text-center">Your Selection</p>
            <div className="flex justify-center flex-wrap gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="w-16 h-16 bg-gray-100 rounded-lg bg-cover bg-center border border-[#f4f0f2] relative group"
                        style={{ backgroundImage: `url('${item.product.images}')` }}
                        title={item.product.name}
                    >
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                            {item.quantity}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderItemsSelection;
