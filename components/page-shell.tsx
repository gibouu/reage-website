export function PageShell({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16 md:py-20">
          {kicker && (
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-ochre">
              {kicker}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
        </div>
        <div className="amazigh-rule" aria-hidden />
      </section>
      <section className="container-page py-16 md:py-20">{children}</section>
    </>
  );
}
