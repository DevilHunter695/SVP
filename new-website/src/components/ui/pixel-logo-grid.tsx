"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────────────────────
 * Pixel canvas engine
 * Pixels ripple outward from center on hover, fade out on leave.
 * ──────────────────────────────────────────────────────────────────────────── */

type Pixel = {
  x: number; y: number; color: string; ctx: CanvasRenderingContext2D;
  speed: number; size: number; sizeStep: number; minSize: number;
  maxSizeInt: number; maxSize: number; delay: number; counter: number;
  counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean;
  draw: () => void; appear: () => void; disappear: () => void; shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number, y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0, sizeStep: Math.random() * 0.4, minSize: 0.5,
    maxSizeInt: 2, maxSize: rand(0.5, 2),
    delay, counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false, isReverse: false, isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) { p.counter += p.counterStep; return; }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false; p.counter = 0;
      if (p.size <= 0) { p.isIdle = true; return; }
      p.size -= 0.1; p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed; else p.size += p.speed;
    },
  };
  return p;
}

type PixelCanvasProps = { colors: string[]; gap?: number; speed?: number };

export function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width), h = Math.floor(height);
    canvas.width = w; canvas.height = h;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2, dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }
    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;
    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();
      if (pixels.every((p) => p.isIdle)) cancelAnimationFrame(animationRef.current);
    };
    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();
    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);
    const card = wrapRef.current?.parentElement;
    const handleEnter = () => animate("appear");
    const handleLeave = () => animate("disappear");
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * PortfolioCard
 * ──────────────────────────────────────────────────────────────────────────── */

export type PortfolioCompany = {
  name: string;
  industry: string;
  description: string;
  stage: string;
  fund: string;
  colors: string[];
  isConfidential?: boolean;
};

function getInitials(name: string): string {
  if (name === "Confidential") return "🔒";
  return name
    .split(/[\s&]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function PortfolioCard({ company }: { company: PortfolioCompany }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-lg border border-svp-border bg-svp-bg-card overflow-hidden",
        "transition-shadow duration-300 hover:shadow-[var(--svp-shadow)]"
      )}
    >
      {/* Pixel canvas — sits behind content */}
      <PixelCanvas colors={company.colors} gap={5} speed={25} />

      {/* Card content — above canvas */}
      <div className="relative z-10 flex flex-col gap-3 p-5">
        {/* Initials badge */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-svp-navy text-white text-sm font-bold select-none">
          {getInitials(company.name)}
        </div>

        {/* Company name */}
        <h3 className="text-sm font-bold leading-snug text-svp-navy-dark group-hover:text-svp-navy">
          {company.isConfidential ? "Confidential" : company.name}
        </h3>

        {/* Industry tag */}
        <span className="inline-flex w-fit items-center rounded-full bg-svp-coral/10 px-2.5 py-0.5 text-[11px] font-semibold text-svp-coral">
          {company.industry}
        </span>

        {/* Description */}
        <p className="text-xs leading-relaxed text-svp-slate line-clamp-2">
          {company.isConfidential ? "Details withheld" : company.description}
        </p>

        {/* Stage chip */}
        {company.stage && (
          <span className="inline-flex w-fit items-center rounded-sm bg-svp-bg-light px-2 py-0.5 text-[10px] font-medium text-svp-slate">
            {company.stage}
          </span>
        )}
      </div>
    </div>
  );
}
