import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { pickT } from "@/lib/supabase/queries";
import { saveEvent } from "../../actions";

export const dynamic = "force-dynamic";

const input =
  "mt-1 w-full rounded-xl border border-line bg-bone px-4 py-2.5 text-ink outline-none focus:border-teal/50";

export default async function EventEditor(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const editing = id !== "new";
  const { data: ev } = editing
    ? await supabase.from("events").select("*").eq("id", id).maybeSingle()
    : { data: null };
  const fr = pickT(ev?.translations, "fr");
  const en = pickT(ev?.translations ?? {}, "en");

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink">
        {editing ? "Modifier l'événement" : "Nouvel événement"}
      </h1>
      <form action={saveEvent} className="mt-6 space-y-5">
        <input type="hidden" name="locale" value={locale} />
        {editing && <input type="hidden" name="id" value={id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-ink-soft">
            Date de début
            <input
              type="date"
              name="date_start"
              required
              defaultValue={ev?.date_start ?? ""}
              className={input}
            />
          </label>
          <label className="block text-sm text-ink-soft">
            Date de fin (option.)
            <input
              type="date"
              name="date_end"
              defaultValue={ev?.date_end ?? ""}
              className={input}
            />
          </label>
        </div>
        <label className="block text-sm text-ink-soft">
          Lieu
          <input
            name="location"
            defaultValue={ev?.location ?? ""}
            className={input}
          />
        </label>
        <label className="block text-sm text-ink-soft">
          Lien billetterie HelloAsso (option.)
          <input
            name="helloasso_ticket_url"
            defaultValue={ev?.helloasso_ticket_url ?? ""}
            className={input}
          />
        </label>
        <label className="block text-sm text-ink-soft">
          Slug (option., auto depuis le titre)
          <input name="slug" defaultValue={ev?.slug ?? ""} className={input} />
        </label>

        <fieldset className="rounded-xl border border-line p-4">
          <legend className="px-2 text-sm font-medium text-ink">
            Français
          </legend>
          <label className="block text-sm text-ink-soft">
            Titre
            <input
              name="title_fr"
              required
              defaultValue={fr.title ?? ""}
              className={input}
            />
          </label>
          <label className="mt-3 block text-sm text-ink-soft">
            Description
            <textarea
              name="body_fr"
              rows={4}
              defaultValue={fr.body ?? ""}
              className={input}
            />
          </label>
        </fieldset>

        <fieldset className="rounded-xl border border-line p-4">
          <legend className="px-2 text-sm font-medium text-ink">
            English (optional)
          </legend>
          <label className="block text-sm text-ink-soft">
            Title
            <input
              name="title_en"
              defaultValue={en.title ?? ""}
              className={input}
            />
          </label>
          <label className="mt-3 block text-sm text-ink-soft">
            Description
            <textarea
              name="body_en"
              rows={4}
              defaultValue={en.body ?? ""}
              className={input}
            />
          </label>
        </fieldset>

        <label className="block text-sm text-ink-soft">
          Statut
          <select
            name="status"
            defaultValue={ev?.status ?? "draft"}
            className={input}
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </label>

        <button
          type="submit"
          className="rounded-full bg-teal px-6 py-3 font-medium text-bone hover:bg-teal-dark"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
