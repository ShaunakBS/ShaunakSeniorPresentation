# Slide images

These files are generated from the originals in the top-level `Photos/` folder by `npm run optimize-images`. Edit or replace the originals in `Photos/`, then run that command again. Do not edit these generated files by hand. The originals are never modified or renamed.

The site finds each image by file name (any of .jpg, .jpeg, .png, .webp, .svg, .avif). If a file is missing, the slide shows a dark placeholder with a white label instead of a broken image.

| Generated file | Original in `Photos/` | Slide |
|----------------|----------------------|-------|
| `title-portrait.jpg` | `Shaunak Head Shot.jpeg` | 1 Title (portrait frame) |
| `about-personal.jpg` | `About me Images/Shaunak Personal Photo.jpeg` | 2 About Me, "Personal" |
| `about-family.jpg` | `About me Images/Family.jpeg` | 2 About Me, "Family" |
| `about-friends.jpg` | `About me Images/Friends.jpeg` | 2 About Me, "Friends" |
| `about-tsa.jpg` | `About me Images/TSA.jpeg` | 2 About Me, "TSA" |
| `seal-toronto.jpg` | `school seals/U of T seal.jpg` | 4 Ninth Grade, College Essay |
| `silvias-gymnastics-logo.jpg` | `silvias.jpg` | 6 Service Learning |
| `infovision-logo.png` | `InfoVision Logo.jpg` (blank margin trimmed) | 8 Job Shadow |
| `boyertown-asd-logo.png` | `Experiences/Boyertown ASD logo.png` | 9 Experience (district internship) |
| `techowl-logo.png` | `Experiences/TechOwl Logo.png` (blank margin trimmed) | 9 Experience (Assistive Clothing Tool, TechOwl) |
| `titration-system.webp` | `Experiences/SAPT Image.png` | 9 Experience (SAPT) |
| `seal-ut-austin.png` | `school seals/Large_university-of-texas_seal_rgb(199-91-18).png` | 11 Future Plans (UT Austin) |
| `seal-indiana.png` | `school seals/IUSG-seal.png` (scaled to 900 px, margin trimmed) | 11 Future Plans (Indiana) |
| `seal-penn-state.png` | `school seals/Penn-State-University-Seal-Logo.png` (scaled, margin trimmed) | 11 Future Plans (Penn State) |
| `seal-miami.png` | `school seals/university-of-miami-seal-logo.png` | 11 Future Plans (Miami) |

Where the names are configured (in `src/data/presentation.ts`): `titleContent`, `aboutContent.photos` (also sets the crop with `fit` and `position`), `ninthContent.essaySeal`, `serviceContent.logo`, `jobShadowContent.logo`, `experienceContent` (`web.logo`, `titration.image`), and `futureContent.schools[].seal`. The file-name mapping from `Photos/` is in `scripts/optimize-images.mjs`.

Notes:
* Photos are resized (long side up to 1200 px, 1600 px for the headshot) and saved as high-quality JPEG. Logos and seals keep their exact colors; they are only scaled down and have blank margins trimmed, never cropped or recolored.
* Logos and seals are shown with `object-fit: contain`. Photos use `cover` with a per-photo `position` so faces stay in frame.
* Use real photos only. Do not use generated images or mock certificates.
