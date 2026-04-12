import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Concept Preview",
  description:
    "Independent redesign concept showcasing potential improvements. Not affiliated with anyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased font-sans bg-white text-slate-900 pt-8`}
      >

        {children}
      </body>
    </html>
  );
}
