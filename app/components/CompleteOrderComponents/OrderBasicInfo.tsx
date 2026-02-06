import React from 'react';

interface OrderBasicInfoProps {
    orderId: string;
    totalAmount: number;
}

const OrderBasicInfo = ({ orderId, totalAmount }: OrderBasicInfoProps) => {
    return (
        <div className="p-8 border-b border-[#f4f0f2] dark:border-[#3a2228] grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">Order ID</span>
                <p className="text-lg font-bold truncate">#{orderId.slice(-8).toUpperCase()}</p>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">Order Total</span>
                <p className="text-lg font-black text-primary">${Number(totalAmount).toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">Est. Delivery</span>
                <p className="text-lg font-bold">3-5 business days</p>
            </div>
        </div>
    );
};

export default OrderBasicInfo;
