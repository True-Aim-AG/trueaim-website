# Design System Override — Color Palette v3

**This file overrides Section 7.2 (Color Palette) of the PRD.**

**Source of truth:** `src/app/globals.css`. This doc mirrors the CSS
variables for the `[data-theme="dark"]` and `[data-theme="light"]` roots
so brand/design decisions are discoverable outside code.

## Dark Mode — Deep Navy (default)

### Base
- **Background:** `#060B18`
- **Background secondary:** `#0A1228`
- **Background tertiary:** `#0E1A35`
- **Text primary:** `#F0F4FF`
- **Text secondary:** `rgba(240, 244, 255, 0.75)`
- **Text muted:** `rgba(240, 244, 255, 0.50)`

### Primary — Ocean Blue
- **Primary CTA/Links:** `#3B82F6` (blue-500)
- **Hover states:** `#60A5FA` (blue-400)
- **Primary dark:** `#0A1F3D`
- **Primary foreground:** `#060B18`

### Secondary — Electric Blue
- **Secondary:** `#00A3FF`
- **Secondary light:** `#38BFFF`

### Accents
- **Aurora cyan / teal:** `#3B82F6` (unified with primary)
- **Aurora purple:** `#8B5CF6` (violet-500)

### Product Accents
| Product | Accent | Muted text |
|---------|--------|------------|
| MIRA | `#00A3FF` | `#38BFFF` |
| ContextBuilder | `#8B5CF6` violet | `#A78BFA` |
| ClaimEval | `#00A3FF` | `#38BFFF` |

---

## Light Mode

### Base
- **Background:** `#FFFFFF`
- **Background secondary:** `#F8FAFC`
- **Text primary:** `#020617` (slate-950)
- **Text secondary:** `#1E293B` (slate-800)
- **Text muted:** `#64748B` (slate-600)

### Primary — Ocean Blue (light-adjusted)
- **Primary CTA/Links:** `#2563EB` (blue-600)
- **Hover states:** `#1D4ED8` (blue-700)
- **Primary dark:** `#1E3A8A`

### Secondary — Ocean Blue (deeper for contrast)
- **Secondary:** `#0077CC`
- **Secondary light:** `#0099FF`

### Accents
- **Aurora cyan / teal:** `#2563EB` (unified with primary)
- **Aurora purple:** `#7C3AED` (violet-600)

### Product Accents
| Product | Accent | Muted text |
|---------|--------|------------|
| MIRA | `#0077CC` | `#005FA3` |
| ContextBuilder | `#7C3AED` violet | `#6D28D9` |
| ClaimEval | `#0077CC` | `#005FA3` |

---

## Status Colors (both themes)
- **Success:** `#22C55E` (green-500) / `#16A34A` (green-600)
- **Warning:** `#F59E0B` (amber-500)
- **Error:** `#EF4444` (red-500)

---

## Key Changes from v2 (2026-04)

- **New-look refresh**: deep-navy dark mode (`#060B18`) replaces the
  previous `#0B0C15` near-black; primary shifts from `#2563EB` to
  brighter `#3B82F6` in dark mode for contrast against the new bg.
- **ContextBuilder accent changed from teal to violet** in both themes
  (`#8B5CF6` dark / `#7C3AED` light). MIRA and ClaimEval now share the
  `#00A3FF` / `#0077CC` electric-blue accent instead of indigo/blue-600.
- **Aurora cyan unified with primary** — the separate `#06B6D4` /
  `#0891B2` cyan is gone; `--aurora-cyan` and `--aurora-teal` both
  resolve to the primary blue now.
- **Light mode primary unchanged** (`#2563EB`), but all dependent
  product/accent colors were retuned for a consistent blue/violet pair.

## Historical (v2 → v1 PRD)
- Pink (`#E91E8C`) → Blue (`#2563EB`)
- All pink references → blue-600
- Product cards use individual accent colors instead of unified pink
