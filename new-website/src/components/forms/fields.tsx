"use client";

import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-svp-border bg-svp-bg-card px-4 py-3 text-sm text-svp-navy-dark " +
  "placeholder:text-svp-slate/60 outline-none transition-colors " +
  "focus:border-svp-coral focus:ring-2 focus:ring-svp-coral/25";

export function FieldShell({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold uppercase tracking-wider text-svp-slate"
      >
        {label} {required && <span className="text-svp-coral">*</span>}
      </label>
      {children}
      {error && <span className="text-xs font-medium text-svp-coral">{error}</span>}
    </div>
  );
}

export function TextField({
  label,
  error,
  required,
  id,
  className,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} htmlFor={id ?? props.name ?? ""} required={required} error={error} className={className}>
      <input id={id ?? props.name} className={base} {...props} />
    </FieldShell>
  );
}

export function TextArea({
  label,
  error,
  required,
  id,
  className,
  ...props
}: { label: string; error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} htmlFor={id ?? props.name ?? ""} required={required} error={error} className={className}>
      <textarea id={id ?? props.name} className={cn(base, "min-h-[130px] resize-y")} {...props} />
    </FieldShell>
  );
}

export function SelectField({
  label,
  error,
  required,
  id,
  className,
  children,
  ...props
}: { label: string; error?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} htmlFor={id ?? props.name ?? ""} required={required} error={error} className={className}>
      <select id={id ?? props.name} className={cn(base, "cursor-pointer")} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}
