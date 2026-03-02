import React from "react";
import { getSiteSettings } from "@/lib/admin-actions";
import ShippingReturnsContent from "./ShippingReturnsContent";

export const revalidate = 3600; // Revalidate every hour

export default async function ShippingReturnsPage() {
    const siteSettings = await getSiteSettings();

    return (
        <ShippingReturnsContent siteSettings={siteSettings} />
    );
}
