import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${site.name} | Industrial Plumbing Contractors in Durban`,
  description: `${site.name} is an industrial plumbing contractor based in ${site.city}, ${site.region}. Process piping, plant maintenance, industrial drainage, pumps, water systems and breakdown response for factories, warehouses and facilities. Call ${site.phoneDisplay}.`,
  keywords: [
    "industrial plumbing Durban",
    "industrial plumber KwaZulu-Natal",
    "process piping Durban",
    "factory plumbing maintenance",
    "industrial drainage Durban",
    "commercial plumbing contractor KZN",
    "Plumb All and General",
  ],
  openGraph: {
    title: `${site.name} | Industrial Plumbing, Durban`,
    description: site.tagline,
    locale: "en_ZA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090c",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: site.name,
  telephone: site.phoneTel,
  description: site.tagline,
  areaServed: [site.city, site.region],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "ZA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
