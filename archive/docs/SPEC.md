# MultiMode AI - Website Spec Sheet

> **Source of Truth** for multimodeai.com development

---

## 🎯 Project Overview

| Field | Value |
|-------|-------|
| **Domain** | multimodeai.com |
| **Registrar** | Porkbun |
| **Hosting** | Render |
| **Contact Email** | hud@multimodeai.com |
| **Tech Stack** | Next.js + Tailwind CSS |

---

## 🧭 Brand Positioning

### Tagline Options
- "Your Website, Your Values"
- "Build Your Online Presence - The Halal Way"
- "Ethical Web Development for the Ummah"

### Core Value Proposition
Professional web development, custom software, and AI solutions **without compromising your principles**. A halal, Muslim-owned alternative to Israeli-based vendors (Wix, Squarespace, etc.).

### Target Audience
- Muslim business owners
- Halal-conscious entrepreneurs
- Anyone seeking ethical tech vendors
- Small-to-medium businesses wanting custom solutions

### Tone & Voice
- Professional but approachable
- Straight-to-the-point (no fluff)
- Trustworthy and transparent
- Confident without being salesy

---

## 🎨 Design System

### Color Palette (Hims-inspired minimalism)

| Role | Color | Hex |
|------|-------|-----|
| **Background** | Warm Cream | `#FAF9F6` |
| **Background Alt** | Soft Beige | `#F5F1EB` |
| **Text Primary** | Charcoal | `#1A1A1A` |
| **Text Secondary** | Warm Gray | `#6B6B6B` |
| **Accent** | Sage Green | `#7C9A8E` |
| **Accent Hover** | Deep Sage | `#5F7A6E` |
| **White** | Pure White | `#FFFFFF` |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| **Headings** | Inter / System Sans | 600-700 | 2rem - 4rem |
| **Body** | Inter / System Sans | 400 | 1rem - 1.125rem |
| **Labels** | Inter / System Sans | 500 | 0.875rem |

### Design Principles
- ✅ Generous whitespace
- ✅ Minimalist, clean layouts
- ✅ Lowercase-friendly headings (modern feel)
- ✅ Subtle hover states
- ✅ No clutter - every element has purpose
- ✅ Mobile-first responsive design

---

## 📄 Site Structure

```
multimodeai.com (Single Page)
│
├── 1. HERO
│   ├── Headline
│   ├── Subheadline / tagline
│   └── CTA Button → scrolls to contact
│
├── 2. SERVICES
│   ├── Web Development
│   │   └── Custom websites, e-commerce, portfolios, landing pages
│   ├── Custom Software Solutions
│   │   └── Business tools, automation, integrations, dashboards
│   └── AI Integration
│       └── Chatbots, automation, smart features, AI-powered tools
│
├── 3. WHY CHOOSE US
│   ├── Ethical Alternative (no Wix/Squarespace)
│   ├── Muslim-Owned & Operated
│   ├── Done-For-You Service
│   ├── Modern Tech Stack
│   └── Direct Communication (talk to the developer)
│
├── 4. CONTACT
│   ├── Section headline
│   ├── Email displayed: hud@multimodeai.com
│   └── Simple contact form
│       ├── Name (required)
│       ├── Email (required)
│       ├── Message (required)
│       └── Submit button
│
└── 5. FOOTER
    ├── © 2025 MultiMode AI
    └── Optional: social links
```

---

## 📝 Content Blocks

### Hero Section
```
Headline: "your website, your values."
Subheadline: "halal web development, custom software & AI solutions.
              muslim-owned. no compromises."
CTA: "get in touch"
```

### Services

**Web Development**
> From landing pages to full e-commerce stores. Fast, modern, and built to convert.

**Custom Software**
> Business tools, dashboards, and automation tailored to your exact needs.

**AI Integration**
> Chatbots, smart automation, and AI-powered features to give you an edge.

### Why Choose Us

| Point | Description |
|-------|-------------|
| **Ethical Alternative** | No Wix, Squarespace, or other Israeli-based vendors. Build with a clear conscience. |
| **Muslim-Owned** | Supporting the ummah, one project at a time. |
| **Done-For-You** | No DIY headaches. We handle everything from design to deployment. |
| **Modern Stack** | Fast, secure, SEO-optimized. Built with the latest tech. |
| **Direct Access** | Talk to the developer directly. No support tickets, no runaround. |

### Contact Section
```
Headline: "let's build something together."
Subtext: "drop us a message and we'll get back to you within 24 hours."
Email: hud@multimodeai.com
```

---

## 🛠 Technical Specifications

### Next.js Setup
- **Version:** Latest (15.x)
- **Styling:** Tailwind CSS
- **Deployment:** Render (static export or Node)
- **Form Handling:** Client-side → email service (Formspree, EmailJS, or custom API)

### Project Structure
```
multimode-ai/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── WhyUs.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
│   └── (assets if needed)
├── tailwind.config.ts
├── package.json
└── SPEC.md (this file)
```

### Form Handling Options
1. **Formspree** - Simple, free tier available
2. **EmailJS** - Client-side email sending
3. **Custom API route** - Next.js API + Resend/SendGrid

### Performance Targets
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- No external fonts (use system stack or self-host)
- Minimal JS bundle

---

## ✅ Implementation Checklist

### Phase 1: Project Setup
- [ ] Initialize Next.js project with Tailwind CSS
- [ ] Configure Tailwind with custom color palette
- [ ] Set up project structure (components folder)
- [ ] Create base layout with metadata

### Phase 2: Components
- [ ] Build Hero section
- [ ] Build Services section (3 cards)
- [ ] Build Why Choose Us section
- [ ] Build Contact section with form
- [ ] Build Footer

### Phase 3: Functionality
- [ ] Implement smooth scroll navigation
- [ ] Set up form handling (choose provider)
- [ ] Add form validation
- [ ] Add success/error states for form

### Phase 4: Polish
- [ ] Responsive design check (mobile, tablet, desktop)
- [ ] Add subtle animations/transitions
- [ ] Optimize for performance (images, fonts)
- [ ] Test across browsers

### Phase 5: Deployment
- [ ] Configure Render deployment
- [ ] Connect custom domain (multimodeai.com)
- [ ] Set up SSL
- [ ] Test production build
- [ ] DNS configuration on Porkbun

---

## 🚀 Future Enhancements (Post-Launch)

- [ ] Add portfolio/case studies section
- [ ] Blog for SEO
- [ ] Testimonials section
- [ ] WhatsApp integration
- [ ] Calendly embed for consultations
- [ ] Multi-language support (Arabic?)

---

## 📎 Reference & Inspiration

- **Design:** [Hims.com](https://www.hims.com) - warm minimalist aesthetic
- **Colors:** Cream/beige backgrounds, sage green accents
- **Vibe:** Clean, trustworthy, modern healthcare branding adapted for tech services

---

*Last updated: 2025-11-22*
