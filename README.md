# Senior Presentation: Shaunak Bangalore Shashikanth

Interactive 12-slide presentation website (React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide). Red, black, and white theme.
Designed for a 16:9 projector at 1920x1080. It scales to any window size and needs no backend, API keys, or internet at presentation time.

## Quick start

```bash
npm install          # 1. install dependencies (needs internet once)
npm run dev          # 2. run locally -> http://127.0.0.1:5173/
npm run build        # 3. type-check + production build into dist/
npm run preview      #    serve the production build -> http://127.0.0.1:4173/
```

## Controls

| Key | Action |
|-----|--------|
| Right arrow, Space, Page Down | Next slide |
| Left arrow, Page Up | Previous slide |
| Home / End | First / last slide |
| Esc | Close overlays (index, notes, resume) |
| G | Slide index (also clickable `3 / 12` counter) |
| F | Fullscreen |
| N | Private speaker notes panel (hidden by default) |
| P | Presenter window (notes, timer, next slide) |

Direct links: `#/slide/4` opens slide 4. The toolbar fades out when the mouse is idle.

**Presenting with notes:** open the site on your laptop, press **P** to open the presenter window, drag the main window to the projector and press **F**. The two windows stay in sync. Notes never appear on the projected window unless you press N there.

## Editing content

* All slide text: `src/data/presentation.ts`
* Resume-based accomplishments on About Me: `src/data/accomplishments.ts`
* Speaker notes and timings: `src/data/speakerNotes.ts`
* Rehearsal script (private, regenerate after editing notes): `npm run rehearsal` creates `REHEARSAL.md`
* Theme colors: `src/styles/theme.css` (one place for the whole palette)
* Photos, logos, and seals: put or replace originals in `Photos/`, then run `npm run optimize-images`. It writes web-optimized copies into `src/assets/images/` (see the table in `src/assets/images/README.md` for which file goes on which slide). Photo crops are set in `aboutContent.photos` and `titleContent` in `src/data/presentation.ts` (`fit` and `position`). `Photos/` is listed in `.gitignore`, so your full-size originals stay on your computer; the optimized copies are committed and deployed.
* School details on Future Plans: `futureContent` in `src/data/presentation.ts`. Admissions research is in `ADMISSIONS_RESEARCH.md`.
* Resume image: `public/resume/resume.png` is an unmodified render of the original PDF in `Reference Materials/` (`npm run render-resume`). It shows the contact details on the resume exactly as in the PDF, so they are public if you deploy to GitHub Pages.

## Offline backups (use these if the internet or GitHub fails)

**Backup A: local website (no internet).** Double-click `Start-Presentation.bat`. It builds once if needed, starts a tiny local server, and opens `http://127.0.0.1:4173/`. Requires Node.js on the laptop. Test it at home on the day before.

**Backup B: PDF.**

```bash
npm run build
npm run export-pdf   # -> exports/Shaunak_Senior_Presentation.pdf (12 pages, 16:9, no notes)
```

Uses Microsoft Edge (already on Windows) through `playwright-core`. Set `PDF_BROWSER=chrome` to use Chrome. You can also open `#/print` in the site and use the browser's Print > Save as PDF (paper size: custom 1920x1080, margins none, background graphics on). Copy the PDF to a USB drive and to OneDrive.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds with the base path `/<repository-name>/`, read automatically from GitHub. Nothing is hardcoded. Asset URLs are relative and slide navigation uses the URL hash, so it works under a repository subpath.

1. Create an empty repository on github.com (for example `senior-presentation`). Do not add a README.
2. In this folder:

```bash
git init
git add .
git commit -m "Senior presentation site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

3. On GitHub: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish (about 1-2 minutes). Re-run it if the first run started before Pages was enabled.
5. Your site is at `https://USERNAME.github.io/REPOSITORY/`.
6. Test: open the URL, press Right arrow through all 12 slides, open `.../#/slide/8` directly and refresh, and open the resume with "Expand resume".

Notes:
* Git/GitHub login was not set up by this project. You need to sign in yourself when you push.
* A GitHub Pages site is public, and the resume image on slide 3 includes the phone number, email, and town printed on your resume. The speaker notes are hidden in the interface but are part of the site's code. Keep `REHEARSAL.md` out of the repository (it is already in `.gitignore`).
* To build for a different path locally: `VITE_BASE=/my-repo/ npm run build`.

## Other scripts

| Command | Purpose |
|---------|---------|
| `npm run typecheck` | TypeScript check |
| `npm run screenshots` | Screenshot every slide (needs `npm run preview` running; args: baseUrl width height) |
| `node scripts/test-ui.mjs` | Functional UI checks (navigation, overlays, deep links, presenter sync) |

See `RUBRIC_CHECKLIST.md` for the rubric mapping and the list of facts you need to confirm before presenting.
