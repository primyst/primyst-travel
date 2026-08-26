import PackageCard from "./PackageCard";
import { PACKAGES } from "./data";

export default function Packages(){return <section id="packages" className="bg-white py-24"><div className="mx-auto max-w-6xl px-4 sm:px-6"><div className="mb-12 max-w-2xl"><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">Pick a trip</p><h2 className="text-4xl font-black tracking-tight text-[#0D9488] sm:text-5xl">Know where you want to go?</h2><p className="mt-3 text-gray-500">Start with one of these trips. The important bits are already laid out — price, dates and what you are actually getting.</p></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{PACKAGES.map(pkg=><PackageCard key={pkg.id} pkg={pkg}/>)}</div></div></section>}
