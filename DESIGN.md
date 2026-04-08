# Design System: Action Blast

## 1. Overview & Creative North Star
**Creative North Star: "The Living Storybook"**

This design system rejects the clinical, flat nature of modern SaaS interfaces in favor of a tactile, high-energy "Editorial Comic" experience. We are not just building an interface; we are illustrative world-building. 

The system breaks the "template" look through **Kinetic Asymmetry**. Layouts should feel like dynamic comic panels—elements shouldn't just sit on a grid; they should lean, overlap, and burst out of their containers. By combining sophisticated tonal layering with raw, hand-drawn energy, we create a premium digital environment that feels hand-crafted for a 6-year-old’s imagination while maintaining the rigorous hierarchy of a high-end editorial piece.

---

## 2. Core Tokens

### Color Palette
*   **Primary (`#0091FF`):** Vibrant Blue - Use for most critical actions.
*   **Secondary (`#FFC107`):** Sunny Yellow - Use for highlighting progress or rewards.
*   **Tertiary (`#FF5722`):** Energetic Orange - Use for "POW/BAM" style alerts and high-energy feedback.
*   **Neutral (`#1A1C1E`):** Deep Ink

### Typography
*   **Display & Headlines:** Plus Jakarta Sans (These are your "Sound Effects." Use `display-lg` for big wins and `headline-md` for panel titles).
*   **Body & Titles:** Be Vietnam Pro (This is the "Narrator." Use `title-lg` for speech bubbles).
*   **Labels:** Plus Jakarta Sans (Used for micro-copy and functional metadata).

### Shape & Spacing
*   **Roundness:** ROUND_FULL (Pill-shaped, maximum roundness)
*   **Spacing Scale:** 3x Base

---

## 3. Surface Logic & Nesting

### The "No-Line" Rule
While the *aesthetic* calls for bold outlines, we prohibit the use of standard 1px grey borders for UI sectioning. Internal boundaries must be defined through **Background Color Shifts**. For example, a `surface_container_low` sidebar sitting on a `surface` background creates a clean, sophisticated edge without visual "noise."

### Surface Hierarchy & Nesting
Treat the UI as a stack of physical paper. Use `surface_container_lowest` (#ffffff) for card-level interaction points and `surface_container_highest` (#dbdde0) for deep "recessed" areas like troughs for sliders or input backgrounds.

### The "Glass & Gradient" Rule
To add a premium "soul" to the comic aesthetic, apply subtle gradients to main CTAs (e.g., `primary` to `primary_container`). Use **Glassmorphism** (backdrop-blur with semi-transparent `surface` colors) for speech bubbles that float over gameplay, ensuring the "world" underneath is always visible.

### Signature Textures
Apply a subtle halftone dot pattern or paper grain texture to `surface_container` layers. This prevents the vibrant colors from feeling "plastic" and gives them a tactile, ink-on-paper quality.

---

## 4. Elevation & Depth: "The Pop-Out"
We move away from traditional drop shadows toward **Tonal Layering** and **Hard-Edge Offsets**.

*   **The Layering Principle:** Stack surfaces from `surface_dim` (bottom) to `surface_container_lowest` (top) to create a natural rise.
*   **Ambient Shadows:** For floating elements (like a character badge), use extra-diffused shadows with 4-8% opacity, tinted with the `on_surface` color (#2d2f31) to avoid a "muddy" look.
*   **The "Ghost Border" Fallback:** If a container needs more definition, use the `outline_variant` token at 20% opacity. Never use 100% black for layout borders; reserve 100% "Ink" lines for illustrative components only.
*   **Comic Depth:** Use a 4px to 8px hard-offset shadow (using `on_primary_container`) on buttons to make them look like physical stickers "popping" off the page.

---

## 5. Components

### Buttons (The "Action Hero")
*   **Primary:** Bold `primary` fill, `on_primary` text. Apply a `xl` (3rem) roundedness and a hard 4px offset shadow.
*   **State:** On hover/press, the button should physically "sink" by reducing the shadow offset, mimicking a tactile click.
*   **Padding:** Generous (24px horizontal, 16px vertical) to accommodate small fingers.

### Speech Bubbles (The "Narrator")
*   Constructed with `surface_container_lowest` and a `md` (1.5rem) corner radius.
*   Include a "tail" pointing to the speaker.
*   Apply a backdrop-blur effect to the bubble to maintain visual depth.

### Action Bursts ("POW/BAM")
*   Use `tertiary_container` (#ff9475) with an irregular, hand-drawn starburst path.
*   Place `display-sm` typography inside, slightly rotated (3-5 degrees) to break the horizontal plane.

### Input Fields
*   **Container:** `surface_container_highest` with a `none` (0px) or `sm` (0.5rem) border radius to contrast with the bubbly buttons.
*   **No Dividers:** Forbid divider lines. Use `surface_container` shifts to separate input groups.

### Cards & Lists
*   **Prohibition:** No 1px dividers.
*   **Separation:** Use `xl` (3rem) vertical spacing or alternate between `surface_container_low` and `surface_container_lowest` to differentiate list items.

---

## 6. Do’s and Don’ts

### Do:
*   **Overlap Elements:** Let a character's head peek over a header or a button overlap a card edge. It breaks the "digital grid" feel.
*   **Use Intentional Asymmetry:** Rotate labels or badges by 2 degrees to give them a "taped-on" look.
*   **Prioritize Accessibility:** Use the high-contrast `on_primary_container` for text on vibrant backgrounds to ensure 6-year-olds can read without strain.

### Don’t:
*   **Don't use "Computer" Greys:** Avoid neutral greys (#808080). Use our tinted `outline` and `surface_variant` tokens to keep the palette warm and alive.
*   **Don't use sharp corners for interaction:** Use the `xl` and `full` roundedness tokens for anything meant to be touched. Sharp corners = "Watch out!" in a child's visual language.
*   **Don't over-clutter:** The "Action Bursts" are seasoning. If everything is a "POW," nothing is. Use them only for significant milestones.
