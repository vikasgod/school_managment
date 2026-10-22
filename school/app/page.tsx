import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import DashboardClient from "@/components/dashboardClient";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) redirect("/login");

  const user = await verifySessionToken(token);
  if (!user) redirect("/login");

  return <DashboardClient user={user} />;
}
