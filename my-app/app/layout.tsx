import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

// Primary Sans Font
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

// Elegant Serif Font for Headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "QDS Travels | Premium Travel & Visa Agency",
  description: "Experience seamless global travel with QDS Travels. We specialize in curated holiday packages, expert visa processing, and affordable flight bookings.",
  
  // Update this to your actual domain once deployed
  metadataBase: new URL("https://qdstravels.com"), 

  openGraph: {
    title: "QDS Travels | Your Journey, Our Expertise",
    description: "Curated world tours, seamless visa processing, and premium travel experiences starting from Nigeria.",
    url: "https://qdstravels.com",
    siteName: "QDS Travels",
    images: [
      {
        url: "/og-image.png", // Ensure you place a high-res brand image in your /public folder
        width: 1200,
        height: 630,
        alt: "QDS Travels Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "QDS Travels | Premium Travel Agency",
    description: "Flight bookings, Visa assistance, and Group Tours handled with precision.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased font-sans bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
