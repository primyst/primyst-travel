"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Fake data — everything here lives in client state only. Nothing    */
/* is persisted; a page refresh resets it all. Wire up real auth,     */
/* a route guard, and actual API calls before this goes anywhere      */
/* near production.                                                    */
/* ------------------------------------------------------------------ */

type Enquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  type: "package" | "event" | "destination" | "general";
  status: "New" | "Contacted" | "Closed";
  date: string;
};

type ListItem = {
  id: string;
  title: string;
  meta: string;
  published: boolean;
};

const initialEnquiries: Enquiry[] = [
  { id: "e1", name: "Priya Nair", email: "priya@example.com", subject: "Dubai Escape", type: "package", status: "New", date: "2 hours ago" },
  { id: "e2", name: "Marcus Webb", email: "marcus@example.com", subject: "A trip to Tokyo", type: "destination", status: "New", date: "5 hours ago" },
  { id: "e3", name: "Fatima Al-Sayed", email: "fatima@example.com", subject: "Cape Town Wine & Culture Weekend", type: "event", status: "Contacted", date: "Yesterday" },
  { id: "e4", name: "Daniel Osei", email: "daniel@example.com", subject: "General enquiry", type: "general", status: "Closed", date: "3 days ago" },
];

const initialDestinations: ListItem[] = [
  { id: "d1", title: "Dubai", meta: "United Arab Emirates", published: true },
  { id: "d2", title: "London", meta: "United Kingdom", published: true },
  { id: "d3", title: "Tokyo", meta: "Japan", published: true },
  { id: "d4", title: "Zanzibar", meta: "Tanzania", published: false },
];

const initialPackages: ListItem[] = [
  { id: "p1", title: "Dubai Escape", meta: "5 nights · From £1,290", published: true },
  { id: "p2", title: "Tokyo In Depth", meta: "8 nights · From £1,980", published: true },
  { id: "p3", title: "Maldives Retreat", meta: "5 nights · From £2,750", published: false },
];

const initialEvents: ListItem[] = [
  { id: "ev1", title: "Dubai Shopping Festival", meta: "January", published: true },
  { id: "ev2", title: "Tokyo Cherry Blossom Season", meta: "Late March — Early April", published: true },
];

const tabs = ["Overview", "Enquiries", "Destinations", "Packages", "Events"] as const;
type Tab = (typeof tabs)[number];

/* ------------------------------------------------------------------ */
/* Toast system                                                        */
/* ------------------------------------------------------------------ */

type Toast = { id: number; message: string };

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function push(message: string) {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2600);
  }

  return { toasts, push };
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-3 rounded-full bg-[#181611] px-5 py-3 text-[13px] font-medium text-[#f4f1e9] shadow-xl"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7effc4] text-[11px] font-bold text-[#181611]">
              ✓
            </span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const { toasts, push } = useToasts();

  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [destinations, setDestinations] = useState(initialDestinations);
  const [packages, setPackages] = useState(initialPackages);
  const [events, setEvents] = useState(initialEvents);

  const [newItemTitle, setNewItemTitle] = useState("");

  function cycleStatus(id: string) {
    setEnquiries((list) =>
      list.map((e) => {
        if (e.id !== id) return e;
        const next: Enquiry["status"] =
          e.status === "New" ? "Contacted" : e.status === "Contacted" ? "Closed" : "New";
        return { ...e, status: next };
      })
    );
    push("Enquiry status updated");
  }

  function togglePublished(
    id: string,
    list: ListItem[],
    setList: (l: ListItem[]) => void
  ) {
    setList(list.map((i) => (i.id === id ? { ...i, published: !i.published } : i)));
    push("Visibility updated");
  }

  function removeItem(id: string, list: ListItem[], setList: (l: ListItem[]) => void, label: string) {
    setList(list.filter((i) => i.id !== id));
    push(`${label} deleted`);
  }

  function addItem(
    list: ListItem[],
    setList: (l: ListItem[]) => void,
    label: string,
    metaHint: string
  ) {
    if (!newItemTitle.trim()) {
      push("Enter a title first");
      return;
    }
    setList([
      { id: `new-${Date.now()}`, title: newItemTitle.trim(), meta: metaHint, published: false },
      ...list,
    ]);
    setNewItemTitle("");
    push(`${label} added as draft`);
  }

  const stats = [
    { label: "New enquiries", value: enquiries.filter((e) => e.status === "New").length },
    { label: "Destinations live", value: destinations.filter((d) => d.published).length },
    { label: "Packages live", value: packages.filter((p) => p.published).length },
    { label: "Events live", value: events.filter((e) => e.published).length },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f1e9] text-[#181611]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#181611]/10 bg-[#181611] px-5 py-7 text-[#f4f1e9] md:flex">
        <p className="px-2 text-[14px] font-semibold tracking-tight">TRAVELQ</p>
        <p className="mb-8 px-2 text-[11px] text-[#f4f1e9]/40">Admin (demo)</p>

        <nav className="flex flex-col gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition ${
                tab === t
                  ? "bg-[#f4f1e9] text-[#181611]"
                  : "text-[#f4f1e9]/60 hover:bg-[#f4f1e9]/10 hover:text-[#f4f1e9]"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-xl bg-[#f4f1e9]/5 p-4 text-[11px] leading-relaxed text-[#f4f1e9]/45">
          Dummy dashboard — no auth, no backend. Every action here is
          client-side only and resets on refresh.
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex gap-1 overflow-x-auto border-b border-[#181611]/10 bg-[#f4f1e9]/95 px-4 py-3 backdrop-blur-md md:hidden">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
              tab === t ? "bg-[#181611] text-[#f4f1e9]" : "text-[#181611]/55"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 py-8 pt-20 md:px-10 md:py-10 md:pt-10">
        <div className="mx-auto max-w-5xl">
          {tab === "Overview" && (
            <div>
              <h1 className="font-serif text-3xl font-medium tracking-tight">Overview</h1>
              <p className="mt-2 text-[14px] text-[#181611]/55">
                A snapshot of what's happening across the site. All fake.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white p-5">
                    <p className="text-[28px] font-semibold tracking-tight">{s.value}</p>
                    <p className="mt-1 text-[12px] text-[#181611]/50">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#181611]/45">
                  Recent enquiries
                </h2>
                <div className="mt-4 divide-y divide-[#181611]/10 rounded-2xl bg-white">
                  {enquiries.slice(0, 4).map((e) => (
                    <div key={e.id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-[14px] font-medium">{e.name}</p>
                        <p className="text-[12px] text-[#181611]/50">{e.subject}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                          e.status === "New"
                            ? "bg-[#c9603f]/10 text-[#c9603f]"
                            : e.status === "Contacted"
                            ? "bg-[#4a4a35]/10 text-[#4a4a35]"
                            : "bg-[#181611]/10 text-[#181611]/50"
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "Enquiries" && (
            <div>
              <h1 className="font-serif text-3xl font-medium tracking-tight">Enquiries</h1>
              <p className="mt-2 text-[14px] text-[#181611]/55">
                Click a status pill to cycle it — New → Contacted → Closed.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl bg-white">
                <div className="hidden grid-cols-[1.2fr_1.2fr_1fr_0.8fr_0.8fr] gap-4 border-b border-[#181611]/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#181611]/40 md:grid">
                  <span>Name</span>
                  <span>Subject</span>
                  <span>Type</span>
                  <span>Date</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-[#181611]/10">
                  {enquiries.map((e) => (
                    <div
                      key={e.id}
                      className="grid grid-cols-1 gap-2 px-5 py-4 md:grid-cols-[1.2fr_1.2fr_1fr_0.8fr_0.8fr] md:items-center md:gap-4"
                    >
                      <div>
                        <p className="text-[14px] font-medium">{e.name}</p>
                        <p className="text-[12px] text-[#181611]/45 md:hidden">{e.email}</p>
                      </div>
                      <span className="text-[13px] text-[#181611]/70">{e.subject}</span>
                      <span className="text-[12px] capitalize text-[#181611]/50">{e.type}</span>
                      <span className="text-[12px] text-[#181611]/45">{e.date}</span>
                      <button
                        onClick={() => cycleStatus(e.id)}
                        className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                          e.status === "New"
                            ? "bg-[#c9603f]/10 text-[#c9603f]"
                            : e.status === "Contacted"
                            ? "bg-[#4a4a35]/10 text-[#4a4a35]"
                            : "bg-[#181611]/10 text-[#181611]/50"
                        }`}
                      >
                        {e.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(tab === "Destinations" || tab === "Packages" || tab === "Events") && (
            <ManagedList
              title={tab}
              items={tab === "Destinations" ? destinations : tab === "Packages" ? packages : events}
              setItems={tab === "Destinations" ? setDestinations : tab === "Packages" ? setPackages : setEvents}
              newItemTitle={newItemTitle}
              setNewItemTitle={setNewItemTitle}
              onAdd={() =>
                addItem(
                  tab === "Destinations" ? destinations : tab === "Packages" ? packages : events,
                  tab === "Destinations" ? setDestinations : tab === "Packages" ? setPackages : setEvents,
                  tab.slice(0, -1),
                  "Draft — add details"
                )
              }
              onToggle={(id) =>
                togglePublished(
                  id,
                  tab === "Destinations" ? destinations : tab === "Packages" ? packages : events,
                  tab === "Destinations" ? setDestinations : tab === "Packages" ? setPackages : setEvents
                )
              }
              onRemove={(id) =>
                removeItem(
                  id,
                  tab === "Destinations" ? destinations : tab === "Packages" ? packages : events,
                  tab === "Destinations" ? setDestinations : tab === "Packages" ? setPackages : setEvents,
                  tab.slice(0, -1)
                )
              }
            />
          )}
        </div>
      </main>

      <ToastStack toasts={toasts} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared list UI for Destinations / Packages / Events                 */
/* ------------------------------------------------------------------ */

function ManagedList({
  title,
  items,
  setItems,
  newItemTitle,
  setNewItemTitle,
  onAdd,
  onToggle,
  onRemove,
}: {
  title: string;
  items: ListItem[];
  setItems: (l: ListItem[]) => void;
  newItemTitle: string;
  setNewItemTitle: (v: string) => void;
  onAdd: () => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">{title}</h1>
          <p className="mt-2 text-[14px] text-[#181611]/55">
            Toggle visibility, delete, or add a new draft entry.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder={`New ${title.toLowerCase().slice(0, -1)} title`}
            className="w-56 rounded-full border border-[#181611]/15 bg-white px-4 py-2.5 text-[13px] outline-none focus:border-[#c9603f]"
          />
          <button
            onClick={onAdd}
            className="rounded-full bg-[#181611] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#f4f1e9] transition hover:opacity-85"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-6 divide-y divide-[#181611]/10 overflow-hidden rounded-2xl bg-white">
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-[13px] text-[#181611]/40">
            Nothing here yet.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[14px] font-medium">{item.title}</p>
                <p className="text-[12px] text-[#181611]/50">{item.meta}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggle(item.id)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                    item.published
                      ? "bg-[#7effc4]/20 text-[#3f7a5c]"
                      : "bg-[#181611]/10 text-[#181611]/50"
                  }`}
                >
                  {item.published ? "Published" : "Draft"}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-[12px] font-medium text-[#c9603f] transition hover:opacity-70"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
