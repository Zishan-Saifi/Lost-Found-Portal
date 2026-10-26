# Campus Found And Found

Build CampusFind - a modern, responsive Campus Lost & Found web portal.

Requirements based on frontend evaluation criteria:
1. Navbar: CampusFind branding/logo, Search bar trigger, "Report an Item" CTA button, Bookmarks counter/link ("Saved Items"), and Dark / Light theme toggle.
2. Hero Section: Catchy banner ("Lost something on campus? We'll help you find it"), quick statistics cards (e.g. Total Reported, Reunited, Active Items), and quick action buttons ("I Lost Something" & "I Found Something").
3. Search & Comprehensive Filters:
   - Search by item name, description, or campus building/location.
   - Status tabs: All, Lost, Found, Claimed/Resolved.
   - Category chips: Electronics (AirPods, Laptops, Chargers), ID & Cards (Student IDs, Wallets), Keys & Wallets, Bags & Bottles, Books & Stationery, Clothing & Accessories.
   - Location dropdown: Library, Central Canteen, Science Block, Sports Complex, Hostels, Auditorium.
   - Sort by: Most Recent, Oldest.
4. Item Grid & Cards:
   - Visual card with item image thumbnail, high-visibility "Lost" (amber/red) or "Found" (emerald/green) badge, category tag, date, and specific campus location.
   - Bookmark button on each card with interactive save/unsave state stored in localStorage.
   - Click card opens the Item Detail Modal.
5. Item Detail Modal / View:
   - Large image, full description, status badge, date & time reported, exact location spotted, reporter contact or claim instructions (e.g., security desk contact or verification prompt), "Claim Item" interactive button with confirmation dialog, and "Share Item" link copy.
6. "Report an Item" Modal / Form:
   - Interactive modal to report a Lost or Found item.
   - Form fields: Type (Lost / Found), Item title, Category, Location, Date, Contact info, Description, and image URL/preset selection.
   - Submitting adds the item dynamically into the local state + persists in localStorage so newly added items remain after refresh!
7. Bookmarks / Saved Drawer or Tab:
   - Quick toggle or drawer to see only bookmarked/saved items using localStorage.
8. States & Polish:
   - Loading skeleton state simulation on initial load or category switch.
   - Empty state illustration with "No items found" and a "Clear filters" button when search/filter returns zero results.
   - Fully responsive design on mobile, tablet, and desktop with smooth animations and transitions.
   - Dark and Light mode support with persistent preference.
Include rich, realistic mock data for 8-10 campus items (AirPods Pro in Central Library, Blue Stanley Tumbler in Cafeteria, Student ID card in Admin block, etc.).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://campus-found-and-found.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/422d9ed2-9f9a-490e-9742-e3e26875f9b2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
