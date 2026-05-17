import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { pickT } from "@/lib/supabase/queries";
import { deleteEvent, deleteArticle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const role = profile?.role ?? "article_editor";
  const canEvents = role === "admin" || role === "event_editor";
  const canArticles = role === "admin" || role === "article_editor";

  const [{ data: events }, { data: articles }] = await Promise.all([
    supabase.from("events").select("*").order("date_start", { ascending: false }),
    supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-14">
      {canEvents && (
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink">Événements</h2>
            <Link
              href="/admin/events/new"
              className="rounded-full bg-teal px-4 py-2 text-sm font-medium text-bone hover:bg-teal-dark"
            >
              + Nouvel événement
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {(events ?? []).map((e) => {
              const c = pickT(e.translations, "fr");
              return (
                <li
                  key={e.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4"
                >
                  <span>
                    <span className="font-medium text-ink">{c.title}</span>
                    <span className="ms-3 text-sm text-ink-faint">
                      {e.date_start} ·{" "}
                      {e.status === "published" ? "publié" : "brouillon"}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-sm">
                    <Link
                      href={`/admin/events/${e.id}`}
                      className="text-teal hover:text-ochre"
                    >
                      Modifier
                    </Link>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={e.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <button className="text-ink-faint hover:text-red-700">
                        Supprimer
                      </button>
                    </form>
                  </span>
                </li>
              );
            })}
            {(events ?? []).length === 0 && (
              <li className="p-4 text-sm text-ink-faint">Aucun événement.</li>
            )}
          </ul>
        </section>
      )}

      {canArticles && (
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink">Actualités</h2>
            <Link
              href="/admin/articles/new"
              className="rounded-full bg-teal px-4 py-2 text-sm font-medium text-bone hover:bg-teal-dark"
            >
              + Nouvel article
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {(articles ?? []).map((a) => {
              const c = pickT(a.translations, "fr");
              return (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4"
                >
                  <span>
                    <span className="font-medium text-ink">{c.title}</span>
                    <span className="ms-3 text-sm text-ink-faint">
                      {a.status === "published" ? "publié" : "brouillon"}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-sm">
                    <Link
                      href={`/admin/articles/${a.id}`}
                      className="text-teal hover:text-ochre"
                    >
                      Modifier
                    </Link>
                    <form action={deleteArticle}>
                      <input type="hidden" name="id" value={a.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <button className="text-ink-faint hover:text-red-700">
                        Supprimer
                      </button>
                    </form>
                  </span>
                </li>
              );
            })}
            {(articles ?? []).length === 0 && (
              <li className="p-4 text-sm text-ink-faint">Aucun article.</li>
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
