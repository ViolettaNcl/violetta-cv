import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Violetta Nicolaou — Junior Full-Stack .NET Developer",
  description: "Portfolio and interactive CV of Violetta Nicolaou, a Junior Full-Stack .NET Developer focused on C#, ASP.NET Core, SQL Server, TypeScript and React.",
  keywords: ["Junior Full-Stack Developer", ".NET Developer", "C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "TypeScript", "React", "Next.js", "JavaScript", "Docker", "Junior Developer"],
  authors: [{ name: "Violetta Nicolaou" }],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Violetta Nicolaou",
  email: "mailto:violettanicolaou@gmail.com",
  url: "https://github.com/ViolettaNcl",
  sameAs: ["https://github.com/ViolettaNcl"],
  jobTitle: "Junior Full-Stack .NET Developer",
  knowsLanguage: ["Russian", "English", "Greek", "French"],
  knowsAbout: ["C#", ".NET", "ASP.NET Core", "Entity Framework Core", "SQL Server", "TypeScript", "React", "Next.js", "JavaScript", "Docker", "Machine Learning"],
  address: { "@type": "PostalAddress", addressLocality: "Volgograd", addressCountry: "RU" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
