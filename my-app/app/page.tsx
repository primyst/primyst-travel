"use client";

import Navbar from "../components/travel/Navbar";
import Hero from "../components/travel/Hero";
import Packages from "../components/travel/Packages";
import { Journey, WhyUs, CTASection, Footer } from "../components/travel/Sections";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Packages />
      <Journey />
      <WhyUs />
      <CTASection />
      <Footer />
    </main>
  );
}
