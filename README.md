# Rishi Films - Professional Videography Portfolio

A premium, cinematic portfolio website built with Astro, TypeScript, and plain CSS. Designed to showcase videography and video editing work for business owners and brands.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:3000` by default.

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.astro              # Hero section with tagline and CTAs
│   ├── About.astro             # Profile & bio section
│   ├── Services.astro          # Services grid
│   ├── Brands.astro            # Brand collaborations
│   ├── Portfolio.astro         # Main video portfolio section
│   ├── VideoCarousel.astro     # Reusable carousel component
│   ├── Contact.astro           # Contact & CTA section
│   ├── Footer.astro            # Footer with social links
│   └── Navbar.astro            # Sticky navigation bar
├── layouts/
│   └── Layout.astro            # Main page layout with meta tags
├── data/
│   ├── site.json               # Global site config (profile image, contact info)
│   └── videos.json             # All video data (scalable)
├── styles/
│   └── global.css              # Global styles, animations, responsive design
└── pages/
    └── index.astro             # Main page (home)
public/
├── favicon.svg                 # Favicon placeholder
└── logos/                      # Directory for brand logos (can add SVGs here)
```

## 🎬 Adding New Videos

### To add a new video to the portfolio:

1. Open `src/data/videos.json`
2. Find the category you want to add to (e.g., `brands`, `cinematic`, `talking-head`)
3. Add a new object to the `videos` array:

```json
{
  "id": "unique-id",
  "platform": "instagram" | "youtube",
  "url": "https://...",
  "label": "Optional: Brand Name"
}
```

**Example for Instagram:**
```json
{
  "id": "oppo-3",
  "platform": "instagram",
  "url": "https://www.instagram.com/reel/ABC123/?igsh=xyz",
  "label": "Oppo"
}
```

**Example for YouTube:**
```json
{
  "id": "youtube-1",
  "platform": "youtube",
  "url": "https://youtube.com/shorts/ABC123",
  "label": "Optional Label"
}
```

✅ **That's it!** The video will automatically appear in the carousel. No code changes needed.

### To add a new category:

1. Add a new object to the `categories` array in `src/data/videos.json`:

```json
{
  "id": "new-category-id",
  "title": "Category Display Title",
  "videos": [
    { "id": "video-1", "platform": "instagram", "url": "..." }
  ]
}
```

✅ A new carousel section will automatically appear on the portfolio page.

## 🖼️ Updating the Profile Image

The profile image is stored in the global site config:

1. Open `src/data/site.json`
2. Find the `profileImage` URL
3. Replace it with a new URL (can be from Cloudinary, or any image hosting service)
4. No other code changes needed

**Current URL:**
```
https://res.cloudinary.com/dhjj1svoh/image/upload/f_auto,q_auto/v1781944293/IMG_9401_ftdy5j.jpg
```

## ✏️ Updating Contact Information

1. Open `src/data/site.json`
2. Update the `contact` object with new details
3. The site will automatically refresh with new contact info

## 🎨 Customizing Design

### Colors & Accent
Edit the CSS variables in `src/styles/global.css`:

```css
:root {
  --color-dark: #0a0a0a;
  --color-light: #ffffff;
  --color-accent: #d4a574;        /* Gold/Warm Amber */
  --color-text-secondary: #999999;
}
```

### Typography
Fonts are loaded from Google Fonts in `Layout.astro`. Update the `<link>` tags to change fonts.

### Animations
Scroll animations use `IntersectionObserver` in `global.css` and component scripts. Adjust timing and animation values as needed.

## 🔗 Site Sections

1. **Hero** - Main title, tagline, CTAs
2. **About** - Profile photo, bio, credentials
3. **Services** - Service cards grid
4. **Brands** - Brand collaborations display
5. **Portfolio** - Video carousels (multiple categories)
6. **Contact** - Contact info and CTA buttons
7. **Footer** - Copyright and social links

## 📱 Responsive Design

The site is mobile-first and fully responsive:
- **Mobile:** 375px and up
- **Tablet:** 768px and up
- **Desktop:** 1024px and up
- **Large Desktop:** 1440px and up

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Or connect your GitHub repository directly to Netlify/Vercel for automatic deployments.

## 📝 Meta Tags & SEO

Meta tags are defined in `src/layouts/Layout.astro`. Update:
- Site title
- Meta description
- Open Graph image (currently using the profile image)
- Favicon

## 🛠️ Tech Stack

- **Astro 4.x** - Static site generator
- **TypeScript** - Type safety
- **Plain CSS** - Zero runtime overhead, full control
- **IntersectionObserver API** - Scroll animations (vanilla JS, no libraries)
- **HTML5 Embeds** - Instagram & YouTube videos

## ✨ Features

✅ Single-page, scroll-based design
✅ Cinematic, dark, premium aesthetic
✅ Fully responsive (mobile, tablet, desktop)
✅ Smooth scroll animations (no heavy libraries)
✅ Scalable video management (JSON-based)
✅ Instagram & YouTube embed support
✅ Sticky navigation bar
✅ Fast loading with lazy-loaded embeds
✅ SEO-optimized meta tags
✅ High performance (static HTML)
✅ Easy to deploy (Vercel, Netlify, etc.)

## 📞 Support

For questions or issues, refer to:
- [Astro Documentation](https://docs.astro.build)
- [Instagram Embed API](https://developers.facebook.com/docs/instagram/embedding)
- [YouTube Embed API](https://developers.google.com/youtube/iframe_api_reference)

---

**Built with ✨ for Rishi Films**
