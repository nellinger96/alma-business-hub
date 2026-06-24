type WebsiteFooterProps = {
  businessName: string;
  tagline: string;
  phone?: string;
  email?: string;
};

export default function WebsiteFooter({
  businessName,
  tagline,
  phone = "(000) 000-0000",
  email = "info@example.com",
}: WebsiteFooterProps) {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold">{businessName}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">{tagline}</p>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Next Step</h4>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Submit a quote request and our team will follow up as soon as possible.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {businessName}. All rights reserved.
      </div>
    </footer>
  );
}