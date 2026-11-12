import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport = { themeColor: "#07060d" };

export const metadata: Metadata = {
  title: "Violetta Nicolaou — Full-Stack Developer · Web, Mobile & Bots",
  description: "Violetta Nicolaou builds web apps, Android apps, APIs and Telegram bots for businesses — from idea to launch and support. C#, ASP.NET Core, SQL Server, React, Kotlin. Remote · Cyprus · Russia. Веб-разработчик, мобильные приложения, боты.",
  keywords: ["Junior Full-Stack Developer", ".NET Developer", "C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "TypeScript", "React", "Next.js", "JavaScript", "Docker", "Kotlin", "Android", "Junior .NET Developer", "freelance developer", "web app development", "Telegram bot", "landing page", "Cyprus developer", "разработчик .NET", "разработка сайтов", "мобильное приложение", "προγραμματιστής"],
  authors: [{ name: "Violetta Nicolaou" }],
  metadataBase: new URL("https://violetta-cv.vercel.app"),
  openGraph: {
    title: "Violetta Nicolaou — Full-Stack Developer",
    description: "Web apps, mobile apps, APIs and bots — from idea to launch. Start a project or download my CV.",
    url: "https://violetta-cv.vercel.app",
    siteName: "Violetta Nicolaou",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630, alt: "Violetta Nicolaou — Full-Stack Developer" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/img/og-image.jpg"] },
  icons: { icon: "/favicon.svg", apple: "/img/avatar.webp" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Violetta Nicolaou",
  email: "mailto:violettanicolaou@gmail.com",
  url: "https://github.com/ViolettaNcl",
  sameAs: ["https://github.com/ViolettaNcl"],
  jobTitle: "Full-Stack .NET Developer",
  image: "https://violetta-cv.vercel.app/img/avatar.webp",
  description: "Freelance full-stack developer: web apps, mobile apps, APIs and bots.",
  knowsLanguage: ["Russian", "English", "Greek", "French"],
  knowsAbout: ["C#", ".NET", "ASP.NET Core", "Entity Framework Core", "SQL Server", "TypeScript", "React", "Next.js", "JavaScript", "Docker", "Kotlin", "Android", "Machine Learning"],
  address: { "@type": "PostalAddress", addressLocality: "Volgograd", addressCountry: "RU" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Vercel Web Analytics only exists on Vercel; elsewhere its script would 404. */}
        {process.env.VERCEL ? <Analytics /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
