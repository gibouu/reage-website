import { createClient } from "./server";
import type { Event, Article, Translations, Translation } from "./types";

/** Resolve localized content with French fallback. */
export function pickT(translations: unknown, locale: string): Translation {
  const t = (translations ?? {}) as Translations;
  return { ...(t.fr ?? {}), ...(t[locale] ?? {}) };
}

export async function getPublishedEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("date_start", { ascending: true });
  return data ?? [];
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}
