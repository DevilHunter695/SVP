"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, MapPin, ArrowUpRight } from "lucide-react";

/* ── Liquid-glass styling (self-contained, theme-adaptive) ───────────────── */
const GLASS_CSS = `
  .lg-fab {
    background: linear-gradient(145deg, rgba(20,24,38,0.82), rgba(12,15,26,0.82));
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.16);
    box-shadow:
      0 14px 36px -8px rgba(0,0,0,0.5),
      0 0 0 1px rgba(240,80,79,0.0),
      inset 0 1px 1px rgba(255,255,255,0.22);
    transition: box-shadow .3s, transform .2s;
  }
  .lg-fab:hover {
    box-shadow:
      0 18px 44px -8px rgba(0,0,0,0.55),
      0 0 0 4px rgba(240,80,79,0.18),
      inset 0 1px 1px rgba(255,255,255,0.28);
  }
  .lg-surface {
    background:
      linear-gradient(145deg,
        color-mix(in srgb, var(--svp-bg-card) 82%, transparent),
        color-mix(in srgb, var(--svp-bg-card) 66%, transparent));
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid color-mix(in srgb, var(--svp-navy-dark) 14%, transparent);
    box-shadow:
      0 22px 60px -14px rgba(0,0,0,0.45),
      inset 0 1px 1px color-mix(in srgb, white 40%, transparent);
  }
  .lg-chip {
    background: color-mix(in srgb, var(--svp-bg-light) 72%, transparent);
    border: 1px solid var(--svp-border);
    transition: border-color .25s, background .25s, transform .25s;
  }
  .lg-chip:hover {
    border-color: color-mix(in srgb, var(--svp-coral) 55%, transparent);
    transform: translateY(-2px);
  }
`;

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.16a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/sriventurepartners/", Icon: LinkedinIcon },
  { label: "X",         href: "https://x.com/svpifsc",                                 Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/svp.fund/",                   Icon: InstagramIcon },
];

const OFFICES = [
  {
    city: "GIFT City",
    region: "Gandhinagar, Gujarat",
    address:
      "Sri Venture Partners, SI-G-103, Shilp Incubation Centre, Plot T 3 & T 5, Block – 11, GIFT SEZ, GIFT City, Gandhinagar – 382355, GJ, India",
  },
  {
    city: "Hyderabad",
    region: "Telangana",
    address:
      "Sri Venture Partners, WeWork 7B-116, RMZ Spire, Level 7, Tower 100, Hyderabad – 500081, TG, India",
  },
];

const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function FloatingActionMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLASS_CSS }} />

      {/* Click-away backdrop */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[89] cursor-default bg-black/20 backdrop-blur-[2px] print:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[90] sm:bottom-6 sm:right-6 print:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{ transformOrigin: "bottom right" }}
              className="lg-surface absolute bottom-[4.25rem] right-0 w-[min(86vw,300px)] overflow-hidden rounded-[26px] p-4"
            >
              <p className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-svp-slate">Connect</p>
              <div className="mt-2.5 flex gap-2">
                {SOCIALS.map(({ label, href, Icon }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="lg-chip grid h-11 flex-1 place-items-center rounded-2xl text-svp-navy-dark hover:text-svp-coral"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>

              <p className="mt-4 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-svp-slate">Visit us</p>
              <div className="mt-2.5 flex flex-col gap-2">
                {OFFICES.map((o, i) => (
                  <motion.a
                    key={o.city}
                    href={mapsUrl(o.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06 }}
                    className="lg-chip group flex items-center gap-3 rounded-2xl p-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-svp-coral/12 text-svp-coral">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-tight text-svp-navy-dark">{o.city}</span>
                      <span className="block truncate text-[11px] text-svp-slate">{o.region}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-svp-slate transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-svp-coral" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger — fixed size, icon cross-fades (no layout shift) */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          aria-label={open ? "Close contact menu" : "Open contact menu"}
          aria-expanded={open}
          className="lg-fab relative grid h-14 w-14 place-items-center rounded-full text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 grid place-items-center"
            >
              {open ? <X className="h-6 w-6" strokeWidth={2.4} /> : <MessageCircle className="h-6 w-6" strokeWidth={2.2} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

export default FloatingActionMenu;
