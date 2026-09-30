# JUFAJA Homes Platform

> **"Building with confidence. Living with pride."**  
> Premium Volume Residential Builder & Knockdown Rebuild Specialist for Greater Sydney, the Hills, South West, and the Illawarra.  
> NSW Builder Licence: `55277C` | HIA Member: `# 392133`

---

## 🌟 Overview & Highlights

JUFAJA Homes is a modern, full-stack digital web platform engineered to deliver a commercial volume-builder digital experience (inspired by Casaview Homes) combined with boutique custom architectural craftsmanship.

- **63 Master Home Designs Catalogue:** Single storey, double storey, duplexes, granny flats, and acreage series with real-time multi-criteria filtering (bedrooms, bathrooms, frontage width, storeys, 3D tour availability).
- **Interactive 3D Matterport Virtual Tours:** Integrated virtual walkthrough modal for display homes with 360° dollhouse exploration.
- **House & Land Marketplace:** 16 turnkey house & land packages across Sydney growth corridors (Austral, Cobbitty, Tahmoor, Leppington, Gilead, Wilton).
- **Knockdown Rebuild Engine:** Interactive block feasibility calculator, cost comparison matrix (KDRB vs. Renovation vs. Relocation), and 6-stage milestone timeline.
- **Custom Homes & Sloping Sites:** Bespoke architectural briefing system for split-level, narrow, and acreage blocks.
- **Inclusions Studio:** Standard Prestige vs. Luxe Signature comparison matrix across kitchen, wet areas, framing, air conditioning, and brand partners.
- **Display Homes Directory:** Complete opening hours, street addresses, and direct Google Maps navigation for Box Hill, Leppington, Cobbitty, and Prestons Head Office.
- **Lead Capture & Anti-Spam API:** Global floating enquiry drawer + contact forms backed by a validated POST API endpoint with honeypot spam traps and structured JSON persistence.
- **SEO & Search Indexing:** Automatic Schema.org JSON-LD structured data, dynamic `sitemap.xml` covering all 94 routes, and `robots.txt`.

---

## 🏗️ Architecture & Technology Stack

- **Framework:** Next.js 14+ (App Router with Static Site Generation / SSG)
- **Language:** TypeScript 5.7+ (Strict typing across designs, packages, and enquiries)
- **Styling:** Tailwind CSS 3.4 (Custom JUFAJA palette: Navy `#1e2b4f`, Deep Navy `#141d36`, Vivid Orange `#f58220`, Amber Glow)
- **Icons:** Lucide React
- **Performance:** 94 statically pre-rendered routes generated in under 15 seconds.

---

## 🚀 Quick Start

### 1. Installation

```bash
cd jufaja-homes-platform
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Verification

```bash
npm run build
npm start
```

### 4. Running Test Suites

```bash
npm test
```

Verifies:
- Data layer schema integrity (63 designs, 16 packages, 4 display villages)
- Filtering engine algorithms
- Lead capture validation and honeypot spam protection

---

## 📁 Project Structure

```
jufaja-homes-platform/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with fonts, header, footer, enquiry drawer
│   │   ├── page.tsx                  # Homepage with hero slider, selector dashboard, showcase
│   │   ├── designs/
│   │   │   ├── page.tsx              # Catalogue page (Suspense boundary)
│   │   │   ├── DesignsCatalogueClient.tsx  # Dynamic multi-parameter filter controller
│   │   │   └── [slug]/page.tsx       # Dynamic SSG page for each of the 63 designs
│   │   ├── packages/
│   │   │   ├── page.tsx              # House & Land marketplace
│   │   │   ├── PackagesMarketplaceClient.tsx # Suburb & price filter controller
│   │   │   └── [slug]/page.tsx       # Package detail page with turnkey inclusions
│   │   ├── knockdown-rebuild/page.tsx # KDRB value matrix, feasibility tool, 6-stage process
│   │   ├── custom-homes/page.tsx     # Custom architectural design for sloping/complex sites
│   │   ├── inclusions/page.tsx       # Standard vs Luxe comparison studio & brand partners
│   │   ├── display-homes/page.tsx    # Village locations, opening times, directions
│   │   ├── about-us/page.tsx         # Heritage, 4-Point Hold quality assurance, licensing
│   │   ├── contact/page.tsx          # Office contact details & enquiry form
│   │   ├── api/enquiry/route.ts      # Lead intake endpoint with honeypot trap
│   │   ├── sitemap.ts                # Dynamic 94-route XML sitemap generator
│   │   └── robots.ts                 # Search crawler instructions
│   ├── components/
│   │   ├── layout/                   # Header, Footer, QuickEnquiryDrawer, StructuredData
│   │   ├── home/                     # HeroSlider, SelectorDashboard, BrandDifference, etc.
│   │   ├── catalogue/                # FilterBar, DesignCard
│   │   ├── designs/                  # FloorplanViewer, DimensionTable, VirtualTourModal, FacadeGallery
│   │   ├── packages/                 # PackageCard, SuburbFilter, ReservePackageButton
│   │   └── knockdown-rebuild/        # FeasibilityCalculator, ProcessSteps
│   ├── data/
│   │   ├── designs.json              # 63 master designs
│   │   ├── packages.json             # 16 House & Land packages
│   │   ├── display-homes.json        # 4 display suites
│   │   ├── inclusions.json           # 5 categories of standard & luxe specs
│   │   └── leads.json                # Captured customer enquiries
│   ├── lib/
│   │   ├── filter-designs.ts         # Multi-criteria filtering logic
│   │   └── utils.ts                  # Currency, square, sqm, and class utilities
│   └── types/
│       └── index.ts                  # TypeScript models
├── tests/
│   ├── data-integrity.test.js        # Dataset validator
│   ├── filter-engine.test.js         # Search & filter tests
│   └── lead-api.test.js              # Lead submission & anti-spam tests
└── package.json
```

---

## 🛡️ License & Legal

- **Company:** JUFAJA Homes & JUFAJA Constructions  
- **Licence:** NSW Fair Trading Builder Licence No. `55277C`  
- **HIA:** Housing Industry Association Member No. `392133`  
- **Copyright:** &copy; 2026 JUFAJA Homes. All rights reserved.
