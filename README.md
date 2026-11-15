# PlumbNexo — Agency Website Build Spec

> **Single-page, conversion-focused website for PlumbNexo — websites built for plumbers.**
> This file is the complete source of truth. Build exactly what is described here. Where something is not specified, choose the simplest option that supports the one goal of this page: **getting a plumbing business owner to request a free demo page.**

---

## 0. TL;DR for the builder

| Item | Decision |
|---|---|
| Page type | One page, anchor-scrolling sections, no other routes except `/privacy` and `/thank-you` |
| Single conversion goal | Submit the **Free Demo Page request form** (`#demo`) |
| Primary CTA label (everywhere) | **Get my free demo page** |
| Stack | Next.js 14+ (App Router) · TypeScript · Tailwind CSS · Framer Motion (sparingly) · `next/font` Manrope |
| Hosting | Vercel |
| Portfolio | 2 video case studies, MP4 files already in `/public/videos/` |
| Performance budget | Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility / Best Practices / SEO |
| Tone | Plain English, specific, honest. No hype, no invented numbers |

---

## 1. Business context (read before writing a single component)

**PlumbNexo** designs and develops websites for independent U.S. plumbing businesses, starting with the Charlotte, NC area.

- **Who visits:** owner-operators of residential or commercial plumbing companies. They are busy and on their phones (often between jobs). They are skeptical of "marketing agencies." They decide fast.
- **Their real problems:** missed calls, homeowners who can't tell what services they offer or where they work, vague contact paths, forms that collect too little, poor mobile layouts, too much reliance on referrals or a single lead platform.
- **What they want:** a steady flow of suitable jobs, a website that makes them look as trustworthy as their work actually is, and a partner who is clear about scope, price, and ownership.
- **The offer:** PlumbNexo builds **one personalized demo page free**, so the owner can judge the work before paying anything. If they like it, the full website is a paid project with scope and price agreed in writing, followed by **6 months of support** after launch.
- **Buyer's main concern:** *"Will this be worth paying for, and can I trust you to deliver?"* Every section on the page must answer part of that question.

### Honesty rules (non-negotiable)
- Never invent testimonials, ratings, client logos, team members, lead numbers, or revenue figures.
- Never promise rankings, traffic, or a number of jobs. Use phrasing like "designed to help homeowners contact you."
- Portfolio projects are presented as **"Designed & developed by PlumbNexo"**. Do not attach performance results to them.
- No fake urgency (countdowns, "only 2 spots left").

---

## 2. Brand system

### 2.1 Colors (define as CSS variables + Tailwind theme)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#122B2A` | Headlines, dark sections, button text on mint, logo |
| `--paper` | `#F7F8F2` | Default page background |
| `--mint` | `#B8F36B` | Primary buttons, small highlights, focus rings. **Use sparingly** |
| `--muted` | `#52635F` | Body/supporting text on light backgrounds |
| `--white` | `#FFFFFF` | Cards, text on dark |
| `--ink-2` | `#0C1F1E` | Deeper ink for the footer and video frames (derived) |
| `--line` | `#122B2A14` | Hairline borders (ink at ~8% opacity) |
| `--mint-soft` | `#B8F36B33` | Highlight backgrounds behind words, chips |

Rules:
- About 80% light (`--paper` / white), about 15% ink, at most 5% mint.
- **Mint buttons always use ink text** (contrast ≈ 11:1). Never white text on mint.
- Mint text is allowed **only on ink backgrounds**.
- Color must never be the only signal (e.g. errors also get an icon and text).

### 2.2 Typography
- Font: **Manrope** via `next/font/google` (weights 400, 500, 600, 700, 800). Fallback: `Arial, sans-serif`.
- Scale (mobile → desktop, use `clamp()`):
  - H1: 36px → 64px, weight 800, line-height 1.05, letter-spacing -0.02em
  - H2: 28px → 44px, weight 800, line-height 1.1, letter-spacing -0.015em
  - H3: 20px → 22px, weight 700
  - Body: 17px → 18px, weight 400, line-height 1.6, color `--muted`
  - Eyebrow: 13px, weight 700, uppercase, letter-spacing 0.12em, color `--ink` with a small mint dot before it
  - Button: 16px, weight 700
- Max text width: 62ch for paragraphs, 18ch–22ch for H1.

### 2.3 Shape, spacing, motion
- Radius: buttons `999px` (pill), cards `20px`, media frames `16px`, inputs `12px`.
- Section padding: 72px mobile / 120px desktop, top and bottom. Container max-width 1200px, 20px side gutter on mobile.
- Shadows: one soft shadow only, `0 20px 50px -20px rgba(18,43,42,.25)`, on media frames and the form card.
- Decorative language: thin connecting lines (1px, `--line`) and a large outlined "N" motif at 4–6% opacity in the hero and final CTA backgrounds. Nothing else decorative.
- Motion: fade-up on enter (opacity 0→1, y 16px→0, 0.5s, ease-out, once). No parallax, no autoplaying carousels, no marquees. Respect `prefers-reduced-motion` (disable all motion).

### 2.4 Logo
- Files expected: `/public/brand/logo-full.svg` (N symbol + wordmark), `/public/brand/logo-mark.svg` (N symbol), `/public/brand/logo-white.svg`.
- **If the files are missing**, render a text logo: a 28px ink rounded square holding a mint "N", followed by the "PlumbNexo" wordmark in Manrope 800. Leave a `TODO` comment to swap it.
- Favicon: the mint N on ink, from `logo-mark`.

### 2.5 Buttons
| Variant | Style | Used for |
|---|---|---|
| Primary | Mint bg, ink text, pill, 52px height (56px on mobile), arrow icon → that nudges 3px right on hover | **Get my free demo page** only |
| Secondary | Transparent, 1.5px ink border, ink text | "Watch the work", "See how it works" |
| Text link | Ink text, underline offset 4px, mint underline on hover | Inline links, "Visit live site ↗" |
| On-dark primary | Mint bg, ink text | CTA on ink sections |

**One primary button per section, maximum.** Every primary button scrolls to `#demo` and focuses the first form field.

---

## 3. Page architecture (in order)

```
[Sticky Header]
1. #top        Hero: offer + primary CTA + proof visual
2. —           Trust strip: what every PlumbNexo site includes
3. #work       Portfolio: 2 video case studies   ← main proof
4. #problems   Problems we fix (problem → fix → why it matters)
5. #process    How the free demo works (3 steps)
6. #included   What the full website includes
7. #about      Founder introduction
8. #faq        FAQ (objection handling)
9. #demo       Final CTA + Demo request form     ← conversion point
[Footer]
[Mobile sticky CTA bar]
```

Why this order: it follows the buyer's mental sequence. **What is it? → Can they do it? (show the work immediately) → Do they understand my problem? → What happens if I say yes? → What do I get? → Who is behind it? → What about my doubts? → Do it.** Proof comes second on purpose: owners trust what they can see more than what they read.

---

## 4. Section-by-section spec

### 4.0 Sticky header
- Height 72px desktop / 64px mobile. Background `--paper` at 85% opacity with `backdrop-blur`. A 1px bottom border appears only after the page has scrolled 8px.
- Left: logo, links to `#top`.
- Center (desktop ≥1024px only): 4 anchor links: **Work · How it works · FAQ · About**. No dropdowns.
- Right: Primary button **Get my free demo page** (desktop). Mobile: compact primary button **Free demo** (no hamburger menu; the page is one scroll, so a menu only distracts).
- Active-section highlight on nav links (IntersectionObserver), shown as a mint dot under the active link.

### 4.1 Hero (`#top`)
**Layout:** desktop two columns (55/45), mobile stacked (copy first, visual second). Min-height ~88vh desktop. No full-screen height on mobile.

**Copy:**
- Eyebrow: `WEBSITES BUILT FOR PLUMBERS`
- H1: **Your work earns trust. Your website should too.** ("should too" gets a mint highlight underline on light background, not mint text)
- Sub: *We design and build clear, mobile-friendly websites that help homeowners understand your services, check you cover their area, and get in touch.*
- Primary CTA: **Get my free demo page →**
- Secondary CTA: **Watch the work** (scrolls to `#work`)
- Micro-trust row under the buttons (13–14px, muted, with check icons):
  `✓ Free demo page, no payment` · `✓ Scope & price agreed in writing` · `✓ You own your domain & site`

**Visual (right column):** the provided image `/public/images/hero-devices.webp` (1000×960, a browser + phone showing Pathmaker Plumbing on a deep-ink background). Place it inside a rounded (24px) ink panel so its dark background blends in. Two small floating labels on the image (white cards, ink text, mint left border):
- `Tap-to-call on every screen`
- `Service area answered upfront`
These labels fade in after 400ms. Static otherwise. **No video in the hero:** it slows LCP and pulls attention from the CTA.

**CRO notes:** H1 + CTA must be visible without scrolling on a 390×844 phone. Preload the hero image (`priority`).

### 4.2 Trust strip
A thin band directly under the hero on white, with 5 inline items (icon + short label). Horizontal scroll-snap on mobile, single row on desktop:
1. Tap-to-call on mobile
2. Clear service areas
3. Short, smart estimate forms
4. Real reviews & licenses shown
5. Fast, modern builds (Next.js)

These describe **what PlumbNexo builds**. They are not client claims.

### 4.3 Portfolio: Video case studies (`#work`), the most important proof section
See **§5** for the full video presentation spec.
- Eyebrow: `RECENT WORK`
- H2: **Websites we designed and built for plumbing businesses.**
- Sub: *Each 45-second walkthrough shows the problem the site solves, the features we built, and why each one matters to the homeowner or property manager on the other end.*
- 2 case study blocks (Pathmaker, Bliss), laid out as alternating rows on desktop (video left/text right, then reversed) and stacked on mobile.
- After both blocks, a centered inline CTA band: *"Want to see what this looks like for your business?"* + Primary **Get my free demo page →**

### 4.4 Problems we fix (`#problems`)
- Eyebrow: `WHAT GETS IN THE WAY`
- H2: **Good plumbers lose jobs to unclear websites.**
- 4 cards in a 2×2 grid (1 column on mobile). Each card: small icon, **Problem** (bold, ink), **Fix** (muted), and a "Why it matters" line with a mint dot.

| Problem | Fix | Why it matters |
|---|---|---|
| Homeowners can't tell if you handle their job | Clear service sections for the work you want more of | Visitors recognize a fit before they call |
| "Do you come out to my area?" | Service areas named next to services and contact | Fewer out-of-area calls and wasted replies |
| Calling you takes too many taps on a phone | Sticky tap-to-call and short forms on every screen | Less friction for people with an urgent problem |
| Requests arrive with no useful detail | Forms that ask for ZIP, service, and the issue | Your team can respond faster and quote better |

### 4.5 How the free demo works (`#process`)
- Eyebrow: `HOW IT WORKS`
- H2: **See your website before you pay for it.**
- 3 numbered steps in a horizontal line on desktop, connected by a thin line (the connection motif), and vertical on mobile:
  1. **Share the basics (2 minutes).** Your business name, main service, and the areas you cover.
  2. **We build your free demo page.** One page, designed for your business, working on mobile.
  3. **Review it together, then decide.** If you want the full website, we agree scope, price, and timeline in writing. If not, no hard feelings.
- Below the steps: a note card on ink background with mint text accent: **6 months of support after your full website launches.** Fixes and small edits, as agreed in the project.
- Primary CTA: **Get my free demo page →**

### 4.6 What the full website includes (`#included`)
- Eyebrow: `THE FULL WEBSITE`
- H2: **Everything a homeowner needs to choose you.**
- 8 compact items in a 4×2 grid (2 columns on mobile), each an icon + title + one line:
  1. **Service pages:** for the jobs you want more of
  2. **Service-area coverage:** towns and ZIPs, plus a map
  3. **Mobile tap-to-call:** a sticky call bar and click-to-call everywhere
  4. **Smart estimate forms:** short, routed to the right person, tested
  5. **Trust proof:** your real reviews, license, and project stories
  6. **Speed & SEO basics:** fast loading, clean structure, local schema
  7. **Tracking:** calls and form requests measured
  8. **You own it:** your domain, your accounts, a clear handover
- Small muted note: *Advanced integrations (CRM, booking tools) and ongoing SEO or ads are scoped and quoted separately.*

### 4.7 Founder (`#about`)
- Layout: photo left (4:5, rounded 20px, real photo at `/public/images/my-img.png`; if missing, render an ink panel with the N mark and a `TODO` comment), text right.
- Eyebrow: `WHO YOU'LL WORK WITH`
- H2: **Hi, I'm Hassan, founder of PlumbNexo.**
- Body (2 short paragraphs):
  *I build websites for plumbing businesses, and only plumbing businesses. That focus means I already know what a homeowner with a leaking water heater is looking for when they land on your site.*
  *You'll deal with me directly, from the first call to launch and support afterwards. I'll show you a free demo page first, so you can judge my work instead of my promises.*
- Signature-style line: `Hassan Javaid · Founder, PlumbNexo`
- Links: Instagram `https://www.instagram.com/plumbnexo/` (text link, opens new tab).

### 4.8 FAQ (`#faq`)
- Eyebrow: `QUESTIONS`
- H2: **Before you ask for a demo.**
- Accessible accordion (`<details>`/`<summary>` or a Radix-style component with `aria-expanded`). First item open by default. One open at a time on mobile.

1. **Is the demo page really free?**
   Yes. I build one personalized page for your business at no charge. You only pay if you decide to go ahead with the full website.
2. **What happens after I see the demo?**
   We go through it together. If you like the direction, I send a written scope with price, timeline, and payment milestones. Nothing starts until you approve it.
3. **Can you guarantee more leads or a #1 ranking?**
   No, and be careful with anyone who does. I build a site designed to make it easy for homeowners to understand, trust, and contact you, and I set up tracking so you can see what it does. Results also depend on your traffic, reviews, pricing, and how fast you respond.
4. **Who owns the website and domain?**
   You do. Domain, hosting, and accounts are in your name, with a clear handover at launch.
5. **How long does a full website take?**
   It depends on the scope we agree. You'll get a delivery date in the written proposal before any work starts.
6. **What do you need from me?**
   Your services, service areas, license details, real photos if you have them, and your approval on anything we say about your business. I keep the list short.
7. **Do you only work in Charlotte?**
   Charlotte-area plumbers are my focus, but I work with plumbing businesses anywhere in the U.S.
8. **What's included in the 6 months of support?**
   Fixes for agreed website issues and small edits after launch. New pages or major features are quoted separately.

- Under the FAQ: *Still have a question?* Text link **Ask it in the form below ↓**.

Add `FAQPage` JSON-LD for these questions.

### 4.9 Final CTA + Demo request form (`#demo`), the conversion point
**Layout:** full-width ink section with the outlined N motif. Desktop is two columns: left copy (40%), right form card (60%, white, radius 20px, shadow). Mobile stacked, form first after a short heading.

**Left copy:**
- Eyebrow (mint on ink): `FREE DEMO PAGE`
- H2 (white): **See your new website before you commit.**
- Sub (white at 80%): *Tell me about your business. I'll reply within 1 business day to confirm the details, then build your demo page.*
- 3 checks (mint icons, white text): `No payment for the demo` · `No obligation to continue` · `Written scope & price if you do`

**Form: 2 steps** (reduces perceived effort and raises starts):

*Step 1 of 2: About your business*
| Field | Type | Required | Notes |
|---|---|---|---|
| Business name | text | ✓ | `autocomplete="organization"` |
| Main service area | text | ✓ | Placeholder: "e.g. Charlotte, Concord, Matthews" |
| Current website | url | — | Placeholder: "Leave blank if you don't have one". Accept input without `https://` and normalize it |
| Type of work | segmented buttons | ✓ | `Residential` · `Commercial` · `Both` |

Button: **Continue →** (validates step 1)

*Step 2 of 2: How to reach you*
| Field | Type | Required | Notes |
|---|---|---|---|
| Your name | text | ✓ | `autocomplete="name"` |
| Best way to reach you | segmented | ✓ | `Phone` · `Email` · `Text` |
| Phone or email | tel/email | ✓ | Input type switches with the choice above |
| Anything I should know? | textarea (3 rows) | — | Placeholder: "e.g. I want more water heater jobs" |

Button (primary, full width): **Send my demo request →**
Under the button (13px, muted): *No spam. I'll only use this to reply about your demo.* plus a link to `/privacy`.

**Form behavior:**
- Progress indicator at the top: "Step 1 of 2" with a 2-segment bar (mint fill).
- "← Back" text button on step 2. Keep entered values.
- Inline validation on blur, never on every keystroke. Error text appears under the field with an icon, and focus moves to the first invalid field.
- Hidden honeypot field `company_website` plus a 3-second minimum time-to-submit check for spam.
- Capture hidden fields: `utm_source`, `utm_medium`, `utm_campaign` (from URL, stored in `sessionStorage`), `referrer`, `landing_variant`.
- Submit → POST to `/api/demo-request` (Next.js route handler) → send an email via **Resend** to `DEMO_INBOX_EMAIL` (env var). Also forward to an optional webhook `LEAD_WEBHOOK_URL` (for Google Sheets / Zapier / CRM).
- Loading state on the button (spinner + "Sending…", disabled).
- Success: replace the form card content (no page jump) with: ✓ **Thanks, {firstName}! Your request is in.** *I'll reply within 1 business day to confirm a few details. Meanwhile, you can watch the case studies again.* Then link to `#work`. Also `router.push('/thank-you')` is NOT required; fire the conversion event in place. (`/thank-you` exists only as a fallback for no-JS submits.)
- Error: keep the data, show *"Something went wrong sending your request. Please try again, or email {DEMO_INBOX_EMAIL}."*

### 4.10 Footer
Ink-2 background, white text at 70%. One row on desktop, stacked on mobile:
- Logo (white) + tagline *Websites built for plumbers.*
- Links: Work · How it works · FAQ · Privacy
- Contact: email (from config), Instagram
- `© {year} PlumbNexo. All rights reserved.`
No newsletter signup and no extra CTAs. The footer is for finding details, not converting.

### 4.11 Mobile sticky CTA bar
- Shows on screens < 768px **after the hero's primary CTA scrolls out of view**, and hides when `#demo` is in view.
- 64px tall, white, top border, safe-area padding (`env(safe-area-inset-bottom)`).
- Content: full-width primary button **Get my free demo page →**
- Slides up with a 200ms transition (none if reduced motion).

---

## 5. Portfolio video presentation (detailed)

### 5.1 Files (already provided in `/public`)
```
/public/videos/pathmaker-case-study.mp4    1920×1080, H.264, 30fps, ~45s, no audio
/public/videos/pathmaker-poster.jpg        1920×1080 thumbnail (poster)
/public/videos/bliss-case-study.mp4        1920×1080, H.264, 30fps, ~45s, no audio
/public/videos/bliss-poster.jpg            1920×1080 thumbnail (poster)
```
Design reference (not served on the site): `/docs/portfolio-section-mockup.jpg` shows how the portfolio section should look on desktop. Match it.

> If a file name differs, search `/public` for `*.mp4` and match by the words "pathmaker" / "bliss". Never hotlink external video.

The videos are silent and self-explaining (all messaging is on-screen text), so they work muted, on autoplay previews, and without captions. Still, add `aria-label`s and a text summary (below).

### 5.2 What each video contains (same structure for both)
| Time | Chapter | On screen |
|---|---|---|
| 0:00–0:04 | **Intro** | Project name, type, location |
| 0:04–0:09 | **The brief** | The customer problem the site had to solve |
| 0:09–0:17 | **Above the fold** | Desktop hero with callouts: trust proof + CTAs |
| 0:17–0:33 | **Walkthrough** | Page scroll with 4 feature → outcome callouts |
| 0:33–0:39 | **Mobile** | Phone view + sticky call / quote bar |
| 0:39–0:42 | **Skills used** | UX, copy, build stack |
| 0:42–0:45 | **Outro** | "Designed & developed by PlumbNexo" + CTA |

### 5.3 Case study block layout
```
┌───────────────────────────────────────────────┬─────────────────────────────┐
│                                               │ 01 · RESIDENTIAL · CHARLOTTE│
│   [ VIDEO PLAYER 16:9 ]                       │ Pathmaker Plumbing          │
│   poster + mint "Watch" play pill (left 50%,  │ One-line summary            │
│   top 70%) · duration chip "0:45" top-right   │                             │
│                                               │ THE CHALLENGE  (2 lines)    │
│                                               │                             │
├───────────────────────────────────────────────┤ WHAT WE BUILT → WHY IT HELPS│
│ chapter chips: Brief · Above the fold ·       │ • feature → outcome (×4)    │
│ Walkthrough · Mobile · Skills                 │                             │
└───────────────────────────────────────────────┤ skill tags                  │
                                                │ Visit live site ↗ (text)    │
                                                └─────────────────────────────┘
```
- Desktop: video column 58%, text column 42%. Mobile: video on top, full width, then text.
- Video frame: radius 16px, ink-2 background, soft shadow, `aspect-ratio: 16/9`, no layout shift.

### 5.4 Player behavior (low distraction, fast)
- **Poster first, never autoplay with sound, never autoplay on page load.** Show `poster` + a **mint "play pill"**: a mint pill containing a 44px ink circle with a mint ▶ triangle and the label **Watch 45-sec case study** (ink, 800 weight).
  - **Position it at `left: 50%; top: 70%` of the video frame (anchored at its own top-left, NOT centered).** The posters were designed with an empty zone there, so the pill never covers the project title, the bullets, or the phone mockup. Do not center the play button.
  - Pill shadow: `0 0 0 6px rgba(184,243,107,.22)`. On hover the ring grows to 10px and the triangle nudges 2px right.
  - Duration chip `0:45` goes in the **top-right** corner (dark translucent pill), not bottom-right.
  - See `portfolio-section-mockup.jpg` for the exact look.
- `preload="none"` on both videos, so they cost nothing until clicked. The poster is a `next/image`-optimized `<img>` overlay (lazy) and the `<video>` mounts on first click.
- On click: play inline (`playsInline`, `muted` because there's no audio track anyway, `controls` shown). Pause any other playing video. Fire `video_play`.
- **Hover preview (desktop only, optional):** on hover for > 600ms, play muted from 0:09 for a live preview, and pause/reset on leave. Disable if `prefers-reduced-motion` or `saveData`.
- **Chapter chips** below the video: clicking a chip seeks to the timestamp and plays. The active chip is highlighted (mint-soft bg) while playing (`timeupdate`).
  - Pathmaker and Bliss use the same chapter times: `0` Brief, `9` Above the fold, `17` Walkthrough, `33` Mobile, `39` Skills.
- **On end:** overlay an end card on the video: **"Want a site like this?"** + Primary **Get my free demo page →** + "↻ Replay" text button. Fire `video_complete`.
- Keyboard: play button is a real `<button>` with an `aria-label` like "Play Pathmaker Plumbing case study video, 45 seconds". Chips are buttons. Visible focus rings (2px mint + 2px ink offset).
- Fullscreen allowed via native controls.

### 5.5 Case study text content

**Case study 01: Pathmaker Plumbing**
- Tag line: `01 · RESIDENTIAL · CHARLOTTE, NC`
- Title: **Pathmaker Plumbing**
- Summary: *A trust-first website for a family-run residential plumber, built to help homeowners find the right service and reach the team fast.*
- The challenge: *Homeowners with a leak or no hot water need three answers fast: Can you fix this? Do you cover my area? How do I reach you right now? The site had to answer all three without making anyone dig.*
- What we built → why it helps:
  - **Trust proof above the fold** (license, Google rating, Rinnai dealer) → *homeowners verify the business before calling*
  - **Services by problem + symptom picker** → *unsure visitors find a starting point*
  - **Real project story with approved scope** → *shows honest diagnosis, not upselling*
  - **5-field request form with ZIP + sticky call bar** → *useful requests, one-tap calls*
- Skill tags: `UX strategy` `Conversion copywriting` `Information architecture` `Responsive design` `Next.js` `Local SEO structure` `Accessibility`
- Link: **Visit live site ↗** → `https://pathmaker-plumbing.vercel.app/` (`target="_blank" rel="noopener"`, fires `portfolio_outbound`)

**Case study 02: Bliss Plumbing**
- Tag line: `02 · COMMERCIAL · CHARLOTTE, NC`
- Title: **Bliss Plumbing**
- Summary: *A commercial plumbing website built for property and facility managers who need a contractor that understands scope, scheduling, and recurring maintenance.*
- The challenge: *Facility and property managers compare contractors on one question: do they understand my kind of property? The site needed to answer that by property type and turn interest into a qualified quote request.*
- What we built → why it helps:
  - **Cards by property type** → *managers see their building immediately*
  - **7 services, each one click from a quote** → *no hunting for the next step*
  - **5-step process, inquiry to scope** → *expectations set before the first call*
  - **Qualified inquiry form** (need, property type, location) → *requests arrive pre-sorted, ready to scope*
- Skill tags: `B2B UX` `Conversion copywriting` `Lead qualification forms` `Responsive design` `Next.js` `Local SEO structure` `Accessibility`
- Link: **Visit live site ↗** → `https://blissplumbing.vercel.app/`

### 5.6 Video SEO
Add `VideoObject` JSON-LD for each video (name, description = summary, thumbnailUrl = poster absolute URL, uploadDate, duration `PT45S`, contentUrl).

---

## 6. CRO & UX principles applied (checklist the build must pass)

- [ ] **One goal:** every primary button goes to `#demo`. No competing offers, newsletter, or blog.
- [ ] **5-second test:** a visitor understands *who it's for, what they get, and what to do* from the hero alone.
- [ ] **CTA frequency:** primary CTA appears in Header, Hero, after Portfolio, in Process, in video end cards, and in the Final section. Plus the mobile sticky bar.
- [ ] **Proof before ask:** the portfolio comes directly after the hero.
- [ ] **Risk reversal near every CTA:** "Free demo, no payment" / "Scope & price in writing".
- [ ] **Short form, split in 2 steps.** Ask only what's needed to reply.
- [ ] **Objections answered:** price, guarantees, ownership, timeline, effort (FAQ).
- [ ] **No exit points** above the form except the portfolio "Visit live site" links (text links, new tab).
- [ ] **Scannable:** every section has eyebrow → H2 → one line → content. No paragraph longer than 3 lines on desktop.
- [ ] **Thumb-friendly:** all tap targets ≥ 48×48px; primary actions within thumb reach on mobile.
- [ ] **Fast:** LCP < 2.0s on 4G mobile; CLS < 0.05; no render-blocking third-party scripts.

---

## 7. Tracking

Use GA4 (`NEXT_PUBLIC_GA_ID`) loaded with `next/script` `strategy="afterInteractive"`, and optionally Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) for heatmaps. If an ID env var is missing, load nothing.

| Event | When | Params |
|---|---|---|
| `cta_click` | Any primary CTA | `location` (header, hero, work, process, video_end, sticky, final) |
| `video_play` | First play | `project` (pathmaker / bliss) |
| `video_progress` | 25 / 50 / 75% | `project`, `percent` |
| `video_complete` | Ended | `project` |
| `chapter_click` | Chip click | `project`, `chapter` |
| `portfolio_outbound` | Visit live site | `project` |
| `form_start` | First field focus | — |
| `form_step_2` | Step 1 valid | `work_type` |
| `generate_lead` | Successful submit | `work_type`, `contact_method`, `utm_source` |
| `form_error` | Server error | — |
| `faq_open` | Item opened | `question` |

---

## 8. SEO & metadata
- `<title>`: **PlumbNexo | Websites Built for Plumbers**
- Meta description: *Clear, mobile-friendly websites for plumbing businesses. See a free demo page for your business before you commit. Charlotte, NC and across the U.S.*
- OG image: `/public/og.jpg` (1200×630). If missing, generate one with `next/og` (ink background, H1 in white, "should too" in mint, logo).
- JSON-LD: `ProfessionalService` (name, url, areaServed "Charlotte, NC" + "United States", founder "Hassan Javaid", sameAs Instagram), `FAQPage`, 2× `VideoObject`.
- One H1 only. H2 per section. Semantic `<header> <main> <section aria-labelledby> <footer>`.
- `robots`: index, follow. Add `sitemap.xml` and `robots.txt`.
- Canonical: `SITE_URL` env var (default `https://plumbnexo.vercel.app`).

---

## 9. Accessibility
- WCAG 2.1 AA. Check contrast for muted text on paper (`#52635F` on `#F7F8F2` ≈ 6.1:1 ✓).
- Skip link "Skip to content" as the first focusable element.
- Every form input has a visible `<label>`; errors are linked via `aria-describedby`; the step change is announced with an `aria-live="polite"` region.
- Videos: descriptive `aria-label`; the text summary next to each video covers the same information (the text alternative).
- Focus never trapped; visible focus styles on everything.

---

## 10. Project structure
```
/app
  layout.tsx            fonts, metadata, analytics, JSON-LD
  page.tsx              composes sections in order
  privacy/page.tsx      simple privacy policy (form data use, analytics)
  thank-you/page.tsx    no-JS fallback
  api/demo-request/route.ts   validation (zod), honeypot, Resend email, webhook
/components
  Header.tsx  MobileCtaBar.tsx  Button.tsx  Eyebrow.tsx  Section.tsx
  sections/Hero.tsx  TrustStrip.tsx  Work.tsx  Problems.tsx  Process.tsx
           Included.tsx  Founder.tsx  Faq.tsx  DemoForm.tsx  Footer.tsx
  video/CaseStudyVideo.tsx   (poster, play, chapters, end card, tracking)
/content
  caseStudies.ts        all text from §5.5 + file paths + chapters
  faq.ts
/lib
  analytics.ts          track(event, params) wrapper (no-op if GA missing)
  site.config.ts        SITE_URL, DEMO_INBOX_EMAIL, INSTAGRAM, FOUNDER
/public
  /videos   (provided)  /images  /brand  og.jpg
```
All copy lives in `/content` or the section files as plain strings, so it's easy to edit later.

### Environment variables
```
SITE_URL=https://plumbnexo.vercel.app
RESEND_API_KEY=
DEMO_INBOX_EMAIL=          # where demo requests go
DEMO_FROM_EMAIL=           # verified Resend sender
LEAD_WEBHOOK_URL=          # optional
NEXT_PUBLIC_GA_ID=         # optional
NEXT_PUBLIC_CLARITY_ID=    # optional
```

---

## 11. Responsive breakpoints
| Width | Behavior |
|---|---|
| < 640 | Single column, sticky CTA bar, compact header button "Free demo" |
| 640–1023 | Single column with wider media; grids go to 2 columns |
| ≥ 1024 | Full nav, two-column hero, alternating case study rows |
| ≥ 1440 | Container capped at 1200px; nothing stretches |

Test at 360, 390, 768, 1024, 1440.

---

## 12. Definition of done
- [ ] All sections render in the order of §3 with the exact copy given.
- [ ] Both videos play from `/public/videos`, with posters, chapters, end card CTA, and analytics events.
- [ ] Form submits end to end (email received), validation and both error states work, honeypot blocks bots.
- [ ] Mobile sticky bar shows/hides correctly.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] No console errors, no layout shift when videos mount.
- [ ] `prefers-reduced-motion` disables all animation and hover previews.
- [ ] No invented testimonials, numbers, or guarantees anywhere on the page.
"# plumbNexo" 
