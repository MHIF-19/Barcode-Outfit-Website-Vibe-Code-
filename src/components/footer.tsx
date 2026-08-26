const SOCIALS = ["Instagram", "TikTok", "Pinterest"];

const COLUMNS = [
  {
    title: "Shop",
    links: ["Men", "Women", "Kids", "New Arrivals", "Collections"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Careers"],
  },
  {
    title: "Support",
    links: ["Shipping", "Returns", "Size Guide"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink px-6 pt-20 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 pb-16 md:grid-cols-6">
        <div className="col-span-2 md:col-span-2">
          <p className="font-display text-2xl text-paper">Barcode Outfit</p>
          <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-mist">
            Premium modern fashion for men, women and kids. Designed with
            restraint, built to last.
          </p>
          <div className="mt-6 flex items-center gap-4 text-mist">
            {SOCIALS.map((social) => (
              <a
                key={social}
                href="#"
                className="label text-[10px] hover:text-paper"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="label text-[11px] text-mist">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-paper/85 transition-colors hover:text-paper"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line-dark py-6">
        <p className="text-center text-[11px] text-mist">
          © {new Date().getFullYear()} Barcode Outfit. All rights reserved.
        </p>
      </div>

      <p
        aria-hidden="true"
        className="select-none overflow-hidden whitespace-nowrap pb-2 text-center font-display text-[19vw] leading-none tracking-tight text-paper/5"
      >
        BARCODE
      </p>
    </footer>
  );
}
