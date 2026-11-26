# Agri Rakshak: Neo-Brutalism Design System Specification

**Project:** Agri Rakshak (कृषि रक्षक / కృషి రక్షక్)  
**SIH Problem Statement:** SIH26131  
**Design Philosophy:** Functional Agricultural Neo-Brutalism  
**Target:** Application-Wide UI System  

---

## 1. Design System Philosophy & Identity

Agri Rakshak combines **high-contrast Neo-Brutalist visual structure** with **grounded agricultural earth-tones**. Designed specifically for Indian agricultural reality, the system prioritizes:

1. **Extreme Legibility in Direct Sunlight**: High-contrast 2px/3px dark borders (`#172117`), solid opaque backgrounds, and crisp typography ensure readability on low-cost Android displays under direct field sunlight.
2. **Tactile Physicality**: Hard-offset shadows (`4px 4px 0px #172117`) and mechanical hover depression simulate physical switches and stampings, reassuring rural users of tactile feedback.
3. **Brand Consistency**: Deep agricultural greens (`#1B5E20`, `#2E7D32`), soft crop cream (`#F5FAF3`), and vibrant sprout accents (`#E8F5E9`) keep the platform rooted in farming rather than generic software templates.
4. **No Glassmorphism or Blurred Shadows**: Soft translucent blurs, low-contrast gradients, and diffuse float elevations are strictly prohibited. Every surface is solid and demarcated.

---

## 2. Color Palette & Design Tokens

### Core Brand & Surface Palette

| Token Name | Hex Code | Purpose & Application |
|---|---|---|
| `--color-primary-green` | `#2E7D32` | Primary brand green, standard action buttons, key indicators |
| `--color-deep-green` | `#1B5E20` | Hero headers, primary brand badges, active tab fills, dark accents |
| `--color-light-green-surface` | `#E8F5E9` | Selected state backgrounds, active pills, alert highlights |
| `--color-pale-green-bg` | `#F5FAF3` | Global application background, public page canvas |
| `--color-warm-white` | `#FFFFFF` | Card content surfaces, modal backgrounds, input fields |
| `--color-dark-border` | `#172117` | Structural 2px/3px borders, headings, hard shadow fill |
| `--color-text-main` | `#172117` | Primary content text, card headers, table data |
| `--color-text-muted` | `#496274` | Descriptive supporting copy, timestamps, metadata |
| `--color-subtle-border` | `#D7E5D5` | Secondary structural dividers, disabled outlines |
| `--color-green-accent` | `#C8E6C9` | Hover backgrounds, badge accents, subtle highlights |

### Semantic Status Colors (High-Contrast Neo-Brutalism)

| Status | Fill Hex | Border Hex | Text Hex | Hard Shadow |
|---|---|---|---|---|
| **Success / Verified** | `#E8F5E9` | `#172117` | `#1B5E20` | `2px 2px 0px #172117` |
| **Warning / Pending** | `#FFF9C4` | `#172117` | `#F57F17` | `2px 2px 0px #172117` |
| **Danger / High Risk** | `#FFEBEE` | `#172117` | `#B71C1C` | `2px 2px 0px #172117` |
| **Info / AI Support** | `#E1F5FE` | `#172117` | `#0277BD` | `2px 2px 0px #172117` |

---

## 3. Structural Rules: Borders, Radii, and Shadows

### 3.1 Borders
- **Standard Cards, Inputs, Tables, Badges**: `2px solid #172117`
- **Hero Banners, Primary Auth Containers, Major Feature Panels**: `3px solid #172117`
- **Dividers & Table Cell Separators**: `2px solid #172117` or `1px solid #D7E5D5` for secondary data grids.
- **Rule**: No unbordered floating cards. Every card must have a defined border.

### 3.2 Border Radius
- **Square / Restrained Chamfer**: `0px` to `8px` (`rounded-none`, `rounded-sm`, `rounded-md`).
- **Pill Badges**: `rounded-full` is reserved strictly for compact status chips or language pills. Form controls, buttons, and panels must use `rounded-md` (4px to 6px) to maintain the brutalist identity.

### 3.3 Hard-Offset Elevation Shadows
All elevations are generated via directional translation without blur (`box-shadow: X Y 0px #172117`):

```css
/* Tailwind Config Extension */
shadow-neo-xs: '2px 2px 0px #172117',
shadow-neo-sm: '3px 3px 0px #172117',
shadow-neo:    '4px 4px 0px #172117',
shadow-neo-md: '5px 5px 0px #172117',
shadow-neo-lg: '6px 6px 0px #172117',
shadow-neo-xl: '8px 8px 0px #172117',
```

### 3.4 Interactive Mechanics (The "Mechanical Click" Physics)
Buttons and interactive cards translate toward their hard shadow on hover and active click:
- **Resting**: `transform: translate(0, 0); box-shadow: 4px 4px 0px #172117;`
- **Hover**: `transform: translate(-1px, -1px); box-shadow: 5px 5px 0px #172117;`
- **Active / Pressed**: `transform: translate(2px, 2px); box-shadow: 2px 2px 0px #172117;`
- **Disabled**: `transform: none; box-shadow: none; opacity: 0.6; cursor: not-allowed;`

---

## 4. Typography Hierarchy

| Level | Font Stack | Weight | Size / Line-Height | Tracking | Color |
|---|---|---|---|---|---|
| **Display / H1** | Public/Header: Serif / Sans | 800 / 900 | 2.25rem (36px) / 1.2 | `-0.025em` | `#172117` |
| **Section / H2** | System UI / Sans | 700 | 1.5rem (24px) / 1.3 | `-0.015em` | `#172117` |
| **Subsection / H3** | System UI / Sans | 700 | 1.125rem (18px) / 1.4 | `0em` | `#1B5E20` |
| **Metric Value** | Sans / Mono | 900 | 2rem to 2.5rem | `-0.03em` | `#172117` |
| **Body Primary** | Inter / Roboto / System Sans | 500 | 0.875rem (14px) / 1.5 | `0em` | `#172117` |
| **Body Muted** | Inter / Roboto / System Sans | 400 | 0.8125rem (13px) / 1.5 | `0em` | `#496274` |
| **Tags / Micro** | Sans / Mono | 700 | 0.6875rem (11px) / 1.2 | `0.05em` | `#172117` |

---

## 5. Standard Component Guidelines

### Buttons (`src/components/ui/Button.tsx`)
- **Primary**: Background `#2E7D32`, text `#FFFFFF`, border `2px solid #172117`, shadow `shadow-neo`.
- **Secondary**: Background `#FFFFFF`, text `#172117`, border `2px solid #172117`, shadow `shadow-neo-sm`.
- **Outline**: Background transparent, text `#172117`, border `2px solid #172117`, shadow `shadow-neo-xs`.
- **Danger**: Background `#DC2626`, text `#FFFFFF`, border `2px solid #172117`, shadow `shadow-neo`.

### Metric & KPI Cards (`src/components/ui/Card.tsx`)
- Background `#FFFFFF` or pale green `#F5FAF3`.
- Border: `2px solid #172117`.
- Shadow: `shadow-neo` (`4px 4px 0px #172117`).
- Header tag: Uppercase tracking badge with `1px solid #172117` border.

### Form Inputs & Textareas (`src/components/ui/Input.tsx`, `Textarea.tsx`)
- Surface: `#FFFFFF`.
- Border: `2px solid #172117`.
- Focus state: Outline `2px solid #1B5E20`, shadow lift `shadow-neo-sm`.
- Label: Font-semibold, text `#172117`, with required asterisk in red `#DC2626`.

### AI Diagnostic Decision Support Card
- Distinguishes AI decision support from human certified prescription.
- Surface: Warm white with `#E8F5E9` accent bar.
- Border: `2px solid #172117` with `shadow-neo`.
- Mandatory advisory disclaimer badge: "AI Decision Support — Consult Agri Officer".

---

## 6. Accessibility & Responsiveness

1. **Contrast Ratio**: All text and borders exceed WCAG AAA standards (> 7:1 against background).
2. **Focus Visibility**: Every interactive control renders a distinct `2px solid #172117` or `2px solid #1B5E20` focus ring.
3. **Touch Targets**: Minimum 44px x 44px on mobile viewports for all buttons and interactive cards.
4. **Responsive Grid**: Flex and CSS grid adapt gracefully from 1440px desktop to 375px mobile without horizontal scroll.
