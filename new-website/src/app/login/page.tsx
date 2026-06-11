import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to the Sri Venture Partners investor portal.",
};

export default function LoginPage() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-gradient-to-b from-svp-bg-light to-svp-bg-page px-4 pt-[120px] pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2"
        style={{
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--svp-coral) 14%, transparent), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </section>
  );
}
