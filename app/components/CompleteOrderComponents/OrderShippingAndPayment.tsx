import React from 'react';

interface OrderShippingAndPaymentProps {
    name: string;
    streetAddress: string;
    city: string;
    phone: string;
}

const OrderShippingAndPayment = ({ name, streetAddress, city, phone }: OrderShippingAndPaymentProps) => {
    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">local_shipping</span>
                    Shipping Address
                </h3>
                <div className="text-[#5a424a] dark:text-[#b49ba4] text-sm leading-relaxed">
                    <p className="font-semibold text-[#181113] dark:text-white">{name}</p>
                    <p>{streetAddress}</p>
                    <p>{city}</p>
                    <p>{phone}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">payments</span>
                    Payment Method
                </h3>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-[#181113] dark:text-white">Cash on Delivery</p>
                    <p className="text-xs text-[#89616f]">Pay at the time of delivery</p>
                </div>
            </div>
        </div>
    );
};

export default OrderShippingAndPayment;
