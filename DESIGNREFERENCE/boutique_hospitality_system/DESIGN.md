---
name: Boutique Hospitality System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c19'
  on-tertiary-container: '#848480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e4e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1b1c19'
  on-tertiary-fixed-variant: '#474744'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 20px
  stack-gap-sm: 8px
  stack-gap-md: 16px
  stack-gap-lg: 32px
  section-padding: 48px
---

## Brand & Style
This design system embodies the essence of "Quiet Luxury." It is tailored for a high-end, boutique hotel experience where the interface acts as a digital concierge—sophisticated, unobtrusive, and deeply welcoming. 

The aesthetic blends **Modern Minimalism** with **Glassmorphism**. It prioritizes high-quality, full-bleed architectural photography, using white space and translucent layers to create a sense of breathability and exclusivity. The emotional response should be one of immediate calm and curated personal service.

## Colors
The palette is rooted in a "Deep Navy" primary color that provides a grounding, authoritative presence. "Warm Gold" is used sparingly as a high-contrast accent for primary actions, signifying value and premium service. 

The background uses a "Soft Off-White" (#F9F7F2) rather than pure white to reduce eye strain and provide a more tactile, "paper-like" feel. Secondary neutrals are muted to ensure that photography remains the focal point of the visual experience.

## Typography
The typographic hierarchy relies on the contrast between the elegant, high-contrast serifs of **Playfair Display** and the functional clarity of **Inter**. 

Headlines use generous leading and slight negative letter-spacing to evoke a modern editorial feel. Labels and small utility text should be set in uppercase with increased tracking to maintain legibility and a sense of "premium branding" seen in luxury fashion and hospitality.

## Layout & Spacing
Following iOS best practices, the layout utilizes a fluid grid with a standard 20px side margin. The spacing rhythm is based on an 8px base unit. 

Large-scale vertical padding (48px+) is used between major sections to emphasize the "minimalist" luxury aesthetic, preventing the UI from feeling cluttered. Elements like image carousels should bleed to the edge of the screen to maximize the impact of visual assets.

## Elevation & Depth
The design system employs **Glassmorphism** for its primary depth model.
- **Surface Tiers:** Backgrounds use the off-white base. Floating headers and navigation bars use a semi-transparent blur (Backdrop Filter: 20px, Opacity: 80%) to maintain context of the content underneath.
- **Shadows:** Avoid heavy black shadows. Use "Ambient Shadows"—very soft, large-radius blurs (e.g., 30px) with a low-opacity tint of the primary Navy color (10% opacity) to create a subtle lift.
- **Glass Overlays:** Cards containing text over photography must use a frosted glass effect to ensure legibility while maintaining the "airy" feel.

## Shapes
In line with premium mobile hardware, this design system uses generous corner radii. Standard components like cards and input fields use a 16px radius. Large image containers or promotional modals should use "rounded-xl" (24px) to create a soft, friendly, and modern silhouette that feels native to modern iOS devices.

## Components
- **Buttons:** Primary buttons are solid Deep Navy with Gold text or vice-versa. They feature a 16px corner radius and a subtle vertical gradient to suggest tactile quality.
- **Cards:** Feature a 1pt stroke in a light gold or neutral grey to define edges against the off-white background, combined with the ambient shadow defined in the Elevation section.
- **Input Fields:** Minimalist design with a bottom-border only or a very soft, filled background. Focus states are indicated by a change to the Warm Gold accent color.
- **Chips/Badges:** Used for room amenities (e.g., "WiFi," "Spa"). These should have pill-shaped geometry and use low-saturation versions of the primary colors.
- **Glass Header:** A sticky top navigation bar that uses a high-blur frost effect, allowing the colors of the hotel photography to peek through as the user scrolls.
- **Lists:** Clean, edge-to-edge separators using a light neutral color (#E0E0E0), with generous vertical padding (16px) for each list item.