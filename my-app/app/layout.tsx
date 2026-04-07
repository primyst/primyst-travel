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
  title: "Destination Royale — Demo Preview",
  description: "Unofficial demo. Not affiliated with Destination Royale Services.",
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
        {/* Demo Banner */}
        <div className="w-full sticky top-0 z-50 bg-[#005B82] text-white text-center py-2 px-4 text-xs tracking-wide">
          <span className="font-medium">Demo Preview</span>
          <span className="mx-2 opacity-50">·</span>
          This is an unofficial concept site. Not affiliated with Destination Royale Services. Will be taken down immediately upon request or if they decline.
        </div>

        {children}
      </body>
    </html>
  );
  }
