import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "254SEXTONIGHT - Pleasure Paradise",
  description: "254SEXTONIGHT connects Kenyans with trusted, vetted escorts for quick hookups, sexy massages, and exclusive orgy events. Whether you're after fast fun, sensual masseuses with happy endings, or wild Nairobi parties — we’ve got you covered. Reliable. Discreet. Always ready. WhatsApp +254751173621",
  keywords: [
    "Nairobi escorts",
    "254SexTonight",
    "254 wetpussy",
    "Nairobi nightlife",
    "Kenya parties",
    "massage services Nairobi"
  ],
  authors: [
    { name: "Nexeliumke", url: "https://nexelium.vercel.app" }
  ],
  creator: "254SexTonight",
  metadataBase: new URL("https://254sextonight.uno"),
  openGraph: {
    title: "254SEXTONIGHT - Pleasure Paradise",
    description: "Kenya’s most trusted hookup spot. Vetted escorts, sexy masseuses, fast sex, and wild orgy parties — all at your fingertips.",
    url: "https://254sextonight.uno",
    siteName: "254SEXTONIGHT",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "254SEXTONIGHT Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "254SEXTONIGHT - Pleasure Paradise",
    description: "Kenya’s most trusted hookup spot. Vetted escorts, sexy masseuses, fast sex, and wild orgy parties — all at your fingertips.",
    images: ["/logo.png"],
    site: "@254SexTonight",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png"
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} w-full antialiased`}>
        <Header />
        {children}
        <Footer />

        {/* 🔍 Optional: Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "254SEXTONIGHT",
              url: "https://254sextonight.uno",
              description: "Luxury escorts and parties in Nairobi.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE"
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254751173621",
                contactType: "customer service"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
