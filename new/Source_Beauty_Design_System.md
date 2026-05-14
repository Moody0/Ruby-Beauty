# Source Beauty - Design System Documentation

This document outlines the core design system for **Source Beauty (sourcebeauty.com)**. It includes inferred UI tokens, typography scales, color palettes, and component styles based on the structure of the Arabic e-commerce platform.

---

## 1. Color Palette

The color system is designed to allow beauty products to stand out while maintaining a clean, modern, and trustworthy aesthetic.

### 1.1 Brand & Background Colors
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `color-bg-primary` | `#FFFFFF` | Main page backgrounds, product card backgrounds. |
| `color-bg-secondary` | `#F9F9F9` | Section backgrounds, footer background, subtle separations. |
| `color-brand-accent` | `#E8A2A8` | Soft blush pink for subtle brand accents and secondary highlights. |
| `color-brand-dark` | `#111111` | Pure dark aesthetic for premium feel (used in primary headers/footers). |

### 1.2 Text Colors
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `color-text-primary` | `#1A1A1A` | Main headings, primary body text, product titles. |
| `color-text-secondary` | `#666666` | Descriptions, breadcrumbs, brand names on product cards. |
| `color-text-tertiary` | `#999999` | Disabled text, placeholders, original strikethrough prices. |
| `color-text-inverse` | `#FFFFFF` | Text inside solid primary buttons or dark badges. |

### 1.3 Semantic & Action Colors
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `color-sale-alert` | `#D32F2F` | Discount percentages, sale badges (e.g., "-25%"), error states. |
| `color-success` | `#2E7D32` | In-stock indicators, successful action messages. |
| `color-btn-primary` | `#1A1A1A` | Add to Cart buttons, Checkout buttons (High contrast). |

---

## 2. Typography

To support seamless bilingual (Arabic and English) navigation, the typography system pairs clean geometric sans-serifs that maintain legible baseline alignment across both languages.

### 2.1 Font Families
* **English (Primary):** `Montserrat`, `Helvetica Neue`, `Arial`, sans-serif
* **Arabic (Primary):** `Cairo`, `Tajawal`, sans-serif
* **Monospace:** `Courier New`, monospace (for promo codes)

### 2.2 Font Weights
* **Regular:** `400` (Body copy, descriptions, standard labels)
* **Medium:** `500` (Subheadings, secondary buttons)
* **Semi-Bold:** `600` (Product titles, primary buttons)
* **Bold:** `700` (Major headings, sale prices, prominent badges)

### 2.3 Type Scale
| Element | Font Size | Line Height | Font Weight | Letter Spacing (EN) | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Display)** | `32px` | `40px` | `700 (Bold)` | `-0.5px` | Main Page Titles, Hero Banners |
| **H2 (Section)** | `24px` | `32px` | `600 (Semi-Bold)`| `0px` | "أشهر مكياچ", "أكثر مبيعا" |
| **H3 (Card Title)**| `16px` | `24px` | `600 (Semi-Bold)`| `0px` | Product Names in Grids |
| **Subtitle** | `14px` | `20px` | `500 (Medium)` | `0.2px` | Brand Names (e.g., *Maybelline*) |
| **Body (Primary)** | `16px` | `24px` | `400 (Regular)` | `0px` | Product Descriptions, Reviews |
| **Body (Small)** | `14px` | `20px` | `400 (Regular)` | `0px` | Footer links, standard metadata |
| **Price (Current)**| `18px` | `24px` | `700 (Bold)` | `0px` | Active selling price |
| **Price (Old)** | `14px` | `20px` | `400 (Regular)` | `0px` | Strikethrough original price |
| **Badge/Tag** | `12px` | `16px` | `700 (Bold)` | `0.5px` | "Sale", "Exclusive", Discount tags |

---

## 3. UI Components

### 3.1 Buttons
* **Primary Button (Add to Cart / Checkout):**
    * Background: `var(--color-btn-primary)` (`#1A1A1A`)
    * Text Color: `var(--color-text-inverse)` (`#FFFFFF`)
    * Border: None
    * Border-Radius: `4px`
    * Padding: `12px 24px`
    * Font: `16px`, `600 (Semi-Bold)`
    * Hover State: Opacity `90%` or transition to slightly lighter charcoal (`#333333`).

* **Secondary Button (View Details / Outline):**
    * Background: Transparent
    * Text Color: `var(--color-text-primary)`
    * Border: `1px solid #1A1A1A`
    * Border-Radius: `4px`
    * Padding: `10px 24px`

### 3.2 Product Cards
* **Background:** `#FFFFFF`
* **Border:** `1px solid #EAEAEA` (or borderless with subtle shadow on hover)
* **Image Container:** Aspect ratio `1:1` (Square), light grey placeholder background.
* **Padding:** `16px` inner padding.
* **Badges:** Positioned top-left or top-right, absolutely positioned.
    * *Sale Badge:* Background `#D32F2F`, Text `#FFFFFF`, Padding `4px 8px`.

### 3.3 Inputs & Forms (Search, Checkout)
* **Border:** `1px solid #CCCCCC`
* **Border-Radius:** `4px`
* **Padding:** `12px 16px`
* **Text Size:** `14px`
* **Focus State:** Border changes to `#1A1A1A`, outline `1px solid #1A1A1A`.

---

## 4. Spacing & Layout Grid

### 4.1 Grid System
* **Max Width:** `1200px` (Desktop)
* **Columns:** `12` columns on Desktop, `4` on Mobile.
* **Gutters:** `24px` (Desktop), `16px` (Mobile).
* **Product Grid Layout:** 4 items per row (Desktop), 3 items per row (Tablet), 2 items per row (Mobile).

### 4.2 Spacing Scale (8pt Grid)
* `xs`: `4px` (Space between old price and new price)
* `sm`: `8px` (Space between brand name and product title)
* `md`: `16px` (Standard inner padding for cards and inputs)
* `lg`: `24px` (Space between layout columns)
* `xl`: `32px` (Space between horizontal sections)
* `xxl`: `64px` (Top/Bottom padding for major page blocks like "Bestsellers")
