import { getAdminUser } from "../../../../lib/admin-actions";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
    const adminUser = await getAdminUser();
    return <SettingsClient initialUser={adminUser} />;
}
