"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Users, Calendar, MessageSquare, ArrowRight, Plane, ShieldCheck } from "lucide-react";
import { waMsg } from "@/lib/elrom-data";
import type { Package } from "@/lib/elrom-data";

export default function BookingModal({ pkg, onClose }: { pkg: Package | null; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", travelers: "1", date: "", notes: "" });
  
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  
  const isValid = form.name.trim().length > 2 && form.phone.trim().length > 7 && form.date;

  const handleSubmit = () => {
    if (!isValid || !pkg) return;
    window.open(waMsg(pkg.title, form.name, form.phone, form.travelers, form.date, form.notes), "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {pkg && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z- bg-[#1B3A6B]/40 backdrop-blur-md"
          />

          {/* Side Sheet / Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z- w-full md:w-[500px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden md:rounded-l-[3rem]"
          >
            {/* Visual Header */}
            <div className="relative h-48 shrink-0 overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B] via-[#1B3A6B]/40 to-transparent" />
              
              <button onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all border border-white/20">
                <X size={18} className="text-white" />
              </button>

              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white bg-red-600 shadow-lg shadow-red-900/20">
                    {pkg.tag}
                  </span>
                  <span className="text-xl">{pkg.flag}</span>
                </div>
                <h3 className="text-white font-display font-black text-2xl leading-tight">{pkg.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Plane size={12} /> {pkg.duration}</div>
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div>{pkg.dates}</div>
                </div>
              </div>
            </div>

            {/* Price Banner */}
            <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-b border-slate-100">
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Package Rate</p>
                 <p className="text-2xl font-display font-black text-[#1B3A6B]">{pkg.price}</p>
               </div>
               <div className="text-right">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                    <ShieldCheck size={14} /> Secure Booking
                  </div>
               </div>
            </div>

            {/* Form Scroll Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 no-scrollbar">
              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">Personal Information</h4>
                <div className="space-y-6">
                  {[
                    { key: "name", icon: User, label: "Your Full Name", placeholder: "e.g. Abdullateef Akinwumi", type: "text" },
                    { key: "phone", icon: Phone, label: "WhatsApp Number", placeholder: "e.g. +234 703...", type: "tel" },
                  ].map(({ key, icon: Icon, label, placeholder, type }) => (
                    <div key={key} className="group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A6B] mb-2.5 flex items-center gap-2">
                        <Icon size={12} className="text-red-600" /> {label}
                      </label>
                      <input 
                        type={type} 
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => set(key, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 focus:border-red-200 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition-all text-slate-800 placeholder:text-slate-300 font-medium"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">Trip Logistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A6B] mb-2.5 flex items-center gap-2">
                      <Users size={12} className="text-red-600" /> Travelers
                    </label>
                    <select 
                      value={form.travelers} 
                      onChange={(e) => set("travelers", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-700 font-medium appearance-none cursor-pointer">
                      {["1","2","3","4","5","6","7","8","9","10+"].map((n) => (
                        <option key={n} value={n}>{n} {n === "1" ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A6B] mb-2.5 flex items-center gap-2">
                      <Calendar size={12} className="text-red-600" /> Start Date
                    </label>
                    <input 
                      type="date" 
                      value={form.date} 
                      onChange={(e) => set("date", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-700 font-medium cursor-pointer" 
                    />
                  </div>
                </div>
              </section>

              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A6B] mb-2.5 flex items-center gap-2">
                  <MessageSquare size={12} className="text-red-600" /> Additional Notes
                </label>
                <textarea 
                  placeholder="Special requests, dietary needs, or preferred flight times..."
                  value={form.notes} 
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3} 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-800 placeholder:text-slate-300 resize-none font-medium" 
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-8 pb-10 pt-6 border-t border-slate-50 bg-white">
              <button 
                onClick={handleSubmit} 
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-3 text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-[1.5rem] transition-all duration-500 disabled:opacity-20 disabled:grayscale hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-900/20"
                style={{ background: "#C8102E" }}>
                Confirm via WhatsApp <ArrowRight size={16} />
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                <ShieldCheck size={12} /> Data is only used for your booking
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
