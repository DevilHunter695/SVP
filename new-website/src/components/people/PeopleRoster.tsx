"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PEOPLE, PEOPLE_GROUPS, type Person, type PeopleGroup } from "./people-data";
import { ProfileModal, PersonAvatar, displayPersonName } from "./PeopleCarousel";

type Filter = "All" | PeopleGroup;
const FILTERS: Filter[] = ["All", ...PEOPLE_GROUPS];

export function PeopleRoster() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const groups = useMemo(
    () => (filter === "All" ? PEOPLE_GROUPS : [filter]),
    [filter]
  );

  return (
    <>
      {/* Filter pills (portfolio-style) */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          const count = f === "All" ? PEOPLE.length : PEOPLE.filter((p) => p.group === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all duration-200 sm:text-xs",
                active
                  ? "border-svp-coral bg-svp-coral text-white shadow-[0_4px_16px_-4px_rgba(240,80,79,0.5)]"
                  : "border-svp-border bg-svp-bg-card text-svp-slate hover:border-svp-coral/50 hover:text-svp-navy-dark",
              ].join(" ")}
            >
              {f}
              <span className={active ? "ml-1.5 text-white/70" : "ml-1.5 text-svp-slate/50"}>
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-12 sm:space-y-16">
        {groups.map((group) => {
          const members = PEOPLE.filter((p) => p.group === group);
          if (members.length === 0) return null;
          return (
            <div key={group}>
              <div className="mb-6 flex items-center gap-4 sm:mb-7">
                <h3 className="text-base font-bold uppercase tracking-wide text-svp-navy-dark sm:text-lg">
                  {group}
                </h3>
                <span className="h-px flex-1 bg-svp-border" />
                <span className="text-sm font-semibold text-svp-slate">
                  {String(members.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {members.map((p, i) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl border border-svp-border bg-svp-bg-card text-left shadow-sm transition-shadow hover:shadow-[var(--svp-shadow)]"
                    aria-label={`View profile of ${displayPersonName(p.name)}`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <PersonAvatar
                        person={p}
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                        initialsClassName="text-3xl sm:text-4xl"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 55%, rgba(8,11,20,0.78) 100%)",
                        }}
                      />
                      <span className="absolute right-2.5 top-2.5 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="text-[13px] font-bold leading-snug text-svp-navy-dark sm:text-sm">
                        {displayPersonName(p.name)}
                      </h4>
                      <p className="mt-0.5 text-[11px] font-semibold text-svp-coral sm:text-xs">
                        {p.role}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProfileModal person={selected} onClose={() => setSelected(null)} />
    </>
  );
}
