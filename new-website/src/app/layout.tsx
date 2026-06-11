import type { Metadata } from "next";
import Script from "next/script";
import { PT_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionMenu } from "@/components/ui/floating-action-menu";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sriventurepartners.com"),
  title: {
    default: "Sri Venture Partners — We Fix What Others Fear To Touch",
    template: "%s | Sri Venture Partners",
  },
  description:
    "Sri Venture Partners is an MSME distressed-asset investment fund transforming Non Performing Assets into Performing Assets through patient capital, restructuring capability, and operational execution.",
  keywords: [
    "Sri Venture Partners",
    "MSME fund",
    "distressed assets",
    "NPA",
    "restructuring",
    "Hyderabad",
    "GIFT City",
    "venture capital",
  ],
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    title: "Sri Venture Partners — We Fix What Others Fear To Touch",
    description:
      "MSME :: Capital :: Propel. Transforming distress into enduring strategic institutions.",
    url: "https://sriventurepartners.com",
    siteName: "Sri Venture Partners",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ptSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Anti-flash: set .dark before React hydrates */}
      <head>
        <Script id="svp-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('svp-theme');if(t==='dark'||((!t||t==='auto')&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-svp-bg-page transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActionMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
