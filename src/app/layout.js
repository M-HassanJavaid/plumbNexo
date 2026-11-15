import "./globals.css";
import { siteConfig } from "@/lib/site.config";
import { faqItems } from "@/content/faq";
import { caseStudies } from "@/content/caseStudies";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "PlumbNexo | Websites Built for Plumbers",
    template: "%s | PlumbNexo",
  },
  description: siteConfig.description,
  keywords: [
    "plumbing website design",
    "websites for plumbers",
    "plumber web design",
    "Charlotte plumbing marketing",
    "plumber website builder",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  openGraph: {
    title: "PlumbNexo | Websites Built for Plumbers",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlumbNexo | Websites Built for Plumbers",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export default function RootLayout({ children }) {
  const baseUrl = siteConfig.siteUrl;

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Charlotte, NC",
      },
      {
        "@type": "Country",
        name: "United States",
      },
    ],
    sameAs: [siteConfig.instagramUrl],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const videoSchemas = caseStudies.map((study) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${study.title} Website Case Study`,
    description: study.summary,
    thumbnailUrl: `${baseUrl}${study.posterSrc}`,
    uploadDate: "2026-01-01T08:00:00+00:00",
    duration: "PT45S",
    contentUrl: `${baseUrl}${study.videoSrc}`,
  }));

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {videoSchemas.map((vSchema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(vSchema) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F8F2] text-[#122B2A]">
        {/* Skip to Content link for accessibility (WCAG 2.1 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#122B2A] text-white font-bold py-2 px-4 rounded-md shadow-lg outline-none ring-2 ring-[#B8F36B]"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
