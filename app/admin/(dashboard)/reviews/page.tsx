import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReviewsClient from "./ReviewsClient";

export const metadata = {
    title: "Manage Reviews - Admin Dashboard",
};

export default async function ReviewsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    if (!session.user.canManageReviews && session.user.role !== "SUPER_ADMIN") {
        redirect("/admin/dashboard");
    }

    return <ReviewsClient />;
}
