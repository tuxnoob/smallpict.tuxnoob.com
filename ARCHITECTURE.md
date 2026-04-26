# SmallPict Web Architecture & Refactoring Plan

## 1. Web Architecture

SmallPict is a Next.js 16 App Router application deployed to Vercel. It serves two distinct experiences from a single codebase:

1. **Public Marketing Site + Browser Tool**: A premium dark-themed SaaS landing page with an embedded privacy-first image conversion tool.
2. **Internal Dashboard**: An OAuth-protected analytics and operations dashboard for owner and approved staff only.

### High-Level Architecture

```
User → Vercel Edge → Next.js App Router
  ├─ [locale]/(marketing) → Public pages (SSG)
  ├─ [locale]/(legal)     → Legal pages (SSG)
  ├─ [locale]/(docs)      → MDX docs (SSG)
  └─ [locale]/admin       → Dashboard (SSR, auth-gated)

Browser Tool → Web Worker → OffscreenCanvas → Blob download
  └─ Telemetry (hashed IP, browser, region, bytes saved)

Dashboard → NextAuth JWT → Lambda API
  └─ Allowlist verification on every sign-in
```

### Key Principles
- **Local-first image processing**: No server upload for conversions. Canvas API runs in a Web Worker.
- **Privacy-aware telemetry**: Only metadata (hashed IP, browser, region, timestamps, bytes saved) is sent. Raw images never leave the browser by default.
- **Backend remains Lambda**: The frontend consumes stable API contracts from `smallPict-lambda`. No business logic is duplicated.
- **Multilingual by design**: 18 locales via `next-intl` v4 with static generation and fallback strategies.
- **No public signup**: Plugin users operate entirely within WordPress. The website is marketing + tool only.

---

## 2. Route Structure

```
src/app/
├── page.tsx                          # Root: detect locale → redirect
├── layout.tsx                        # Root layout (minimal)
├── robots.ts                         # Dynamic robots rules
├── sitemap.ts                        # Dynamic sitemap with hreflang
├── globals.css                       # Tailwind v4 + theme tokens
│
├── api/auth/[...nextauth]/route.ts   # NextAuth OAuth handlers
│
├── [locale]/
│   ├── layout.tsx                    # Locale layout (fonts, i18n, metadata)
│   │
│   ├── (marketing)/                  # Public SaaS site
│   │   ├── layout.tsx                # Marketing shell (Navbar + Footer)
│   │   ├── page.tsx                  # Landing page
│   │   ├── pricing/page.tsx          # Pricing with Freemius checkout
│   │   ├── tool/page.tsx             # Browser image converter
│   │   └── convert/page.tsx          # Redirects → /tool
│   │
│   ├── (legal)/                      # Legal pages
│   │   ├── layout.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── (docs)/                       # Documentation
│   │   ├── layout.tsx                # Docs shell (Navbar + sidebar)
│   │   └── docs/[...slug]/page.tsx   # MDX with locale fallback
│   │
│   └── (internal)/                   # Dashboard
│       └── admin/
│           ├── layout.tsx            # SessionProvider wrapper
│           ├── login/page.tsx        # OAuth sign-in (Google + GitHub)
│           └── dashboard/
│               ├── layout.tsx        # DashboardShell (sidebar + auth)
│               ├── page.tsx          # Overview (KPIs + charts)
│               ├── customers/page.tsx
│               ├── sites/page.tsx
│               ├── keys/page.tsx
│               ├── usage/page.tsx
│               ├── quotas/page.tsx
│               ├── audit/page.tsx
│               └── settings/page.tsx # Admin-only
```

### Route Grouping Rationale
- **`(marketing)`**: Shared premium dark layout with mesh gradient, navbar, footer. Statically generated.
- **`(legal)`**: Same visual shell but narrower reading column for policy text.
- **`(docs)`**: Lighter theme for readability with sticky sidebar navigation.
- **`(internal)`**: Completely separate from public routes. Force-dynamic, noindex, JWT-protected.

---

## 3. i18n and SEO

### Supported Locales
`en, id, zh, ja, ru, es, fr, de, pt, ar, hi, ko, it, nl, pl, tr, vi, th`

### Locale Strategy
- **Default**: `en`
- **Prefixing**: `as-needed` (default locale omits `/en/` prefix)
- **Root redirect**: `/` detects `Accept-Language` and redirects to best-match locale
- **RTL support**: `ar` gets `dir="rtl"` automatically
- **Fallback**: Missing translations fall back to `en.json` keys

### SEO Architecture
Every public page exports `generateMetadata` using the centralized `buildMetadata()` utility:

```ts
// src/lib/seo.ts
export function buildMetadata({
  locale,
  title,
  description,
  pathname,
  ogImage,
  noIndex,
}): Metadata
```

This generates:
- Localized `<title>` and `<meta name="description">`
- `canonical` link per locale path
- `alternate` hreflang tags for all 18 locales + `x-default`
- OpenGraph and Twitter card metadata
- Dynamic `robots.ts` disallowing `/admin/` and `/api/`
- Dynamic `sitemap.ts` with all locale variants

### SEO Patterns by Page Type
| Page | Title Pattern | OG Image |
|------|--------------|----------|
| Home | `Smart Image Compression — SmallPict` | `/og/default.png` |
| Pricing | `Transparent & Reasonable Pricing — SmallPict` | `/og/pricing.png` |
| Tool | `Free WebP Image Converter — SmallPict` | `/og/tool.png` |
| Docs | `{DocTitle} — SmallPict` | — |
| Admin | `noindex` | — |

### Docs Localization
- Docs content lives in `docs/content/{locale}/{slug}.mdx`
- Slug resolution tries locale-specific file first, then falls back to `en/`
- Frontmatter `title` and `description` feed into page metadata

---

## 4. Public Website UX

### Visual Direction (Relink-inspired, original implementation)
- **Dark premium theme**: `#030712` background with indigo/purple accent system
- **Mesh gradients**: Subtle radial gradients create depth without clutter
- **Glass morphism**: `glass-card` utility with `backdrop-filter: blur(12px)` and gradient borders
- **Typography scale**: `text-7xl` hero → `text-5xl` sections → `text-2xl` cards
- **Motion**: Framer Motion for scroll-triggered fade-ins and hover lifts
- **Spacing**: Generous vertical padding (`py-28` sections, `pt-24 pb-32` hero)

### Landing Page Structure
1. **Hero**: Gradient headline + subheadline + dual CTAs + animated compression demo card
2. **Trust Bar**: 4 micro-badges (Browser Local, Privacy First, Web Worker, Zero Tracking)
3. **Features**: 4-card grid with gradient icon backgrounds and hover lift
4. **Tool CTA**: Dedicated section driving traffic to `/tool` with preview stats
5. **Pricing**: Monthly/annual toggle + 3-tier cards + enterprise CTA
6. **How It Works**: 3-step visual timeline
7. **Testimonials**: Social proof grid
8. **Footer**: Links + brand message + copyright

---

## 5. Browser Image Tool Flow

### UX Flow
```
Empty Dropzone → DragOver (border highlight) → Drop → Processing[] → Results[] → Download
```

### Architecture
- **Web Worker** (`src/workers/image.worker.ts`) handles all CPU-intensive work off the main thread
- **OffscreenCanvas** decodes images via `createImageBitmap` and converts to WebP blob
- **Default settings**: WebP format, 80% quality (lossy), optional max-width resize
- **Batch processing**: Multiple images process concurrently via separate worker messages
- **Privacy lock badge**: Visible in dropzone reinforcing "no upload" messaging

### Result Cards
Each processed image renders a glass-card with:
- Preview thumbnail
- Before/after size comparison with strikethrough
- Savings percentage bar
- Dimension metadata
- Hover overlay with download and remove actions

### Controls
- Collapsible settings panel (quality slider, max-width input)
- Bulk download all successful conversions
- Clear all button with URL cleanup

### Telemetry (Privacy-Aware)
```ts
{
  originalBytes: number,
  newBytes: number,
  format: "webp",
  timestamp: ISOString,
  clientHash: djb2(ua + language + screen), // Not PII
  browser: "chrome" | "firefox" | "safari" | "edge",
  region: "en" | "id" | ...,
  source: "smallpict_web_converter"
}
```

---

## 6. Internal Auth and Role-Aware UX

### Authentication Flow
```
User → /admin/login → Click Google/GitHub
  → OAuth provider → /api/auth/callback
  → NextAuth signIn callback
    → POST /admin/auth/verify { email }
    → Lambda checks ALLOWLIST# in DynamoDB
    → If found: JWT enriched with `role` (admin/editor)
    → If denied: redirect /admin/login?error=AccessDenied
```

### Providers
- **Google OAuth** (configured)
- **GitHub OAuth** (configured)
- **Microsoft**: Explicitly excluded per requirements

### Allowlist-Driven Access
- Owner email is seeded in Lambda DynamoDB first
- Only approved emails may access the dashboard
- OAuth is purely the authentication mechanism; the allowlist is the authorization source of truth
- Admin users can invite staff via Dashboard → Settings
- Invited staff see "pending_login" until they first authenticate

### Role-Based Navigation
| Page | Admin | Editor |
|------|-------|--------|
| Overview | ✓ | ✓ |
| Customers | ✓ | ✓ view-only |
| Sites | ✓ | ✓ view-only |
| API Keys | ✓ | ✓ view-only |
| Usage | ✓ | ✓ |
| Quotas | ✓ | ✓ |
| Audit Logs | ✓ | ✓ view-only |
| Settings / Staff | ✓ | ✗ blocked |

### UI Enforcement
- `RoleGuard` component renders access-denied state for non-admins
- `DashboardSidebar` filters nav items based on role
- All admin-only API calls are additionally protected server-side in Lambda

---

## 7. Dashboard Structure

### Visual Direction (Foudora-inspired, original implementation)
- **Dark zinc palette**: `zinc-950` background with `zinc-900` cards
- **Clean borders**: `border-zinc-800` with hover state `border-zinc-700`
- **KPI cards**: Label → big number → delta badge with trend icon
- **Compact sidebar**: Icon + label, sticky, with user role badge at bottom
- **Data tables**: Zebra striping, status badges, progress bars for quotas
- **Charts**: Simple CSS bar charts for request volume (real chart library can be added later)

### Pages

#### Overview
- 4 KPI cards (Total Users, Active Keys, Data Optimized, Avg Compression)
- 7-day request bar chart
- System health status list (Lambda, DynamoDB, Image Processor, Billing)
- Recent activity feed

#### Customers
- Searchable table: email, site URL, plan, API status, actions
- Revoke key action for active customers

#### Sites
- Table: domain, plugin version, status, last ping, monthly requests
- Filter by status

#### API Keys
- Table: masked key, email, site, status, created date
- Revoke action

#### Usage
- 4 metric cards + daily request chart
- Top users by volume table with quota progress bars

#### Quotas
- Plan distribution cards with usage bars
- "At Risk" users table (>90% quota usage)

#### Audit Logs
- Immutable action log: timestamp, actor, action badge, target
- Color-coded badges per action type

#### Settings (Admin-only)
- Notification preferences
- Security settings display
- Danger zone: data export

---

## 8. Folder Structure

```
smallpict.tuxnoob.com/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (marketing)/      # Public site pages
│   │   │   ├── (legal)/          # Privacy + terms
│   │   │   ├── (docs)/           # MDX documentation
│   │   │   └── (internal)/       # Admin dashboard
│   │   ├── api/auth/[...nextauth]/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── marketing/            # Public site sections
│   │   │   ├── Navbar.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   └── ToolCta.tsx
│   │   ├── tool/                 # Browser converter
│   │   │   └── ImageConverter.tsx
│   │   ├── dashboard/            # Internal UI
│   │   │   ├── DashboardShell.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── KpiCard.tsx
│   │   │   └── RoleGuard.tsx
│   │   ├── auth/                 # Auth providers
│   │   │   └── AdminProviders.tsx
│   │   └── ui/                   # Shared primitives
│   │       └── Logo.tsx
│   │
│   ├── lib/
│   │   ├── api-client.ts         # Typed fetch wrapper
│   │   ├── admin-api.ts          # Dashboard API methods
│   │   ├── api.ts                # Public API methods
│   │   ├── telemetry.ts          # Privacy-aware telemetry
│   │   ├── seo.ts                # Metadata builder
│   │   ├── auth.ts               # Role helpers + nav config
│   │   └── utils.ts              # cn() and utilities
│   │
│   ├── hooks/
│   │   ├── useImageWorker.ts     # Web Worker hook
│   │   └── useTelemetry.ts       # Telemetry hook
│   │
│   ├── types/
│   │   ├── api.ts                # API + domain types
│   │   ├── dashboard.ts          # Dashboard page data types
│   │   └── auth.ts               # Auth types
│   │
│   ├── workers/
│   │   └── image.worker.ts       # OffscreenCanvas converter
│   │
│   └── i18n/
│       ├── config.ts
│       └── request.ts
│
├── docs/content/                 # MDX documentation
├── messages/                     # next-intl translation files
├── public/                       # Static assets + OG images
├── ARCHITECTURE.md               # This document
└── next.config.ts
```

---

## 9. Migration Plan

### Phase 1: Foundation (Days 1-3)
1. ✅ Create `src/types/`, `src/hooks/` directories
2. ✅ Implement typed `api-client.ts` with error handling
3. ✅ Implement `seo.ts` metadata builder
4. ✅ Implement `telemetry.ts` with privacy hashing
5. ✅ Update `middleware.ts` with refined auth checks
6. ✅ Create `robots.ts` and `sitemap.ts`
7. ✅ Add `next.config.ts` redirects (`/convert` → `/tool`)

### Phase 2: Public Site Upgrade (Days 3-5)
1. ✅ Create `TrustBar` and `ToolCta` sections
2. ✅ Upgrade `ImageConverter` to dark premium theme
3. ✅ Create `/tool` route in `(marketing)` group
4. ✅ Update `Navbar` with tool link
5. ✅ Update landing page to include new sections
6. ✅ Add metadata to all public pages
7. ✅ Update Footer with tool link

### Phase 3: Dashboard Upgrade (Days 5-7)
1. ✅ Move auth to `components/auth/`
2. ✅ Build `DashboardShell` and `DashboardSidebar`
3. ✅ Implement `KpiCard` and `RoleGuard`
4. ✅ Create new routes: `/sites`, `/quotas`, `/settings`
5. ✅ Update existing dashboard pages to use new components
6. ✅ Wire `admin-api.ts` to typed `api-client.ts`
7. ✅ Add mobile responsive sidebar drawer

### Phase 4: Auth & Security (Days 7-8)
1. ✅ Refine NextAuth callbacks with proper typing
2. ✅ Implement allowlist verification flow
3. ✅ Add role-based route guards
4. Test OAuth flows end-to-end with Lambda staging
5. Verify `AccessDenied` redirect works for non-whitelisted emails

### Phase 5: Docs & i18n (Days 8-9)
1. Update docs layout with locale-aware sidebar
2. Add `buildMetadata` to docs `[...slug]` page
3. Add `Tool` translations to all 18 locale files
4. Verify RTL layout for `ar`
5. Test static generation for all locale variants

### Phase 6: Polish & Deploy (Days 9-10)
1. Add loading skeletons to dashboard tables
2. Implement error boundaries for tool and dashboard
3. Generate OG images for key pages
4. Run full TypeScript check (`tsc --noEmit`)
5. Vercel deploy with env vars:
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
   - `NEXT_PUBLIC_LAMBDA_API_URL`
6. Monitor Lambda integration and telemetry reception

---

## 10. Code Scaffolding

### App Router Structure
See `/src/app/[locale]/(marketing)/page.tsx`, `/src/app/[locale]/layout.tsx`, and `/src/app/[locale]/admin/dashboard/layout.tsx` for the core layout patterns.

### Locale-Aware Layout
`src/app/[locale]/layout.tsx` handles:
- Font loading (Geist + Geist Mono)
- `next-intl` message hydration
- RTL detection for Arabic
- Google Analytics script injection
- Metadata generation via `buildRootMetadata()`

### Middleware
`src/middleware.ts` combines:
- `next-intl` locale routing (`as-needed` prefix)
- JWT validation for `/admin/dashboard/*`
- Redirect to login with `callbackUrl` preservation

### Public Landing Sections
New sections added:
- `TrustBar`: 4-column trust signals below hero
- `ToolCta`: Dedicated section driving tool adoption with mini-stats

### Browser Image Conversion Module
- `src/workers/image.worker.ts`: Decodes via `createImageBitmap`, resizes, converts to WebP blob
- `src/hooks/useImageWorker.ts`: Manages Worker lifecycle and message routing
- `src/hooks/useTelemetry.ts`: Sends privacy-hashed events via `lib/telemetry.ts`
- `src/components/tool/ImageConverter.tsx`: Full UI with dropzone, settings, result grid

### Auth Layout
- `src/app/[locale]/admin/layout.tsx`: Exports `dynamic = "force-dynamic"`, wraps in `SessionProvider`
- `src/app/[locale]/admin/login/page.tsx`: OAuth buttons for Google + GitHub, AccessDenied error state
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth with custom `signIn`, `jwt`, and `session` callbacks

### Admin/Editor Guards
- `src/components/dashboard/RoleGuard.tsx`: Renders restricted access UI for non-admins
- `src/lib/auth.ts`: `canAccessStaffManagement()`, `isAdmin()`, and nav configuration
- `DashboardSidebar`: Filters nav items dynamically based on `userRole`

### Dashboard Shell
- `DashboardShell.tsx`: Full layout with sidebar, mobile drawer, header, and auth state handling
- `DashboardSidebar.tsx`: Compact icon+label navigation with active state and user profile section
- `KpiCard.tsx`: Reusable metric card with trend indicator

### API Client Layer
- `src/lib/api-client.ts`: Generic `apiFetch<T>()` with Bearer token injection, error parsing, and timeout support
- `src/lib/admin-api.ts`: All dashboard endpoints typed (`fetchCustomers`, `fetchSites`, `fetchUsageAnalytics`, etc.)
- `src/lib/api.ts`: Public API methods (`sendBrowserConversionTelemetry`)

### SEO/Metadata Handling
- `src/lib/seo.ts`: `buildMetadata()` generates canonical, hreflang, OpenGraph, and Twitter tags
- Every public page exports `generateMetadata` using this utility
- `sitemap.ts` generates entries for all 18 locales × all static paths

---

## 11. Final Implementation Recommendations

### Immediate Next Steps
1. **Add `NEXTAUTH_SECRET` and OAuth credentials** to `.env.local` and Vercel dashboard
2. **Seed owner email** in Lambda `ALLOWLIST#` table before first login
3. **Generate OG images** (`/og/default.png`, `/og/pricing.png`, `/og/tool.png`) at 1200×630
4. **Replace `G-XXXXXXX`** in `src/app/[locale]/layout.tsx` with real Google Analytics ID

### Recommended Additions (Post-MVP)
1. **Chart library**: Add `recharts` or `chart.js` for real usage charts in `/admin/dashboard/usage`
2. **Table library**: Add `@tanstack/react-table` for sortable/filterable dashboard tables
3. **Loading states**: Add React Suspense boundaries with skeleton loaders
4. **Error handling**: Add Sentry or LogRocket for client-side error tracking
5. **Rate limiting**: Add Vercel KV or Upstash for API rate limiting on telemetry endpoint
6. **OG image generation**: Use `@vercel/og` for dynamic OpenGraph images per locale

### Performance
- All public marketing pages are statically generated at build time
- The browser tool is fully client-side with Web Workers — zero server load for conversions
- Dashboard pages use `force-dynamic` but API calls can be cached with `next/cache` revalidation

### Security Checklist
- [x] OAuth-only auth (no passwords)
- [x] Allowlist-driven authorization
- [x] JWT session expiry (24h)
- [x] `/admin/*` noindex
- [x] API routes not exposed in sitemap
- [x] Image processing stays in browser by default
- [x] Telemetry hashes client identifiers

### Deployment Verification
After Vercel deploy, verify:
1. `https://smallpict.tuxnoob.com/` redirects to locale
2. `https://smallpict.tuxnoob.com/en/tool` loads converter
3. `https://smallpict.tuxnoob.com/admin/login` shows OAuth buttons
4. Non-whitelisted email gets `AccessDenied` error
5. Dashboard loads with correct role-based navigation
6. `/sitemap.xml` contains all locale variants
7. `/robots.txt` blocks `/admin/`
8. Metadata includes correct `canonical` and `hreflang` tags
