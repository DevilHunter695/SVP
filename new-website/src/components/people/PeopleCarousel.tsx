"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { X, MapPin, ArrowUpRight, Check, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PEOPLE, type Person } from "./people-data";

/* Small brand glyph — lucide no longer ships brand icons */
function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* Confidential entries carry an internal "-2" suffix to keep keys unique */
export const displayPersonName = (name: string) =>
  name.replace(/-\d+$/, "");

const isConfidential = (p: Person) =>
  p.name.toLowerCase().startsWith("confidential");

const AVATAR_GRADIENTS = [
  "linear-gradient(145deg,#1d4496,#0b1b3a)",
  "linear-gradient(145deg,#6b4fbb,#2a1f55)",
  "linear-gradient(145deg,#c94fa0,#5a1f48)",
  "linear-gradient(145deg,#2872fa,#103a87)",
  "linear-gradient(145deg,#0d6b5e,#06302a)",
  "linear-gradient(145deg,#b03b3a,#3f1413)",
];

function initialsOf(name: string) {
  return displayPersonName(name)
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(Dr|Prof|Mr|Mrs|Ms|SRB|M)\.?\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/* Photo when available; otherwise a branded initials / silhouette avatar */
export function PersonAvatar({
  person,
  sizes,
  priority,
  initialsClassName,
}: {
  person: Person;
  sizes: string;
  priority?: boolean;
  initialsClassName?: string;
}) {
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={displayPersonName(person.name)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
    );
  }
  const grad =
    AVATAR_GRADIENTS[
      person.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) %
        AVATAR_GRADIENTS.length
    ];
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: grad }}
    >
      {isConfidential(person) ? (
        <User className="h-1/4 w-1/4 text-white/40" strokeWidth={1.5} />
      ) : (
        <span className={cn("font-black tracking-tight text-white/85", initialsClassName ?? "text-6xl")}>
          {initialsOf(person.name)}
        </span>
      )}
    </div>
  );
}

const NORMAL_SPEED = 0.5; // px / frame
const HOVER_SPEED = 0.07; // gentle crawl while hovered
const LERP = 0.06; // approach factor per frame

/* ── Person card ─────────────────────────────────────────────────────────── */
function PersonCard({
  person,
  onClick,
}: {
  person: Person;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-[370px] w-[250px] shrink-0 overflow-hidden rounded-[24px] border border-svp-border bg-svp-bg-card text-left shadow-[var(--svp-shadow)] sm:h-[460px] sm:w-[320px]"
      style={{ willChange: "transform" }}
      aria-label={`View profile of ${displayPersonName(person.name)}`}
    >
      {/* Photo */}
      <PersonAvatar person={person} sizes="320px" />
      {/* Brand wash + bottom scrim */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 38%, rgba(8,11,20,0.35) 62%, rgba(8,11,20,0.92) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, #f0504f 16%, transparent) 0%, transparent 45%)",
        }}
      />

      {/* Group chip */}
      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
        {person.group}
      </span>

      {/* Name block */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-xl font-bold leading-tight text-white">{displayPersonName(person.name)}</h3>
        <p className="mt-1 text-sm font-semibold text-svp-coral">{person.role}</p>
        <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/85">
          View profile <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
}

/* ── Profile modal ───────────────────────────────────────────────────────── */
export function ProfileModal({
  person,
  onClose,
}: {
  person: Person | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!person) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [person, onClose]);

  return (
    <AnimatePresence>
      {person && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Blurred backdrop */}
          <button
            type="button"
            aria-label="Close profile"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[rgba(6,9,18,0.62)] backdrop-blur-xl"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${person.name} — ${person.role}`}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[24px] border border-svp-border bg-svp-bg-card shadow-2xl sm:rounded-[28px] md:grid md:max-h-[88vh] md:grid-cols-[42%_58%]"
          >
            {/* Photo side */}
            <div className="group relative h-56 shrink-0 sm:h-64 md:h-auto md:min-h-[440px]">
              <PersonAvatar
                person={person}
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
                initialsClassName="text-7xl"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,11,20,0.85) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:hidden">
                <h2 className="text-2xl font-bold text-white">{displayPersonName(person.name)}</h2>
                <p className="text-sm font-semibold text-svp-coral">{person.role}</p>
              </div>
            </div>

            {/* Content side */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-9 md:max-h-[88vh]">
              <div className="hidden md:block">
                <span className="svp-label">{person.group}</span>
                <h2 className="mt-2 text-3xl font-bold leading-tight text-svp-navy-dark">
                  {displayPersonName(person.name)}
                </h2>
                <p className="mt-1 text-base font-semibold text-svp-coral">
                  {person.role}
                </p>
              </div>

              {person.location && (
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-svp-slate">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-svp-coral" />
                    {person.location}
                  </span>
                </div>
              )}

              {/* Focus tags */}
              {person.focus.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {person.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-svp-border bg-svp-bg-light px-3 py-1 text-xs font-semibold text-svp-navy"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* Bio */}
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-svp-slate">
                {person.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Highlights */}
              {person.highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {person.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-svp-navy-dark">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-svp-coral/15 text-svp-coral">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Actions */}
              {person.linkedin && (
                <div className="mt-8 flex flex-wrap gap-3 pt-2">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-[filter] hover:brightness-110 [background:linear-gradient(135deg,#1d4496_0%,#2872fa_100%)]"
                  >
                    <LinkedinGlyph className="h-4 w-4" /> Connect
                  </a>
                </div>
              )}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Carousel ────────────────────────────────────────────────────────────── */
export function PeopleCarousel() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const posRef = useRef(0);
  const curSpd = useRef(0);
  const tgtSpd = useRef(NORMAL_SPEED);
  const singleW = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Person | null>(null);

  // Pause when hovered or a modal is open; otherwise scroll
  useEffect(() => {
    tgtSpd.current = selected ? 0 : hovered ? HOVER_SPEED : NORMAL_SPEED;
  }, [hovered, selected]);

  // Measure one set's width (responsive-safe)
  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      if (setRef.current) singleW.current = setRef.current.scrollWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  // rAF marquee with lerp deceleration
  useEffect(() => {
    if (reduce) return;
    const loop = () => {
      curSpd.current += (tgtSpd.current - curSpd.current) * LERP;
      posRef.current -= curSpd.current;
      const w = singleW.current;
      if (w > 0 && posRef.current <= -w) posRef.current += w;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${posRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduce]);

  const open = useCallback((p: Person) => setSelected(p), []);
  const close = useCallback(() => setSelected(null), []);

  // Reduced motion: simple horizontal scroll, no auto-animation
  if (reduce) {
    return (
      <>
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PEOPLE.map((p) => (
            <PersonCard key={p.id} person={p} onClick={() => open(p)} />
          ))}
        </div>
        <ProfileModal person={selected} onClose={close} />
      </>
    );
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28"
          style={{ background: "linear-gradient(90deg, var(--svp-bg-page), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28"
          style={{ background: "linear-gradient(270deg, var(--svp-bg-page), transparent)" }}
        />

        <div className="overflow-hidden py-6">
          <div ref={trackRef} className="flex w-max gap-6 px-3 will-change-transform">
            <div ref={setRef} className="flex gap-6">
              {PEOPLE.map((p) => (
                <PersonCard key={p.id} person={p} onClick={() => open(p)} />
              ))}
            </div>
            {/* Duplicate set for seamless loop (aria-hidden) */}
            <div className="flex gap-6" aria-hidden>
              {PEOPLE.map((p) => (
                <PersonCard key={`dup-${p.id}`} person={p} onClick={() => open(p)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-svp-slate/70">
        Hover to slow · Click a profile to expand
      </p>

      <ProfileModal person={selected} onClose={close} />
    </>
  );
}
