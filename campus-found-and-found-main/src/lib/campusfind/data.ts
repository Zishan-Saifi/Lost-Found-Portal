export type ItemType = "lost" | "found" | "claimed";
export type ItemStatus = ItemType;

export interface CampusItem {
  id: string;
  type: ItemType;
  title: string;
  category: CategoryId;
  location: string;
  date: string; // ISO date
  time: string; // HH:MM
  contact: string;
  description: string;
  reporter: string;
  emoji: string;
  imageUrl?: string;
  userAdded?: boolean;
}

export type CategoryId =
  | "electronics"
  | "id-cards"
  | "keys-wallets"
  | "bags-bottles"
  | "books-stationery"
  | "clothing-accessories";

export const CATEGORIES: { id: CategoryId; label: string; short: string }[] = [
  { id: "electronics", label: "Electronics", short: "AirPods, Laptops, Chargers" },
  { id: "id-cards", label: "ID & Cards", short: "Student IDs, Wallets" },
  { id: "keys-wallets", label: "Keys & Wallets", short: "Keys, Purses" },
  { id: "bags-bottles", label: "Bags & Bottles", short: "Backpacks, Tumblers" },
  { id: "books-stationery", label: "Books & Stationery", short: "Textbooks, Calculators" },
  { id: "clothing-accessories", label: "Clothing & Accessories", short: "Hoodies, Glasses" },
];

export const LOCATIONS = [
  "Central Library",
  "Central Canteen",
  "Science Block",
  "Sports Complex",
  "Hostels",
  "Auditorium",
  "Admin Block",
] as const;

export const CATEGORY_STYLE: Record<
  CategoryId,
  { glyph: string; tint: string; ring: string }
> = {
  electronics: { glyph: "🔌", tint: "from-sky-500/15 to-indigo-500/10", ring: "ring-sky-500/25" },
  "id-cards": { glyph: "🪪", tint: "from-violet-500/15 to-fuchsia-500/10", ring: "ring-violet-500/25" },
  "keys-wallets": { glyph: "🔑", tint: "from-amber-500/15 to-orange-500/10", ring: "ring-amber-500/25" },
  "bags-bottles": { glyph: "🎒", tint: "from-teal-500/15 to-emerald-500/10", ring: "ring-teal-500/25" },
  "books-stationery": { glyph: "📚", tint: "from-rose-500/15 to-pink-500/10", ring: "ring-rose-500/25" },
  "clothing-accessories": { glyph: "🧣", tint: "from-cyan-500/15 to-blue-500/10", ring: "ring-cyan-500/25" },
};

export const MOCK_ITEMS: CampusItem[] = [
  {
    id: "cf-001",
    type: "lost",
    title: "AirPods Pro (2nd Gen)",
    category: "electronics",
    location: "Central Library",
    date: "2026-10-24",
    time: "14:20",
    contact: "zara.k@campus.edu · +91 98201 44521",
    description:
      "Left my white AirPods Pro case, possibly on the 3rd-floor study desks near the east windows. Case has a small silver scratch and a lemon sticker on the lid. Contains my name initials 'ZK' engraved.",
    reporter: "Zara K.",
    emoji: "🎧",
  },
  {
    id: "cf-002",
    type: "found",
    title: "Blue Stanley Tumbler 30oz",
    category: "bags-bottles",
    location: "Central Canteen",
    date: "2026-10-24",
    time: "13:05",
    contact: "Hand in at Canteen counter · Ask for Meera",
    description:
      "Found a dusty-blue Stanley tumbler on table 12 near the juice counter after lunch rush. Has a 'CS Department Fest 2025' sticker on it and a couple of dents on the base. Awaiting owner at the canteen counter.",
    reporter: "Canteen Staff (Meera)",
    emoji: "🥤",
  },
  {
    id: "cf-003",
    type: "found",
    title: "Student ID Card — Rahul Sharma",
    category: "id-cards",
    location: "Admin Block",
    date: "2026-10-23",
    time: "11:45",
    contact: "Security desk, Admin Block ground floor · Ext. 2104",
    description:
      "A student ID card (Batch 2024, Computer Science) was found on a bench outside the Registrar's office. Handed to the security desk — please collect with any alternative proof of identity between 9 AM and 5 PM.",
    reporter: "Admin Security Desk",
    emoji: "🪪",
  },
  {
    id: "cf-004",
    type: "lost",
    title: "Yamaha Keychain with Hostel Keys",
    category: "keys-wallets",
    location: "Sports Complex",
    date: "2026-10-23",
    time: "18:30",
    contact: "arjun.m@campus.edu · +91 99673 21854",
    description:
      "Lost my keychain after basketball practice — Yamaha logo keyring holding two brass keys (Hostel B, Room 214) and a small torch. Likely dropped in the changing room or near the outdoor courts.",
    reporter: "Arjun M.",
    emoji: "🔑",
  },
  {
    id: "cf-005",
    type: "found",
    title: "Grey North Face Backpack",
    category: "bags-bottles",
    location: "Auditorium",
    date: "2026-10-22",
    time: "20:10",
    contact: "Auditorium control room · Ext. 3120",
    description:
      "A grey North Face Recon backpack was left under seat D-18 after the debate finals. Contains notebooks and a water bottle. Registered at the control room — owner should describe contents to claim.",
    reporter: "Auditorium Control Room",
    emoji: "🎒",
  },
  {
    id: "cf-006",
    type: "lost",
    title: "TI-84 Plus CE Graphing Calculator",
    category: "books-stationery",
    location: "Science Block",
    date: "2026-10-22",
    time: "15:55",
    contact: "priya.s@campus.edu · +91 90042 77831",
    description:
      "Missing after the Stats lecture in Hall S-3. Black TI-84 Plus CE with a purple slide cover and my name 'P. SHAH' written on the back in marker. May have been picked up with someone else's notes.",
    reporter: "Priya S.",
    emoji: "🧮",
  },
  {
    id: "cf-007",
    type: "found",
    title: "Black Leather Wallet",
    category: "keys-wallets",
    location: "Hostels",
    date: "2026-10-21",
    time: "09:40",
    contact: "Hostel C warden office · Ext. 1180",
    description:
      "Found a black two-fold leather wallet on the common-room sofa in Hostel C. Contains cards and some cash but no ID visible. Kept at the warden's office — owner must list the cards inside to claim it.",
    reporter: "Hostel C Warden",
    emoji: "👛",
  },
  {
    id: "cf-008",
    type: "found",
    title: "iPhone 15 (Black, 128GB)",
    category: "electronics",
    location: "Central Canteen",
    date: "2026-10-20",
    time: "12:15",
    contact: "Security desk, Main Gate · Ext. 1001",
    description:
      "An iPhone 15 in a clear case was found on a bench near the washbasins in the canteen. It is locked; SIM card intact. Handed to Main Gate security — bring proof (lock-screen wallpaper description) to collect.",
    reporter: "Main Gate Security",
    emoji: "📱",
  },
  {
    id: "cf-009",
    type: "lost",
    title: "Maroon Campus Hoodie (L)",
    category: "clothing-accessories",
    location: "Central Library",
    date: "2026-10-19",
    time: "17:25",
    contact: "devika.r@campus.edu · +91 87990 55217",
    description:
      "Left my maroon department hoodie on the coat stand near the periodicals section. Has 'CSE FEST VOLUNTEER' printed on the back and a tiny burn mark on the left cuff. Really sentimental — please check lost & found.",
    reporter: "Devika R.",
    emoji: "🧥",
  },
  {
    id: "cf-010",
    type: "found",
    title: "Silver Fast Charger + Braided Cable",
    category: "electronics",
    location: "Science Block",
    date: "2026-10-19",
    time: "10:50",
    contact: "Lab S-2 technician · Ext. 2245",
    description:
      "A 65W silver wall charger with a black braided USB-C cable was left plugged in at bench 6 of Lab S-2. Kept in the lab drawer — describe the cable tie or marks on the plug head to claim.",
    reporter: "Lab S-2 Technician",
    emoji: "🔋",
  },
  {
    id: "cf-011",
    type: "found",
    title: "Physics Textbook — HC Verma",
    category: "books-stationery",
    location: "Science Block",
    date: "2026-10-18",
    time: "16:35",
    contact: "Hand in at Science Block reception · Ext. 2200",
    description:
      "Volume 2 of HC Verma's Concepts of Physics found on a lab bench, with handwritten notes in the margins and a metro card used as a bookmark. Awaiting owner at reception.",
    reporter: "Science Block Reception",
    emoji: "📖",
  },
  {
    id: "cf-012",
    type: "claimed",
    title: "Silver Pendant Bracelet",
    category: "clothing-accessories",
    location: "Auditorium",
    date: "2026-10-16",
    time: "19:00",
    contact: "Resolved via Cultural Committee · Ext. 3050",
    description:
      "A thin silver bracelet with a small sun pendant was lost backstage during the fest rehearsals. It was found by a volunteer and has since been claimed by its owner after verifying the engraving. Listed for reference.",
    reporter: "Cultural Committee",
    emoji: "📿",
  },
];

export const REPORT_EMOJIS = ["📱", "🎧", "🎒", "🔑", "🪪", "🥤", "📚", "🧮", "🧥", "👛", "⌚", "👓", "🔋", "📿", "💧", "🖊️"];

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function relativeDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
  return formatDate(iso);
}
