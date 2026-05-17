"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function str(fd: FormData, k: string): string {
  return (fd.get(k) as string | null)?.trim() ?? "";
}

export async function signOut(formData: FormData) {
  const locale = str(formData, "locale") || "fr";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}/admin/login`);
}

export async function saveEvent(formData: FormData) {
  const locale = str(formData, "locale") || "fr";
  const id = str(formData, "id");
  const titleFr = str(formData, "title_fr");
  const supabase = await createClient();

  const row = {
    slug: str(formData, "slug") || slugify(titleFr) || `event-${Date.now()}`,
    date_start: str(formData, "date_start"),
    date_end: str(formData, "date_end") || null,
    location: str(formData, "location") || null,
    helloasso_ticket_url: str(formData, "helloasso_ticket_url") || null,
    status: str(formData, "status") === "published" ? "published" : "draft",
    translations: {
      fr: { title: titleFr, body: str(formData, "body_fr") },
      en: { title: str(formData, "title_en"), body: str(formData, "body_en") },
    },
  };

  const { error } = id
    ? await supabase.from("events").update(row).eq("id", id)
    : await supabase.from("events").insert(row);
  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/evenements`);
  revalidatePath(`/${locale}`);
  redirect(`/${locale}/admin`);
}

export async function deleteEvent(formData: FormData) {
  const locale = str(formData, "locale") || "fr";
  const supabase = await createClient();
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", str(formData, "id"));
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/evenements`);
  redirect(`/${locale}/admin`);
}

export async function saveArticle(formData: FormData) {
  const locale = str(formData, "locale") || "fr";
  const id = str(formData, "id");
  const titleFr = str(formData, "title_fr");
  const supabase = await createClient();

  const status = str(formData, "status") === "published" ? "published" : "draft";
  const row = {
    slug: str(formData, "slug") || slugify(titleFr) || `article-${Date.now()}`,
    author_name: str(formData, "author_name") || null,
    published_at:
      status === "published"
        ? str(formData, "published_at") || new Date().toISOString()
        : null,
    status,
    translations: {
      fr: {
        title: titleFr,
        summary: str(formData, "summary_fr"),
        body: str(formData, "body_fr"),
      },
      en: {
        title: str(formData, "title_en"),
        summary: str(formData, "summary_en"),
        body: str(formData, "body_en"),
      },
    },
  };

  const { error } = id
    ? await supabase.from("articles").update(row).eq("id", id)
    : await supabase.from("articles").insert(row);
  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/actualites`);
  revalidatePath(`/${locale}`);
  redirect(`/${locale}/admin`);
}

export async function deleteArticle(formData: FormData) {
  const locale = str(formData, "locale") || "fr";
  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", str(formData, "id"));
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/actualites`);
  redirect(`/${locale}/admin`);
}
