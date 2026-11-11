# Prompt for Antigravity

Build a personal portfolio website for Rohan Parida using only HTML, CSS and vanilla JavaScript (no frameworks, no build step). Split it into index.html, style.css and script.js. All content is in content.json in this folder; read it and use it exactly. When done, deploy it (GitHub Pages, Netlify or Vercel, whichever you can do from here) and give me the live URL.

## DESIGN DIRECTION
- Dark-first with a light/dark toggle. One accent color, not a generic template look.
- Mix of trendy styles: bento-grid layout, glassmorphism cards, a slow animated aurora/gradient background, and a soft cursor glow.
- Big expressive typography (Google Fonts: one display font plus one clean sans).
- Subtle, smooth motion only: scroll-reveal via IntersectionObserver, typing effect for the role, magnetic buttons, card tilt on hover, animated skill chips, counting-up numbers, a scroll progress bar, and a staggered intro.
- Respect prefers-reduced-motion. Mobile-first and fully responsive. Accessible: visible focus states, good contrast, alt text, semantic HTML.
- References: [paste links here]. Borrow their motion and layout ideas, don't copy them.
- Keep CSS in clean, modular blocks so the UI can also be recreated in Canva Code.

## IMAGES (in the images/ folder)
- Leave the right side of the KNOW ME section empty; do not add a portrait, chips, badges, glow rings, blobs, or other decoration there.
- images/profile-podium.jpg: use in the ABOUT section (e.g. a tilted card with a caption like "Presenting at Sapthagiri NPS University").
- Compress and resize the podium photo for web (max ~1200px), use object-fit: cover, set alt text, and lazy-load it.

## NAV
Sticky glass navbar with smooth scroll and active-section highlight: Know Me, About, Skills, Experience, Projects, Certifications, Hackathons, Contact. Hamburger menu on mobile.

## SECTIONS (all text from content.json)
1. KNOW ME (opening section): name, typing roles, tagline, and intentionally empty space on the right. Buttons: View Projects, Contact Me. Social icons: GitHub, LinkedIn, Instagram, Email.
2. ABOUT: about text, podium image, animated stat counters.
3. EDUCATION: university card with the SGPA/CGPA.
4. SKILLS: one card per group, animated chips.
5. EXPERIENCE: animated vertical timeline.
6. PROJECTS: large cards with hover reveal, tech tags, GitHub button, and a "More coming soon" card.
7. CERTIFICATIONS: badge grid grouped by issuer.
8. HACKATHONS: stacked or horizontal-scroll cards.
9. CONTACT: heading "Let's connect", mailto link plus copy-to-clipboard button, LinkedIn, GitHub, Instagram, simple form that opens a mailto draft. Footer with copyright and back-to-top.

## TECH AND QUALITY
- Meta tags, favicon, Open Graph tags (use the podium photo as the preview image).
- No heavy libraries, optimized assets, lazy-loaded media. High Lighthouse scores.
- Test at 360px, 768px and 1440px. No horizontal scroll.
- Finish with the live URL and a short README on how to edit content.
