import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { BLOGS } from "@/components/blog/blog-data";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Insights from Sri Venture Partners on distressed investing, MSME turnarounds, and value creation.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Notes on building <span className="text-svp-coral">durable value</span>
          </>
        }
        subtitle="Longer-form thinking from the SVP team — strategy, operations, structuring, and the occasional hard-won lesson."
        compact
      />

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 py-2 sm:gap-x-10 sm:gap-y-14">
            {BLOGS.map((post, idx) => {
              const ready = !!post.body;
              const gradientTo = idx % 2 === 0 ? "#2872fa" : "#f0504f";
              return (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group relative h-[340px] w-[280px] transition-all duration-500 sm:h-[360px] sm:w-[310px]"
                >
                  {/* Skewed colour glow — the flourish, expands on hover */}
                  <span
                    className="absolute top-0 left-[34px] h-full w-1/2 skew-x-[14deg] rounded-2xl transition-all duration-500 group-hover:left-[14px] group-hover:w-[calc(100%-64px)] group-hover:skew-x-0"
                    style={{ background: `linear-gradient(315deg, ${post.accent}, ${gradientTo})`, opacity: 0.9 }}
                  />
                  <span
                    className="absolute top-0 left-[34px] h-full w-1/2 skew-x-[14deg] rounded-2xl blur-[30px] transition-all duration-500 group-hover:left-[14px] group-hover:w-[calc(100%-64px)] group-hover:skew-x-0"
                    style={{ background: `linear-gradient(315deg, ${post.accent}, ${gradientTo})`, opacity: 0.55 }}
                  />

                  {/* Content — accent-tinted dark glass so white text always reads */}
                  <div
                    className="relative z-20 flex h-full flex-col rounded-2xl p-6 text-white shadow-xl backdrop-blur-[10px] transition-all duration-500 group-hover:-translate-x-3"
                    style={{
                      background: `linear-gradient(155deg, color-mix(in srgb, ${post.accent} 36%, rgba(9,12,22,0.92)), rgba(9,12,22,0.94))`,
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                      {idx === 0 ? `Featured · ${post.category}` : post.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold leading-tight">{post.title}</h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/90">
                      {post.excerpt}
                    </p>
                    {post.author && (
                      <p className="mt-3 text-[12px] font-semibold text-white/80">
                        {post.author} · {post.role}
                      </p>
                    )}
                    <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-svp-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[#ffcf4d]">
                      {ready ? "Read More" : "Coming soon"} <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
