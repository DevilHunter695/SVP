"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { TextField } from "./fields";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function LoginForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (String(data.get("password") ?? "").length < 6) next.password = "At least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setNotice("The investor portal is invite-only and currently in private beta.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="svp-surface mx-auto w-full max-w-md p-7 sm:p-9"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-svp-coral/12 text-svp-coral">
          <Lock className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-svp-navy-dark">Investor Portal</h1>
          <p className="text-sm text-svp-slate">Sign in to your SVP account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <TextField label="Email" name="email" type="email" placeholder="you@firm.com" required error={errors.email} />
        <TextField label="Password" name="password" type="password" placeholder="••••••••" required error={errors.password} />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-svp-slate">
            <input type="checkbox" name="remember" className="accent-svp-coral" /> Remember me
          </label>
          <a href="#" className="font-semibold text-svp-coral hover:underline">
            Forgot password?
          </a>
        </div>

        {notice && (
          <p className="rounded-xl border border-svp-border bg-svp-bg-light px-4 py-3 text-sm text-svp-slate">
            {notice}
          </p>
        )}

        <MagneticButton type="submit" variant="primary" size="lg" wrapperClassName="w-full">
          <span className="w-full text-center">Sign In</span>
        </MagneticButton>
      </form>

      <p className="mt-6 text-center text-sm text-svp-slate">
        Need access?{" "}
        <a href="/contact" className="font-semibold text-svp-coral hover:underline">
          Request an invite
        </a>
      </p>
    </motion.div>
  );
}
