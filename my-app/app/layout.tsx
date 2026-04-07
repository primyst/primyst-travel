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
  title: "Destination Royale — Concept Preview",
  description:
    "Independent redesign concept showcasing potential improvements. Not affiliated with Destination Royale Services.",
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
        {/* Demo Banner */}
        <div className="fixed top-0 left-0 w-full z-[60] bg-[#005B82] text-white text-center py-2 px-4 text-[11px] tracking-wide">
          <span className="font-medium">Concept Preview</span>
          <span className="mx-2 opacity-50">·</span>
          Concept Preview • Sample design. Not affiliated with Destination Royale YET
        </div>

        {children}
      </body>
    </html>
  );
}