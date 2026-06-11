"use client";

import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   GSAP magnetic effect — the element follows the cursor with a soft pull and
   3D tilt, then springs back with an elastic ease. Disabled on touch devices.
   ────────────────────────────────────────────────────────────────────────── */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    // Skip the effect on touch / coarse pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          transformPerspective: 500,
          ease: "power2.out",
          duration: 0.4,
        });
      };
      const handleLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    }, el);

    return () => ctx.revert();
  }, [strength]);

  return ref;
}

/* ──────────────────────────────────────────────────────────────────────────
   MagneticButton — styled pill CTA built on the magnetic effect.
   Polymorphic: renders a Next <Link> when `href` is set, otherwise a <button>.
   ────────────────────────────────────────────────────────────────────────── */
type Variant = "primary" | "outline" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_10px_30px_-10px_rgba(240,80,79,0.6)] " +
    "[background:linear-gradient(135deg,#f0504f_0%,#c94fa0_100%)] hover:brightness-[1.06]",
  outline:
    "border border-svp-navy/40 text-svp-navy hover:border-svp-coral hover:text-svp-coral bg-transparent",
  glass: "svp-chip text-svp-navy-dark hover:border-svp-coral/50",
  ghost: "text-svp-slate hover:text-svp-coral bg-transparent",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-[38px] px-5 text-[13px] rounded-full gap-2",
  md: "min-h-[46px] px-7 text-sm rounded-full gap-2.5",
  lg: "min-h-[56px] px-10 text-base rounded-full gap-3",
};

export interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Extra classes on the element (kept for API compatibility). */
  wrapperClassName?: string;
  strength?: number;
  /** Retained for API compatibility (tilt is derived from movement). */
  tilt?: number;
  external?: boolean;
  "aria-label"?: string;
}

export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  function MagneticButton(
    {
      children,
      href,
      onClick,
      type = "button",
      variant = "primary",
      size = "md",
      className,
      wrapperClassName,
      strength = 0.4,
      external,
      ...rest
    },
    _ref
  ) {
    const magneticRef = useMagnetic(strength);

    const inner = cn(
      "relative inline-flex items-center justify-center font-bold uppercase tracking-wide cursor-pointer select-none " +
        "transition-[filter,color,border-color,background] duration-300 will-change-transform",
      SIZES[size],
      VARIANTS[variant],
      wrapperClassName,
      className
    );

    const content = <span className="inline-flex items-center justify-center gap-2">{children}</span>;

    const setRef = (node: HTMLElement | null) => {
      (magneticRef as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    if (href) {
      return external ? (
        <a
          ref={setRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={inner}
          {...rest}
        >
          {content}
        </a>
      ) : (
        <Link ref={setRef as never} href={href} onClick={onClick} className={inner} {...rest}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={setRef as never} type={type} onClick={onClick} className={inner} {...rest}>
        {content}
      </button>
    );
  }
);
