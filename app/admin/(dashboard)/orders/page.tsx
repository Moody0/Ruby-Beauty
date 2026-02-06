import { getAdminOrders } from "../../../../lib/admin-actions";
import OrdersClient from "./OrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await getAdminOrders();

    return <OrdersClient orders={orders} />;
}
