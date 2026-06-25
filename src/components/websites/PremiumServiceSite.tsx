import type { CSSProperties, ReactNode } from "react";

type SiteColors = {
  page: string;
  paper: string;
  ink: string;
  muted: string;
  dark: string;
  accent: string;
  accentSoft: string;
  border: string;
};

type Situation = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
};

type ServiceItem = {
  title: string;
  text: string;
};

type EducationCard = {
  label: string;
  title: string;
  text: string;
};

type PremiumServiceSiteProps = {
  logoText: string;
  businessName: string;
  tagline: string;
  phoneDisplay: string;
  phoneHref: string;
  email?: string;
  address?: string;
  colors: SiteColors;
  navItems: {
    label: string;
    href: string;
  }[];
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  primaryCta: string;
  secondaryCta: string;
  sidePanelEyebrow: string;
  sidePanelTitle: string;
  sidePanelText: string;
  miniStatements: string[];
  situationsEyebrow: string;
  situationsTitle: string;
  situationsText: string;
  situations: Situation[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesText: string;
  services: ServiceItem[];
  educationEyebrow: string;
  educationTitle: string;
  educationText: string;
  educationCards: EducationCard[];
  promiseEyebrow: string;
  promiseTitle: string;
  promiseText: string;
  promiseBullets: string[];
  footerText: string;
  children: ReactNode;
};

export default function PremiumServiceSite({
  logoText,
  businessName,
  tagline,
  phoneDisplay,
  phoneHref,
  email = "Agregar email",
  address,
  colors,
  navItems,
  heroEyebrow,
  heroTitle,
  heroText,
  primaryCta,
  secondaryCta,
  sidePanelEyebrow,
  sidePanelTitle,
  sidePanelText,
  miniStatements,
  situationsEyebrow,
  situationsTitle,
  situationsText,
  situations,
  servicesEyebrow,
  servicesTitle,
  servicesText,
  services,
  educationEyebrow,
  educationTitle,
  educationText,
  educationCards,
  promiseEyebrow,
  promiseTitle,
  promiseText,
  promiseBullets,
  footerText,
  children,
}: PremiumServiceSiteProps) {
  const cssVars = {
    "--page": colors.page,
    "--paper": colors.paper,
    "--ink": colors.ink,
    "--muted": colors.muted,
    "--dark": colors.dark,
    "--accent": colors.accent,
    "--accent-soft": colors.accentSoft,
    "--line": colors.border,
  } as CSSProperties & Record<string, string>;

  return (
    <div
      style={cssVars}
      className="min-h-screen bg-[var(--page)] pb-20 text-[var(--ink)] md:pb-0"
    >
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--page)]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="#" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--dark)] text-sm font-black text-white">
              {logoText}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-black leading-none">
                {businessName}
              </p>
              <p className="mt-1 truncate text-xs font-medium text-[var(--muted)]">
                {tagline}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold text-[var(--muted)] lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[var(--ink)]">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={phoneHref}
            className="rounded-full bg-[var(--dark)] px-4 py-2.5 text-xs font-black text-white transition hover:opacity-90 md:px-5 md:text-sm"
          >
            Llamar
          </a>
        </div>
      </header>

      <main>
        <section className="px-4 py-5 md:px-6 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
              <div className="flex flex-col justify-between rounded-[2rem] bg-[var(--paper)] p-6 shadow-sm md:min-h-[680px] md:rounded-[3rem] md:p-12">
                <div>
                  <p className="w-fit rounded-full border border-[var(--line)] bg-[var(--page)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)] md:text-sm">
                    {heroEyebrow}
                  </p>

                  <h1 className="mt-7 max-w-5xl font-serif text-[clamp(3.2rem,12vw,7.8rem)] font-black leading-[0.88] tracking-tight text-[var(--ink)]">
                    {heroTitle}
                  </h1>

                  <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl md:leading-9">
                    {heroText}
                  </p>
                </div>

                <div className="mt-10">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#ayuda"
                      className="rounded-full bg-[var(--dark)] px-7 py-4 text-center text-sm font-black text-white transition hover:opacity-90"
                    >
                      {primaryCta}
                    </a>

                    <a
                      href={phoneHref}
                      className="rounded-full border border-[var(--dark)] bg-white px-7 py-4 text-center text-sm font-black text-[var(--dark)] transition hover:bg-[var(--page)]"
                    >
                      {secondaryCta}
                    </a>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {miniStatements.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[var(--line)] bg-white px-4 py-4 text-sm font-black text-[var(--ink)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] bg-[var(--dark)] p-7 text-white shadow-sm md:rounded-[3rem] md:p-10">
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--accent)]/30" />
                  <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full border border-white/15" />
                  <div className="absolute bottom-8 right-8 hidden h-24 w-24 rounded-full border border-white/10 md:block" />

                  <div className="relative">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--accent-soft)] md:text-sm">
                      {sidePanelEyebrow}
                    </p>

                    <h2 className="mt-5 max-w-md font-serif text-4xl font-black leading-[0.95] md:text-5xl">
                      {sidePanelTitle}
                    </h2>

                    <p className="mt-5 max-w-md text-base leading-8 text-white/75">
                      {sidePanelText}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[2rem] bg-[var(--accent-soft)] p-7 md:rounded-[2.5rem]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                      Primero
                    </p>
                    <h3 className="mt-5 font-serif text-3xl font-black leading-tight md:text-4xl">
                      Te escuchamos.
                    </h3>
                  </div>

                  <div className="rounded-[2rem] bg-white p-7 md:rounded-[2.5rem]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                      Después
                    </p>
                    <h3 className="mt-5 font-serif text-3xl font-black leading-tight md:text-4xl">
                      Te guiamos paso a paso.
                    </h3>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[var(--line)] bg-white p-7 md:rounded-[2.5rem]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                    Promesa
                  </p>
                  <p className="mt-4 font-serif text-3xl font-black leading-tight">
                    Sin vueltas. Sin presión. Sin hacerte sentir perdido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="situaciones" className="px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-end">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--accent)]">
                {situationsEyebrow}
              </p>

              <div>
                <h2 className="font-serif text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
                  {situationsTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                  {situationsText}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {situations.map((item, index) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`group flex min-h-[340px] flex-col justify-between rounded-[2.25rem] p-7 transition hover:-translate-y-1 md:min-h-[410px] md:rounded-[3rem] md:p-8 ${
                    index === 0
                      ? "bg-[var(--dark)] text-white"
                      : index === 1
                        ? "bg-white text-[var(--ink)]"
                        : "bg-[var(--accent-soft)] text-[var(--ink)]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-xs font-black uppercase tracking-[0.22em] md:text-sm ${
                        index === 0 ? "text-[var(--accent-soft)]" : "text-[var(--accent)]"
                      }`}
                    >
                      {item.eyebrow}
                    </p>

                    <h3 className="mt-6 font-serif text-4xl font-black leading-none md:text-5xl">
                      {item.title}
                    </h3>

                    <p
                      className={`mt-6 text-base leading-8 ${
                        index === 0 ? "text-white/75" : "text-[var(--muted)]"
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>

                  <div
                    className={`mt-10 w-fit rounded-full px-5 py-3 text-sm font-black transition ${
                      index === 0
                        ? "bg-white text-[var(--dark)]"
                        : "bg-[var(--dark)] text-white group-hover:opacity-90"
                    }`}
                  >
                    Empezar aquí
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="bg-[var(--paper)] px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--accent)]">
                  {servicesEyebrow}
                </p>

                <h2 className="mt-5 font-serif text-5xl font-black leading-none tracking-tight md:text-7xl">
                  {servicesTitle}
                </h2>

                <p className="mt-7 max-w-lg text-lg leading-9 text-[var(--muted)]">
                  {servicesText}
                </p>
              </div>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className={`rounded-[2rem] p-7 md:rounded-[2.75rem] md:p-10 ${
                      index % 3 === 0
                        ? "bg-[var(--dark)] text-white"
                        : index % 3 === 1
                          ? "bg-[var(--accent-soft)] text-[var(--ink)]"
                          : "border border-[var(--line)] bg-white text-[var(--ink)]"
                    }`}
                  >
                    <h3 className="font-serif text-3xl font-black leading-tight md:text-5xl">
                      {service.title}
                    </h3>

                    <p
                      className={`mt-5 max-w-3xl text-base leading-8 ${
                        index % 3 === 0 ? "text-white/75" : "text-[var(--muted)]"
                      }`}
                    >
                      {service.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="guia" className="px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--accent)]">
                {educationEyebrow}
              </p>

              <h2 className="mt-5 font-serif text-5xl font-black leading-none tracking-tight md:text-7xl">
                {educationTitle}
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-9 text-[var(--muted)]">
                {educationText}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {educationCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`rounded-[2rem] p-7 md:rounded-[2.75rem] md:p-10 ${
                    index === 0
                      ? "bg-[var(--dark)] text-white"
                      : "bg-white text-[var(--ink)]"
                  }`}
                >
                  <p
                    className={`text-xs font-black uppercase tracking-[0.22em] md:text-sm ${
                      index === 0 ? "text-[var(--accent-soft)]" : "text-[var(--accent)]"
                    }`}
                  >
                    {card.label}
                  </p>

                  <h3 className="mt-5 font-serif text-4xl font-black leading-tight md:text-5xl">
                    {card.title}
                  </h3>

                  <p
                    className={`mt-5 text-base leading-8 ${
                      index === 0 ? "text-white/75" : "text-[var(--muted)]"
                    }`}
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="confianza" className="px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] bg-[var(--dark)] p-5 text-white md:rounded-[3.5rem] md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div className="rounded-[2rem] bg-[var(--page)] p-7 text-[var(--ink)] md:rounded-[3rem] md:p-10">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--accent)]">
                    {promiseEyebrow}
                  </p>

                  <h2 className="mt-5 font-serif text-5xl font-black leading-none md:text-6xl">
                    {promiseTitle}
                  </h2>

                  <p className="mt-7 text-lg leading-9 text-[var(--muted)]">
                    {promiseText}
                  </p>
                </div>

                <div className="p-2 md:p-6">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--accent-soft)]">
                    Nuestra forma
                  </p>

                  <h2 className="mt-5 font-serif text-5xl font-black leading-none md:text-6xl">
                    Humano primero.
                  </h2>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {promiseBullets.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/15 px-5 py-4 text-sm font-black"
                      >
                        ✓ {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 gap-2 border-t border-black/10 bg-white p-3 shadow-2xl md:hidden">
        <a
          href={phoneHref}
          className="rounded-full bg-[var(--dark)] px-3 py-3 text-center text-xs font-black text-white"
        >
          Llamar
        </a>

        <a
          href="#ayuda"
          className="rounded-full border border-[var(--dark)] px-3 py-3 text-center text-xs font-black text-[var(--dark)]"
        >
          Ayuda
        </a>

        <a
          href="#situaciones"
          className="rounded-full bg-[var(--page)] px-3 py-3 text-center text-xs font-black text-[var(--ink)]"
        >
          Opciones
        </a>
      </div>

      <footer className="border-t border-black/10 bg-[var(--dark)] px-4 py-12 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-3xl font-black">{businessName}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{footerText}</p>
          </div>

          <div>
            <p className="font-black">Contacto</p>
            <p className="mt-4 text-sm text-white/70">Teléfono: {phoneDisplay}</p>
            <p className="mt-2 text-sm text-white/70">Email: {email}</p>
            {address && (
              <p className="mt-2 text-sm leading-6 text-white/70">{address}</p>
            )}
          </div>

          <div>
            <p className="font-black">Nuestra promesa</p>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Primero te escuchamos. Luego te explicamos. Tú decides con calma.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}