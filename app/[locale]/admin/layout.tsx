import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The login route renders without the chrome and without a session.
  if (!user) {
    return <>{props.children}</>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();
  const role = profile?.role ?? "article_editor";

  return (
    <div className="container-page py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <Link href="/admin" className="font-display text-2xl text-ink">
            Admin · REAGE
          </Link>
          <p className="mt-1 text-sm text-ink-faint">
            {profile?.full_name ?? user.email} — {role}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-ink-soft hover:text-teal">
            ← Site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full bg-ink/5 px-4 py-2 font-medium text-ink hover:bg-ink/10"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <main className="pt-8">{props.children}</main>
    </div>
  );
}
