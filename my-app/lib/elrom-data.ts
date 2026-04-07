// lib/elrom-data.ts (You might want to rename this to qds-data.ts later!)

export const WA = "2347035612652"; // Updated to the QDS contact
export const BUSINESS_NAME = "QDS Travels";

export const waMsg = (
  pkg: string, name: string, phone: string,
  travelers: string, date: string, notes: string
) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    `Hi ${BUSINESS_NAME}! I'd like to book the *${pkg}* package.\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n👥 Travelers: ${travelers}\n📅 Departure: ${date}${notes ? `\n📝 Notes: ${notes}` : ""}\n\nPlease send me more details.`
  )}`;

export const packages = [
  {
    id: "bali",
    title: "Bali, Singapore & Malaysia Cruise",
    dates: "June 6 – 19, 2026",
    duration: "13 Days",
    price: "$5,350",
    tag: "Most Popular",
    flag: "🇮🇩🇸🇬🇲🇾",
    image: "/bali.jpg",
    destinations: ["Bali", "Singapore", "Malaysia"],
    includes: ["Return Flight","5 Nights Bali","3 Nights Cruise","4 Nights Singapore","Daily Breakfast","Ubud Tour","White Water Rafting","Indonesia & Singapore Visa","Bali Swing","Madam Tussauds","Sentosa Island","Travel Insurance","Airport Transfers"],
    msg: `Hi ${BUSINESS_NAME}, I'm interested in the Bali, Singapore & Malaysia Cruise (June 6–19, 2026). Please send me details.`,
  },
  {
    id: "thailand",
    title: "Explore Thailand",
    dates: "July 11 – 22, 2026",
    duration: "11 Days",
    price: "$3,600",
    tag: "Adventure",
    flag: "🇹🇭",
    image: "/thailand.jpg",
    destinations: ["Bangkok", "Phuket"],
    includes: ["Return Flight","5 Nights Bangkok","5 Nights Phuket","Daily Breakfast","Visa","Bangkok Tour","Dinner Cruise","Dream World","Yona Beach Club","Phi Phi Island","White Water Rafting","Travel Insurance","Airport Transfers"],
    msg: `Hi ${BUSINESS_NAME}, I'm interested in the Thailand package (July 11–22, 2026). Please send me details.`,
  },
  {
    id: "senegal",
    title: "Senegal & Gambia",
    dates: "June 20 – 26, 2026",
    duration: "6 Days",
    price: "$2,200",
    tag: "Culture",
    flag: "🇸🇳🇬🇲",
    image: "/senegal.jpg",
    destinations: ["Dakar", "Banjul"],
    includes: ["Return Flight","4 Nights Senegal","2 Nights Gambia","Daily Breakfast","Dakar City Tour","Gambia City Tour","Pink Lake","Goree Island","Monkey Park","Crocodile Park","Travel Insurance","Airport Transfers"],
    msg: `Hi ${BUSINESS_NAME}, I'm interested in the Senegal & Gambia package (June 20–26, 2026). Please send me details.`,
  },
  {
    id: "nairobi",
    title: "Nairobi & Mauritius",
    dates: "May 9 – 16, 2026",
    duration: "7 Days",
    price: "from $2,950",
    tag: "Nature & Beach",
    flag: "🇰🇪🇲🇺",
    image: "/nairobi.jpg",
    destinations: ["Nairobi", "Mauritius"],
    includes: ["Return Flight","3 Nights Nairobi","4 Nights Mauritius","Nairobi City Tour","Giraffe Center","Nairobi National Park","Parasailing","Undersea Walk","Dolphin Tour","Snorkeling","Airport Transfers"],
    msg: `Hi ${BUSINESS_NAME}, I'm interested in the Nairobi & Mauritius package (May 9–16, 2026). Please send me details.`,
  },
  {
    id: "kilimanjaro",
    title: "Mt. Kilimanjaro Climb",
    dates: "August 9 – 19, 2026",
    duration: "10 Days",
    price: "$4,750",
    tag: "Challenge",
    flag: "🇹🇿",
    image: "/kilimanjaro.jpg",
    destinations: ["Tanzania"],
    includes: ["Return Flight","Accommodation","Climbing Fees","Professional Guides","Tanzania Visa","Travel Insurance","Airport Transfers"],
    msg: `Hi ${BUSINESS_NAME}, I'm interested in the Kilimanjaro Climb (Aug 9–19, 2026). Please send me details.`,
  },
  {
    id: "cotonou",
    title: "Benin Republic Getaway",
    dates: "May 1 – 3, 2026",
    duration: "3 Days",
    price: "₦330,000",
    tag: "Weekend Escape",
    flag: "🇧🇯",
    image: "/cotonou.jpg",
    destinations: ["Cotonou"],
    includes: ["Road Transportation","Accommodation","Daily Breakfast","Kayaking","Boat Ride","Visit to Bab's Dock","Python Temple","Fondation Zinsou","Sailing","Games"],
    msg: `Hi ${BUSINESS_NAME}, I'm interested in the Benin Republic Getaway (May 1–3, 2026). Please send me details.`,
  },
];

export type Package = typeof packages;

export const visas = [
  { country: "United Kingdom", flag: "🇬🇧", fee: "₦525,000" },
  { country: "Canada", flag: "🇨🇦", fee: "₦400,000" },
  { country: "China", flag: "🇨🇳", fee: "₦600,000" },
  { country: "Tanzania", flag: "🇹🇿", fee: "₦280,000" },
  { country: "Morocco", flag: "🇲🇦", fee: "₦280,000" },
  { country: "Namibia", flag: "🇳🇦", fee: "₦280,000" },
  { country: "Egypt VOA", flag: "🇪🇬", fee: "$450" },
  { country: "Bali", flag: "🇮🇩", fee: "$600" },
  { country: "Philippines", flag: "🇵🇭", fee: "₦200,000" },
  { country: "South Africa", flag: "🇿🇦", fee: "₦230,000" },
  { country: "Malaysia", flag: "🇲🇾", fee: "₦230,000" },
  { country: "Morocco eVisa", flag: "🇲🇦", fee: "₦230,000" },
  { country: "France", flag: "🇫🇷", fee: "₦250,000" },
  { country: "Spain", flag: "🇪🇸", fee: "₦250,000" },
  { country: "Italy", flag: "🇮🇹", fee: "₦250,000" },
  { country: "Thailand", flag: "🇹🇭", fee: "₦250,000" },
  { country: "Jamaica", flag: "🇯🇲", fee: "₦250,000" },
  { country: "Zambia", flag: "🇿🇲", fee: "₦150,000" },
  { country: "Uganda", flag: "🇺🇬", fee: "₦150,000" },
  { country: "Seychelles ETA", flag: "🇸🇨", fee: "₦100,000" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Services", href: "/services" },
  { label: "Visa", href: "/visa" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
