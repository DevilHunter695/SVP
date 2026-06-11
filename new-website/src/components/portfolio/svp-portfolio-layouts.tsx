"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

/* ═══════════════════════════════════════════════════════════════════════════
 * TYPES & DATA
 * ═══════════════════════════════════════════════════════════════════════════ */

type Status  = "disbursed" | "dd" | "pipeline";
type FundKey = "stress" | "acceleration" | "eir";

type Company = {
  name: string;
  initials: string;
  industry: string;
  description: string;
  status: Status;
  fund: FundKey;
};

const FUND_CFG: Record<FundKey, { label: string; bg: string; pixel: string[] }> = {
  stress:       { label: "Stress Funding", bg: "#c0392b", pixel: ["#c0392b", "#e74c3c", "#922b21"] },
  acceleration: { label: "Acceleration",   bg: "#1a2f5e", pixel: ["#1a2f5e", "#2e4ea3", "#1558c0"] },
  eir:          { label: "EiR Program",    bg: "#0d6b5e", pixel: ["#0d6b5e", "#0a9e8a", "#117a6b"] },
};

const STATUS_CFG: Record<Status, { dot: string; label: string }> = {
  disbursed: { dot: "#22c55e", label: "Disbursed"     },
  dd:        { dot: "#f59e0b", label: "Due Diligence" },
  pipeline:  { dot: "#94a3b8", label: "Pipeline"      },
};

const COMPANIES: Company[] = [
  { name: "Triple R India",   initials: "TR", industry: "Oil & Gas",            description: "Oil Filtration Technology",                 status: "disbursed", fund: "stress" },
  { name: "Haigreeva Infra",  initials: "HI", industry: "Engg & Construction",  description: "Engineering & Procurement Company",         status: "disbursed", fund: "stress" },
  { name: "FenoPlast India",  initials: "FP", industry: "Manufacturing",         description: "Leatherette & Poly Films",                  status: "dd",        fund: "stress" },
  { name: "Yalavarti Group",  initials: "YG", industry: "MEP Engineering",       description: "Engineering & Technical Infra Solutions",   status: "dd",        fund: "stress" },
  { name: "Vertex Holdings",  initials: "VH", industry: "Vertical Mobility",     description: "Integrated Vertical & Horizontal Mobility", status: "dd",        fund: "stress" },
  { name: "Kalpavruksha",     initials: "KP", industry: "Agri-Business",         description: "Integrated agri-business platform",         status: "pipeline",  fund: "stress" },
  { name: "Viridis Bio",      initials: "VB", industry: "CleanTech",             description: "Clean technology solutions",                status: "pipeline",  fund: "stress" },
  { name: "RDP Workstations", initials: "RW", industry: "Technology OEM/ODM",   description: "IT OEM & ODM",                              status: "disbursed", fund: "acceleration" },
  { name: "Matrika Masalas",  initials: "MM", industry: "Food",                  description: "Hand pounded Masala Maker",                 status: "disbursed", fund: "acceleration" },
  { name: "360ExTech",        initials: "3X", industry: "Technology Services",   description: "People, Talent, Product and Services",      status: "disbursed", fund: "acceleration" },
  { name: "FoodnI",           initials: "FN", industry: "Food & Beverage",       description: "B2B aggregation platform and services",     status: "pipeline",  fund: "acceleration" },
  { name: "Elida Global",     initials: "EG", industry: "Technology Services",   description: "Global technology services platform",       status: "disbursed", fund: "acceleration" },
  { name: "Blox",             initials: "BX", industry: "Real Estate Tech",      description: "Real estate technology platform",           status: "dd",        fund: "acceleration" },
  { name: "raksan",           initials: "RK", industry: "Technology Services",   description: "Technology Incubation & Acceleration",      status: "disbursed", fund: "eir" },
  { name: "moolya",           initials: "MY", industry: "Financial Services",    description: "Startup infrastructure and platform",       status: "disbursed", fund: "eir" },
  { name: "Treelife",         initials: "TL", industry: "Professional Services", description: "Professional services platform",            status: "disbursed", fund: "eir" },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * PIXEL CANVAS
 * ═══════════════════════════════════════════════════════════════════════════ */

type PX = {
  x: number; y: number; color: string; ctx: CanvasRenderingContext2D;
  speed: number; size: number; sizeStep: number; minSize: number;
  maxSizeInt: number; maxSize: number; delay: number; counter: number;
  counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean;
  draw(): void; appear(): void; disappear(): void; shimmer(): void;
};

function mkPx(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, x: number, y: number, color: string, bs: number, delay: number): PX {
  const r = (a: number, b: number) => Math.random() * (b - a) + a;
  const p: PX = {
    x, y, color, ctx,
    speed: r(0.1, 0.9) * bs, size: 0, sizeStep: Math.random() * 0.4,
    minSize: 0.5, maxSizeInt: 2, maxSize: r(0.5, 2),
    delay, counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false, isReverse: false, isShimmer: false,
    draw()      { const o = p.maxSizeInt * 0.5 - p.size * 0.5; ctx.fillStyle = p.color; ctx.fillRect(p.x + o, p.y + o, p.size, p.size); },
    appear()    { p.isIdle = false; if (p.counter <= p.delay) { p.counter += p.counterStep; return; } if (p.size >= p.maxSize) p.isShimmer = true; if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep; p.draw(); },
    disappear() { p.isShimmer = false; p.counter = 0; if (p.size <= 0) { p.isIdle = true; return; } p.size -= 0.1; p.draw(); },
    shimmer()   { if (p.size >= p.maxSize) p.isReverse = true; else if (p.size <= p.minSize) p.isReverse = false; p.size += p.isReverse ? -p.speed : p.speed; },
  };
  return p;
}

function PixelFill({ colors, gap = 5, speed = 30 }: { colors: string[]; gap?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const pxRef     = useRef<PX[]>([]);
  const animRef   = useRef<number>(0);
  const lastRef   = useRef(0);
  const rmRef     = useRef(false);

  const init = useCallback(() => {
    const cv = canvasRef.current, wr = wrapRef.current;
    if (!cv || !wr) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const { width: W, height: H } = wr.getBoundingClientRect();
    const w = Math.floor(W), h = Math.floor(H);
    if (!w || !h) return;
    cv.width = w; cv.height = h; cv.style.width = `${w}px`; cv.style.height = `${h}px`;
    const eff = rmRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const arr: PX[] = [];
    for (let x = 0; x < w; x += gap)
      for (let y = 0; y < h; y += gap) {
        const dx = x - w / 2, dy = y - h / 2;
        arr.push(mkPx(ctx, cv, x, y, colors[Math.floor(Math.random() * colors.length)], eff, rmRef.current ? 0 : Math.sqrt(dx * dx + dy * dy)));
      }
    pxRef.current = arr;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animRef.current);
    const fi = 1000 / 60;
    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      if (now - lastRef.current < fi) return;
      lastRef.current = now;
      const cv = canvasRef.current; const ctx = cv?.getContext("2d");
      if (!cv || !ctx) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of pxRef.current) p[mode]();
      if (pxRef.current.every(p => p.isIdle)) cancelAnimationFrame(animRef.current);
    };
    animRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rmRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();
    const ro = new ResizeObserver(() => init());
    if (wrapRef.current) ro.observe(wrapRef.current);
    const parent = wrapRef.current?.parentElement;
    const enter = () => animate("appear");
    const leave = () => animate("disappear");
    parent?.addEventListener("mouseenter", enter);
    parent?.addEventListener("mouseleave", leave);
    return () => { ro.disconnect(); cancelAnimationFrame(animRef.current); parent?.removeEventListener("mouseenter", enter); parent?.removeEventListener("mouseleave", leave); };
  }, [init, animate]);

  return <div ref={wrapRef} className="absolute inset-0 overflow-hidden"><canvas ref={canvasRef} className="block" /></div>;
}

/* ═══════════════════════════════════════════════════════════════════════════
 * SWIM LANES (the single, default portfolio view)
 * Uniform symmetric chips · light + dark themed · responsive · JS-driven scroll
 * ═══════════════════════════════════════════════════════════════════════════ */

const LANE_CFG: Record<FundKey, { pxPerFrame: number; dir: "normal" | "reverse" }> = {
  stress:       { pxPerFrame: 0.55, dir: "normal"  },
  acceleration: { pxPerFrame: 0.5,  dir: "reverse" },
  eir:          { pxPerFrame: 0.45, dir: "normal"  },
};

type ChipTheme = {
  bg: string; name: string; sub: string;
  pillBg: string; pillBd: string; pillTx: string; shadow: string;
};

type Dims = { chipW: number; chipH: number; gap: number };

function SwimChip({
  company, dims, theme, onHover,
}: {
  company: Company; dims: Dims; theme: ChipTheme;
  onHover: (c: Company | null) => void;
}) {
  const cfg = FUND_CFG[company.fund];
  const st  = STATUS_CFG[company.status];
  const initR = Math.round(dims.chipH * 0.22);

  return (
    <div
      className="relative shrink-0 overflow-hidden cursor-pointer group"
      style={{
        width: dims.chipW, height: dims.chipH,
        background: theme.bg,
        borderLeft: `5px solid ${cfg.bg}`,
        borderRadius: 14,
        boxShadow: theme.shadow,
      }}
      onMouseEnter={() => onHover(company)}
      onMouseLeave={() => onHover(null)}
    >
      <PixelFill colors={cfg.pixel} gap={6} speed={28} />

      <div className="absolute inset-0 z-10 flex items-center gap-3 pr-3 pl-4 sm:gap-3.5 sm:pr-4 sm:pl-5">
        {/* Initials */}
        <div
          className="flex shrink-0 items-center justify-center rounded-full font-black text-white transition-transform duration-200 group-hover:scale-110"
          style={{ width: initR * 2, height: initR * 2, fontSize: Math.round(initR * 0.72), background: cfg.bg }}
        >
          {company.initials}
        </div>

        {/* Name + industry */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-black leading-tight" style={{ fontSize: Math.round(dims.chipH * 0.16), color: theme.name }}>
            {company.name}
          </p>
          <p className="truncate mt-0.5 font-medium" style={{ fontSize: Math.round(dims.chipH * 0.12), color: theme.sub }}>
            {company.industry}
          </p>
        </div>

        {/* Status */}
        <div
          className="shrink-0 flex items-center gap-1.5 rounded-full px-2 py-1 sm:px-2.5"
          style={{ background: theme.pillBg, border: `1px solid ${theme.pillBd}` }}
        >
          <span className="rounded-full" style={{ width: 6, height: 6, background: st.dot, display: "inline-block" }} />
          <span className="text-[9px] font-bold uppercase tracking-wide hidden sm:inline" style={{ color: theme.pillTx }}>
            {st.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function SwimLane({
  fund, isActive, dims, theme, dark,
}: {
  fund: FundKey; isActive: boolean; dims: Dims; theme: ChipTheme; dark: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef(0);
  const curSpd   = useRef(0);
  const tgtSpd   = useRef(0);
  const laneHov  = useRef(false);

  const [hovered, setHovered] = useState<Company | null>(null);

  const cfg       = FUND_CFG[fund];
  const lCfg      = LANE_CFG[fund];
  const companies = COMPANIES.filter(c => c.fund === fund);
  const tiles     = [...companies, ...companies];
  const singleW   = companies.length * (dims.chipW + dims.gap);
  const normal    = lCfg.pxPerFrame;
  const isRev     = lCfg.dir === "reverse";

  const targetSpeed = !isActive ? 0 : hovered ? 0 : laneHov.current ? normal * 0.12 : normal;
  useEffect(() => { tgtSpd.current = targetSpeed; }, [targetSpeed]);

  useEffect(() => {
    if (isRev) posRef.current = -singleW;
    curSpd.current = 0;
    const loop = () => {
      curSpd.current += (tgtSpd.current - curSpd.current) * 0.055;
      if (isRev) {
        posRef.current += curSpd.current;
        if (posRef.current >= 0) posRef.current -= singleW;
      } else {
        posRef.current -= curSpd.current;
        if (posRef.current <= -singleW) posRef.current += singleW;
      }
      if (trackRef.current) trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isRev, singleW]);

  const handleLaneEnter = () => { laneHov.current = true; if (!hovered) tgtSpd.current = normal * 0.12; };
  const handleLaneLeave = () => { laneHov.current = false; if (!hovered) tgtSpd.current = isActive ? normal : 0; };
  const handleChipHover = (c: Company | null) => {
    setHovered(c);
    tgtSpd.current = c ? 0 : laneHov.current ? normal * 0.12 : (isActive ? normal : 0);
  };

  const labelTx = dark ? "rgba(255,255,255,0.72)" : "#1a2340";
  const metaTx  = dark ? "rgba(255,255,255,0.5)"  : "#6b7a8d";
  const metaBg  = dark ? "rgba(255,255,255,0.06)" : "rgba(26,35,64,0.05)";
  const metaBd  = dark ? "rgba(255,255,255,0.1)"  : "rgba(26,35,64,0.1)";

  return (
    <div
      className="transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0.15, pointerEvents: isActive ? "auto" : "none" }}
      onMouseEnter={handleLaneEnter}
      onMouseLeave={handleLaneLeave}
    >
      {/* Lane header */}
      <div className="mb-2.5 flex items-center gap-2.5 px-1 sm:gap-3">
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: cfg.bg, boxShadow: `0 0 8px ${cfg.bg}80` }} />
        <span className="text-[10px] font-black uppercase tracking-[0.18em] sm:text-[11px]" style={{ color: labelTx }}>{cfg.label}</span>
        <span
          className="ml-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
          style={{ background: metaBg, border: `1px solid ${metaBd}`, color: metaTx }}
        >
          {companies.length} cos
        </span>
        {isRev && <span className="ml-auto hidden text-[9px] font-semibold uppercase tracking-wider sm:inline" style={{ color: metaTx }}>← reverse</span>}
      </div>

      {/* Scrolling track */}
      <div className="overflow-hidden" style={{ borderRadius: 12 }}>
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: dims.gap, paddingBottom: 4, width: `${tiles.length * (dims.chipW + dims.gap)}px` }}
        >
          {tiles.map((c, i) => (
            <SwimChip key={`${c.name}-${i}`} company={c} dims={dims} theme={theme} onHover={handleChipHover} />
          ))}
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="mt-3 flex items-start gap-4 rounded-xl p-4 sm:gap-5 sm:p-5"
              style={{ background: `linear-gradient(135deg,${cfg.bg}${dark ? "18" : "12"},${cfg.bg}0a)`, border: `1px solid ${cfg.bg}30` }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white sm:h-12 sm:w-12"
                style={{ background: cfg.bg, boxShadow: `0 4px 20px ${cfg.bg}60` }}
              >
                {hovered.initials}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-black" style={{ color: theme.name }}>{hovered.name}</h4>
                <p className="text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color: cfg.bg }}>{hovered.industry}</p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: theme.sub }}>{hovered.description}</p>
              </div>
              <div
                className="hidden shrink-0 items-center gap-2 rounded-full px-3 py-1.5 sm:flex"
                style={{ background: theme.pillBg, border: `1px solid ${theme.pillBd}` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_CFG[hovered.status].dot }} />
                <span className="text-[11px] font-semibold" style={{ color: theme.pillTx }}>{STATUS_CFG[hovered.status].label}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useViewport() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return w;
}

function SwimLanes({ activeFilter, dark }: { activeFilter: string; dark: boolean }) {
  const vw = useViewport();
  const isMobile = vw < 640;

  const dims: Dims = isMobile
    ? { chipW: 210, chipH: 76, gap: 12 }
    : { chipW: 264, chipH: 94, gap: 16 };

  const theme: ChipTheme = dark
    ? {
        bg: "#111827", name: "#ffffff", sub: "rgba(255,255,255,0.45)",
        pillBg: "rgba(255,255,255,0.07)", pillBd: "rgba(255,255,255,0.1)", pillTx: "rgba(255,255,255,0.4)",
        shadow: "0 2px 16px rgba(0,0,0,0.4)",
      }
    : {
        bg: "#ffffff", name: "#1a2340", sub: "#64748b",
        pillBg: "rgba(26,35,64,0.05)", pillBd: "rgba(26,35,64,0.1)", pillTx: "#64748b",
        shadow: "0 4px 18px rgba(26,35,64,0.12)",
      };

  return (
    <div
      className="rounded-2xl px-4 py-6 sm:px-8 sm:py-8"
      style={{
        background: dark
          ? "linear-gradient(160deg,#06090f 0%,#0b1422 100%)"
          : "linear-gradient(160deg,#eef1f6 0%,#e3e8f0 100%)",
        border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #dfe4ec",
      }}
    >
      <div className="mb-6 flex flex-wrap items-end gap-x-4 gap-y-1 sm:mb-8">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#f0504f" }}>Fund Lanes</p>
          <h3 className="text-xl font-black sm:text-2xl" style={{ color: dark ? "#fff" : "#1a2340" }}>Portfolio Streams</h3>
        </div>
        <p className="mb-0.5 text-[11px] leading-snug" style={{ color: dark ? "rgba(255,255,255,0.3)" : "#94a3b8" }}>
          Hover to inspect · Middle lane scrolls in reverse
        </p>
      </div>
      <div className="flex flex-col gap-7 sm:gap-8">
        {(["stress", "acceleration", "eir"] as FundKey[]).map(fund => (
          <SwimLane
            key={fund}
            fund={fund}
            isActive={activeFilter === "all" || activeFilter === fund}
            dims={dims}
            theme={theme}
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * MAIN EXPORT
 * ═══════════════════════════════════════════════════════════════════════════ */

const FILTER_OPTS = [
  { value: "all", label: "All" },
  ...(Object.entries(FUND_CFG) as [FundKey, typeof FUND_CFG[FundKey]][]).map(([k, v]) => ({ value: k, label: v.label })),
];

export function SVPPortfolioLayouts() {
  const [filter, setFilter] = useState("all");
  const { resolvedTheme }   = useTheme();
  const dark                = resolvedTheme === "dark";

  const T = dark ? {
    wrapBg:    "#0a0e1a", wrapBorder: "rgba(255,255,255,0.07)",
    label:     "#f0504f", heading: "#f0f4ff",
    statNum:   "#ffffff", statLabel: "rgba(255,255,255,0.38)", divider: "rgba(255,255,255,0.10)",
    btnBaseBg: "#151c2e", btnBaseTx: "rgba(255,255,255,0.6)",  btnBaseBd: "rgba(255,255,255,0.12)",
    legendTx:  "rgba(255,255,255,0.35)", borderTop: "rgba(255,255,255,0.09)", hint: "rgba(255,255,255,0.22)",
  } : {
    wrapBg:    "#f4f3f0", wrapBorder: "#e5e7eb",
    label:     "#c0392b", heading: "#1a2340",
    statNum:   "#1a2340", statLabel: "#9ca3af", divider: "#d1d5db",
    btnBaseBg: "#ffffff", btnBaseTx: "#1a2340",  btnBaseBd: "rgba(26,35,64,0.2)",
    legendTx:  "#6b7a8d", borderTop: "#e5e7eb", hint: "#9ca3af",
  };

  return (
    <div
      className="rounded-2xl p-4 transition-colors duration-300 sm:p-6 lg:p-8"
      style={{ background: T.wrapBg, border: `1px solid ${T.wrapBorder}` }}
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: T.label }}>Portfolio Companies</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl" style={{ color: T.heading }}>
          Others see distress —<br className="hidden sm:block" /> we see transformation.
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-0">
          {[{ v: "40+", l: "Companies" }, { v: "6", l: "Active Funds" }, { v: "2", l: "Cities" }].map((s, i) => (
            <div key={s.l} className={cn("pr-5 sm:pr-6", i > 0 && "border-l pl-5 sm:pl-6")} style={{ borderColor: T.divider }}>
              <div className="text-2xl font-black" style={{ color: T.statNum }}>{s.v}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.statLabel }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fund filter */}
      <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
        {FILTER_OPTS.map(opt => {
          const fund   = (FUND_CFG as Record<string, typeof FUND_CFG[FundKey]>)[opt.value];
          const active = filter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(active ? "all" : opt.value)}
              className="rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200"
              style={{
                background:  active ? (fund?.bg ?? "#c0392b") : T.btnBaseBg,
                color:       active ? "white" : T.btnBaseTx,
                borderColor: active ? (fund?.bg ?? "#c0392b") : T.btnBaseBd,
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Swim lanes */}
      <SwimLanes activeFilter={filter} dark={dark} />

      {/* Legend */}
      <div
        className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-5 text-[11px] sm:mt-8"
        style={{ borderTop: `1px solid ${T.borderTop}`, color: T.legendTx }}
      >
        <div className="flex flex-wrap gap-4">
          {(Object.entries(FUND_CFG) as [FundKey, typeof FUND_CFG[FundKey]][]).map(([k, f]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: f.bg }} />
              <span className="font-medium">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {(Object.entries(STATUS_CFG) as [Status, typeof STATUS_CFG[Status]][]).map(([k, s]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.dot }} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <span className="hidden italic sm:inline" style={{ color: T.hint }}>Hover to explore · Click a fund to filter</span>
      </div>
    </div>
  );
}

export default SVPPortfolioLayouts;
