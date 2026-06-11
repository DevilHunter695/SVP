"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { TextField, TextArea, SelectField } from "./fields";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function PitchForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("founder") ?? "").trim()) next.founder = "Required.";
    if (!String(data.get("company") ?? "").trim()) next.company = "Required.";
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!String(data.get("summary") ?? "").trim()) next.summary = "Give us the one-paragraph version.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <div className="svp-surface relative overflow-hidden p-7 sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-svp-coral/15 text-svp-coral">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>
            <h3 className="mt-6 text-2xl font-bold text-svp-navy-dark">Pitch submitted</h3>
            <p className="mt-2 max-w-sm text-svp-slate">
              We read every submission. If there's a fit, you'll hear from the investment team within 10 business days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Founder name" name="founder" placeholder="Your name" required error={errors.founder} />
              <TextField label="Company" name="company" placeholder="Company name" required error={errors.company} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Email" name="email" type="email" placeholder="you@company.com" required error={errors.email} />
              <TextField label="Website" name="website" placeholder="https://" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField label="Situation" name="situation" defaultValue="">
                <option value="" disabled>Select…</option>
                <option>Distressed / NPA</option>
                <option>Restructuring needed</option>
                <option>Post-restructuring growth</option>
                <option>Other</option>
              </SelectField>
              <SelectField label="Capital sought" name="capital" defaultValue="">
                <option value="" disabled>Select…</option>
                <option>Under ₹5 Cr</option>
                <option>₹5 – 25 Cr</option>
                <option>₹25 – 100 Cr</option>
                <option>₹100 Cr+</option>
              </SelectField>
            </div>
            <TextArea
              label="The one-paragraph pitch"
              name="summary"
              placeholder="What's the business, what went wrong, and why is it worth saving?"
              required
              error={errors.summary}
            />
            <div className="pt-1">
              <MagneticButton type="submit" variant="primary" size="lg">
                Submit Pitch
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
