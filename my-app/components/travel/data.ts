import { Bus, Compass, FileCheck, Hotel, PlaneTakeoff } from "lucide-react";
export const WA_NUMBER = "2347035612652";
export const EMAIL = "hello@pureqtravels.com";
export const INSTAGRAM = "https://instagram.com/pureqtravels";
export const COMPANY_NAME = "PureQ";
export const NAV_LINKS = [
  { label: "Trips", href: "#packages" },
  { label: "How it works", href: "#journey" },
  { label: "Why PureQ", href: "#why-us" },
];
export type Package = { id:string; title:string; location:string; price:string; dates:string; duration:string; flag:string; image:string; included:{icon:typeof PlaneTakeoff;label:string}[] };
export const PACKAGES: Package[] = [
 {id:"egypt",title:"Egypt Escape",location:"Cairo + Sharm El Sheikh",price:"₦2,900,000",dates:"Apr 24 – 29",duration:"5 Nights",flag:"🇪🇬",image:"/egypt.jpg",included:[{icon:PlaneTakeoff,label:"Flights"},{icon:Hotel,label:"Hotels"},{icon:FileCheck,label:"Visa"},{icon:Bus,label:"Transfers"},{icon:Compass,label:"Tours"}]},
 {id:"mombasa",title:"Mombasa Getaway",location:"Kenya Beach Coast",price:"₦2,550,000",dates:"Apr 23 – 28",duration:"4 Nights",flag:"🇰🇪",image:"/mombasa.jpg",included:[{icon:PlaneTakeoff,label:"Flights"},{icon:Hotel,label:"Hotels"},{icon:Bus,label:"Transfers"},{icon:Compass,label:"Tours"}]},
 {id:"seychelles",title:"Seychelles Retreat",location:"Private Island Resort",price:"₦2,400,000",dates:"Nov 9 – 14",duration:"4 Nights",flag:"🇸🇨",image:"/seychelles.jpg",included:[{icon:PlaneTakeoff,label:"Flights"},{icon:Hotel,label:"Hotels"},{icon:FileCheck,label:"Entry pass"},{icon:Compass,label:"Tours"}]},
];
export const openWhatsApp=(msg:string)=>{if(typeof window!=="undefined")window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener,noreferrer")};
