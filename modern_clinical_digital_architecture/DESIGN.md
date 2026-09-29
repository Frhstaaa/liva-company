# Design System: Liva SIMRS - Modern Clinical Architecture

## 1. Visual Theme & Atmosphere
A restrained, institutional healthcare intelligence interface built for hospital executives, clinical committees, and medical IT specialists. The atmosphere combines surgical precision with clean modern digital elegance — balanced data density, crisp hairline structural borders, and purposeful interactions. 
- **Density:** Daily App Balanced to Cockpit Dense (Level 6/10)
- **Variance:** Offset Asymmetric & Structured Grid (Level 6/10)
- **Motion:** Fluid Spring-Physics & Real-Time Telemetry (Level 5/10)

## 2. Color Palette & Roles (Official Brand Identity)
- **Primary Blue** (`#2F8BFF`) — Primary brand identity, primary CTA buttons, active navigation pills, progress bars, and key clinical accents.
- **Secondary Blue** (`#5BC0FF`) — Supporting cyan/azure accent, telemetry latency badges, metadata highlights, and focus states.
- **Primary Orange** (`#FF8A2B`) — Energy and human touch, brand mark accent dot, urgent clinical alerts, EWS badges, and ROI calculator metrics.
- **Secondary Orange** (`#FFB266`) — Soft warm accent, warning containers, and hover tints.
- **Charcoal / Navy** (`#1F2937`) — Deep foundational surface for dark headers, telemetry ribbons, terminal cockpits, and high-contrast typography.
- **Canvas White** (`#F8FAFC`) — Primary background canvas, clean healthcare surface.
- **Pure Surface** (`#FFFFFF`) — Cards, container fills, modals, and input fields.
- **Structural Hairline Border** (`#E5E7EB` / `#E2E8F0`) — Architectural 1px dividers.
- **Clinical Emerald** (`#10B981`) — Verified compliance, BSrE TTE digital signature validation, and 99.98% SLA uptime indicator.

## 3. Typography Rules
- **Display & Headings:** `Plus Jakarta Sans` / `Figtree` (Semibold & Bold) — Tight tracking (`-0.02em`), controlled proportional scale, authoritative and clear.
- **UI & Body Text:** `Inter` / `Figtree` (Regular & Medium) — Relaxed leading (`1.6`), max 65 characters per line for high legibility.
- **Code & Clinical Telemetry:** `JetBrains Mono` — For ICD-10 codes, SNOMED CT terminology, FHIR R4 JSON payloads, timestamps, and latency counters.
- **Banned Typography:** Generic serif fonts in software dashboards, uncalibrated font scale jumps, and multi-line button labels.

## 4. Component Stylings
- **Buttons:** Tactile feedback on active state (`active:scale-[0.98]`). Primary buttons in solid `#2F8BFF` with `#1E75E6` hover. No neon outer glows. Single-line labels with clear verbs.
- **Cards & Bento Grid:** Crisp white surfaces (`#FFFFFF`) with 12px–16px rounded corners and subtle `#E5E7EB` hairline borders. Elevation used exclusively when communicating hierarchy.
- **Inputs & Forms:** Label positioned strictly above the input field, focus ring in `#2F8BFF`, error text displayed below with clear corrective guidance.
- **Interactive Simulator Cockpit:** Dark slate ribbon (`#1F2937`) with live tab switcher (RME SOAP, Smart Pharmacy, SATUSEHAT FHIR R4, INA-CBGs Auto-Grouper) and monospace telemetry streams.
- **ROI & Efficiency Calculator:** Real-time dual slider controls (Bed Capacity & Outpatient Visits/Day) dynamically computing annual paper cost savings, BPJS dispute risk prevention, and patient queue hours saved.

## 5. Layout & Responsive Principles
- **Layout Architecture:** CSS Grid-first responsive structures (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4`).
- **Container Maximum Width:** Standard `max-w-7xl` centered with fluid horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Mobile Collapse (< 768px):** All multi-column grids collapse cleanly into a single vertical stream. Minimum touch targets of `44px`.
- **Viewport Stability:** Full-height sections utilize `min-h-[100dvh]` to eliminate mobile address bar jump artifacts.

## 6. Anti-Patterns & Banned AI Slop Clichés
- ❌ **No AI Purple/Rainbow Gradients:** Banned generic purple mesh gradients and neon glow drop-shadows.
- ❌ **No Generic Emojis as UI Icons:** Replaced with professional Google Material Symbols Outlined icons.
- ❌ **No Meaningless Buzzwords:** Replaced "Unleash", "Elevate", "Next-Gen" with concrete regulatory and clinical standards (Permenkes 24/2022, HL7 FHIR R4, BPJS VClaim 2.0, ICD-10, KFA).
- ❌ **No Fake Screenshot Divs:** Built real, interactive clinical simulators and dynamic ROI calculators.
- ❌ **No Pure Black (`#000000`):** Charcoal/Navy `#1F2937` and Slate `#0F172A` used for natural visual depth.