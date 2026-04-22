import React from "react";
import { MdEco, MdLocalFlorist, MdSpa, MdVerified } from "react-icons/md";

interface HomeTrustStripProps {
    t: (key: string) => string;
}

const trustItems = [
    { key: "vegan", Icon: MdSpa },
    { key: "crueltyFree", Icon: MdVerified },
    { key: "botanical", Icon: MdLocalFlorist },
    { key: "sustainable", Icon: MdEco },
] as const;

const HomeTrustStrip = ({ t }: HomeTrustStripProps) => {
    return (
        <section className="container-custom -mt-2 md:-mt-1">
            <div className="rounded-[28px] border border-[#f0dfe5] bg-white/85 p-3 premium-shadow dark:border-white/10 dark:bg-surface-dark/85">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {trustItems.map(({ key, Icon }) => (
                        <div
                            key={key}
                            className="flex items-center gap-3 rounded-2xl bg-[#fff7f9] px-4 py-3 text-sm font-semibold text-text-main-light dark:bg-white/5 dark:text-text-main-dark"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon className="text-[20px]" />
                            </span>
                            <span>{t(`home.brandValues.${key}`)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTrustStrip;
