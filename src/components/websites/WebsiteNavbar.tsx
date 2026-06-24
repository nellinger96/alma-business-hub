type WebsiteNavbarProps = {
  businessName: string;
  logoText: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent?: "blue" | "emerald" | "amber";
};

export default function WebsiteNavbar({
  businessName,
  logoText,
  ctaLabel = "Request a Quote",
  ctaHref = "#quote",
  accent = "blue",
}: WebsiteNavbarProps) {
  const accentClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    emerald: "bg-emerald-600 hover:bg-emerald-700",
    amber: "bg-amber-500 hover:bg-amber-600",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
            {logoText}
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">{businessName}</p>
            <p className="text-xs text-slate-500">Professional client services</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a href="#services" className="hover:text-slate-950">
            Services
          </a>
          <a href="#pricing" className="hover:text-slate-950">
            Pricing
          </a>
          <a href="#reviews" className="hover:text-slate-950">
            Reviews
          </a>
          <a href="#contact" className="hover:text-slate-950">
            Contact
          </a>
        </nav>

        <a
          href={ctaHref}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${accentClasses[accent]}`}
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}