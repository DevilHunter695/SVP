"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { TextField, TextArea } from "./fields";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!String(data.get("message") ?? "").trim()) next.message = "A short message helps.";
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
            <h3 className="mt-6 text-2xl font-bold text-svp-navy-dark">Message received</h3>
            <p className="mt-2 max-w-sm text-svp-slate">
              Thanks for reaching out. A member of the SVP team will get back to you shortly.
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
              <TextField label="Name" name="name" placeholder="Your full name" required error={errors.name} />
              <TextField label="Email" name="email" type="email" placeholder="you@company.com" required error={errors.email} />
            </div>
            <TextField label="Company / Subject" name="subject" placeholder="What's this about?" />
            <TextArea label="Message" name="message" placeholder="Tell us what's on your mind…" required error={errors.message} />
            <div className="pt-1">
              <MagneticButton type="submit" variant="primary" size="lg">
                Send Message
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
