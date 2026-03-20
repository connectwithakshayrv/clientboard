import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import DashboardShell from "./dashboard-shell";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    "";

  return (
    <DashboardShell
      userEmail={user.email || ""}
      userFullName={fullName}
    />
  );
}
