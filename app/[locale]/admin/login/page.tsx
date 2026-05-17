"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const supabase = createClient();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      setBusy(false);
      setMsg(
        error
          ? error.message
          : "Compte créé. Vérifiez vos emails si la confirmation est activée, puis connectez-vous.",
      );
      if (!error) setMode("signin");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-[var(--radius-card)] border border-line bg-paper p-8"
      >
        <h1 className="font-display text-2xl text-ink">Admin · REAGE</h1>
        <p className="mt-1 text-sm text-ink-faint">
          {mode === "signin" ? "Connexion" : "Créer un compte"}
        </p>
        <label className="mt-6 block text-sm text-ink-soft">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-bone px-4 py-2.5 text-ink outline-none focus:border-teal/50"
          />
        </label>
        <label className="mt-4 block text-sm text-ink-soft">
          Mot de passe
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-bone px-4 py-2.5 text-ink outline-none focus:border-teal/50"
          />
        </label>
        {msg && <p className="mt-4 text-sm text-ochre-dark">{msg}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-teal px-5 py-3 font-medium text-bone hover:bg-teal-dark disabled:opacity-50"
        >
          {busy
            ? "…"
            : mode === "signin"
              ? "Se connecter"
              : "Créer le compte"}
        </button>
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setMode((m) => (m === "signin" ? "signup" : "signin"));
          }}
          className="mt-4 w-full text-center text-sm text-ink-soft hover:text-teal"
        >
          {mode === "signin"
            ? "Pas de compte ? Créer un compte"
            : "Déjà un compte ? Se connecter"}
        </button>
      </form>
    </div>
  );
}
