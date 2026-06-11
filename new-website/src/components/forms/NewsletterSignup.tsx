"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <div className={compact ? "" : "svp-surface p-7 sm:p-9"}>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-xl border border-svp-border bg-svp-bg-light px-5 py-4"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-svp-coral/15 text-svp-coral">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <p className="text-sm font-semibold text-svp-navy-dark">
              You're in. Watch your inbox for the next edition.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3 sm:flex-row"
            noValidate
          >
            <div className="flex-1">
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                aria-label="Email address"
                className="w-full rounded-full border border-svp-border bg-svp-bg-card px-5 py-3.5 text-sm text-svp-navy-dark placeholder:text-svp-slate/60 outline-none transition-colors focus:border-svp-coral focus:ring-2 focus:ring-svp-coral/25"
              />
              {error && <p className="mt-1.5 px-2 text-xs font-medium text-svp-coral">{error}</p>}
            </div>
            <MagneticButton type="submit" variant="primary" size="md">
              Subscribe
            </MagneticButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
