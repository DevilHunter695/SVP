import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BLOGS, getPost } from "@/components/blog/blog-data";

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const initials = post.author
    ? post.author.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")
    : "SVP";

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.subtitle}
        compact
      />

      <article className="bg-svp-bg-page pb-20">
        <div className="svp-container max-w-3xl">
          {/* Back link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-svp-slate transition-colors hover:text-svp-coral"
          >
            <ArrowLeft className="h-4 w-4" /> All insights
          </Link>

          {/* Byline */}
          {post.author && (
            <div className="mt-6 flex items-center gap-3 border-y border-svp-border py-4">
              <span
                className="grid h-11 w-11 place-items-center rounded-full text-sm font-black text-white"
                style={{ background: `linear-gradient(145deg, ${post.accent}, #1d4496)` }}
              >
                {initials}
              </span>
              <div>
                <div className="text-sm font-bold text-svp-navy-dark">{post.author}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-svp-slate">
                  {post.role}
                </div>
              </div>
            </div>
          )}

          {/* Body */}
          {post.body ? (
            <div className="mt-9 space-y-6">
              {post.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg leading-relaxed text-svp-navy-dark first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-svp-coral"
                      : "text-[17px] leading-relaxed text-svp-slate"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-svp-border bg-svp-bg-card p-10 text-center">
              <h2 className="text-2xl font-bold text-svp-navy-dark">Full article coming soon</h2>
              <p className="mx-auto mt-3 max-w-md text-svp-slate">
                {post.excerpt} We&apos;re putting the finishing touches on this piece — check back shortly.
              </p>
              <div className="mt-7 flex justify-center">
                <MagneticButton href="/newsletter" variant="primary" size="md">
                  Get notified
                </MagneticButton>
              </div>
            </div>
          )}

          {/* Footer CTA */}
          {post.body && (
            <div className="mt-14 rounded-3xl border border-svp-border bg-svp-bg-light p-8 text-center">
              <p className="text-lg font-bold text-svp-navy-dark">
                Enjoyed this? There&apos;s more where it came from.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <MagneticButton href="/newsletter" variant="primary" size="md">
                  Subscribe
                </MagneticButton>
                <MagneticButton href="/blogs" variant="outline" size="md">
                  More insights <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
