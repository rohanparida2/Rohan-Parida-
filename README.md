# Rohan Parida — Portfolio

A responsive portfolio built with plain HTML, CSS, and vanilla JavaScript. No build step or framework is required.

## Run locally

Because the page loads `content.json` with `fetch`, serve this folder over HTTP instead of opening `index.html` directly. For example, with Python installed:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Edit the content

Update the matching fields in `content.json` to change the name, roles, bio, education, skills, experience, projects, certifications, hackathons, or contact links. The page renders those values directly. Keep the existing JSON structure and valid JSON syntax.

Replace `images/profile-podium-web.jpg` to change the About-section podium photo. The right side of the Know Me hero is intentionally empty.

Use `style.css` to adjust the colors, typography, layout, and motion. The light/dark toggle preference is saved in the browser.

## Deploy

For GitHub Pages, enable Pages in the repository's **Settings → Pages** and choose **GitHub Actions** as the source. The workflow deploys the site on each push to `main`; there is no build command.
