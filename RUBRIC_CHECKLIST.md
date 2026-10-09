# Rubric Checklist (2025-2026 Senior Portfolio Presentation Score Sheet)

Goal: 36/36. Passing is 27 or higher. Items marked **Delivery** depend on how you present and cannot be earned by the website.

## Nine graded criteria

| # | Criterion | Where it is handled | Status |
|---|-----------|---------------------|--------|
| 1 | Fluency, no repetition or silence | Speaker notes in `src/data/speakerNotes.ts`, `REHEARSAL.md` (about 1,300 spoken words, target 8:30), presenter timer (P) | **Delivery.** Rehearse aloud at least twice. |
| 2 | Professional demeanor, dress, audience engagement | Clean, readable slides at 1920x1080 | **Delivery.** Not claimed. |
| 3 | 8-10 minutes | Per-slide targets add up to 8:30 (`slideMeta` in `src/data/presentation.ts`). Presenter view shows an elapsed timer and pace. | Script is written for 8:30. **The actual time depends on you. Time a full run, and fill in the [CONFIRM] sections first, since they add time.** |
| 4 | Spelling and grammar | Names checked below. Site text was proofread. | Do one last read-through. Run a spell check on any text you add. |
| 5 | High-quality visual aids | 12 designed slides, real resume image, photo slots | Real photos, logos, and seals are used on slides 1, 2, 4, 6, 8, 9 and 11 (see `src/assets/images/README.md`). Only the optional website screenshot is not included. |
| 6 | Resume current, thorough, professional | Slide 3, full resume image with Expand button | Done. The original resume is shown unmodified (contact details included). |
| 7 | All six components | See next table | Done |
| 8 | Job shadow thorough, connects to goals | Slide 8 | **Needs your input.** Only the placement and profession are confirmed. See below. |
| 9 | Service learning thorough, with lessons | Slide 6 | Duties and hours are documented. The "what I learned" wording is a draft for you to verify. |

## Six required components

| Component | Slide |
|-----------|-------|
| Resume | 3 (also summarized on 2, About Me) |
| College essay | 4 (Ninth Grade) |
| Smart Futures activities and skills | 4 (ninth grade: Think Like an Entrepreneur, Dive Into Career Clusters) and 5 (tenth grade: Using Email, Create a Personal Budget) |
| EverFi | 7 (Eleventh Grade) |
| Job shadow | 8 |
| Service learning project | 6 |

## Verification performed

| Check | Result |
|-------|--------|
| Title slide shows name, "Senior Presentation", "Student ID: 301597", "Homeroom: 1236" | Automated test passed (`scripts/test-ui.mjs`) |
| School progression exact (Saint Elizabeth's NJ 1st; Knollwood Elementary NJ 2nd-5th; Central Middle School NJ 6th; Middle School East 7th-8th; Boyertown Area Senior High School 9th-12th) | Matches your list in `aboutContent` |
| Resume accomplishments on About Me | Leadership roles, all competition awards (GovSTEM, TSA Tech Bowl, Structural Engineering, Engineering Design, STEM Mass, Digital Video, Photographic Technology), the Kukkiwon black belt, and activities are on slide 2. Engineering projects, skills, and certifications were removed from About Me at your request; they remain on slide 9 (projects) and in the resume (slide 3). Source: `src/data/accomplishments.ts`. |
| Spelling of names | Kukkiwon, TechOwl, GovSTEM PA, EverFi, InfoVision, Silvia's Gymnastics, The University of Texas at Austin (McCombs School of Business), Indiana University Bloomington (Kelley School of Business), The Pennsylvania State University (Smeal College of Business), University of Miami (Miami Herbert Business School), University of Toronto match your text. Admissions details are in `ADMISSIONS_RESEARCH.md`. Spellings of "Silvia's" and "Silvia Mitova" match the service application. |
| University of Toronto | Only on the ninth grade essay. Not on the future plans shortlist. |
| No admission claims | Slide 11 shows four business schools as schools you are considering. Notes say you have not been admitted anywhere. |
| No invented job shadow details | Slide 8 shows only the placement, profession, and a clearly general accounting-to-finance connection. |

## Facts to confirm before presenting

1. **Job shadow (slide 8).** Nothing was supplied about what you saw or did at InfoVision. The slide and notes contain no invented details. The rubric asks for a *thorough* explanation connecting to your goals, so add your own account in the notes (search for `CONFIRM BEFORE PRESENTING`) and, if you want, on the slide (`jobShadowContent` in `src/data/presentation.ts`).
2. **Service learning reflection (slide 6).** "I saw how much coordination happens behind the scenes..." is draft wording from your instructions. Edit it to match what you actually took away.
3. **Service hours breakdown (slide 6).** Taken from your signed Documentation Log: floor music 4, gift stand 5, "Windup" 1 (handwritten). Confirm the reading. The log does not mention setup and cleanup tasks separately; the application describes helping set up and dismantle equipment. The duty list follows your instructions.
4. **Family and Friends (slide 2).** Wording is intentionally generic. Add a broad sentence in the notes if you want.
5. **Ninth grade essay (slide 4).** The reflection quote is based on your suggested wording. The notes include a [CONFIRM] for a specific memory.
6. **Personal reflection (slide 10).** Wording uses your description (gradual change, AI tools to explore ideas and learn, enjoying AI-assisted development tools). Strengths and needs sentences in the notes are drafts.
7. **EverFi (slide 7).** "Savings accounts" and "checking accounts" notes under each topic are short generic descriptions ("How saving works", "Everyday money management"). Edit if you want something more specific.
8. **Experience (slide 9).** The district internship now reads "District Website Intern", with maintain/update, additions to existing pages, public-facing resources, communications specialist, and "The district serves 6,000+ students" (your corrections). The resume PDF still says "Webmaster", "Redesign", "9 schools", and "over 2,000"; update it so it matches the slide. The SAPT details (3D-printed prototype, wooden display, 60+ pages of documentation) come from you. Note the resume PDF still says "41-page" and "wood and plexiglass prototype"; update the resume if you want it to match.
9. **Resume contact details.** At your request the resume image is an unmodified render of your PDF, so your phone number, email, and town are visible on slide 3 and in the PDF export. If you deploy to GitHub Pages, they will be public.
10. **Resume vs. outline.** The school outline says Smart Futures Activities 1-16 and Skills (Internet Basics, Using Email, etc.) should be discussed along with how the components influenced your choices (class selection, job shadow, part-time work). The notes cover this lightly; consider adding one sentence in the notes about any course choices influenced by the portfolio process.
11. **Student Advisory Board / committee wording.** Taken directly from the resume.
12. **Future Plans bullets.** The reasons shown for each school are proposed reasons that match your interests. They do not claim you have taken part in those programs. Several are selective (see `ADMISSIONS_RESEARCH.md`).
13. **Timing.** Total spoken script is about 1,300 words, which is about 8.7 minutes at 150 words per minute before placeholders. Time yourself.

## Reference files used

* Rubric: `2025-2026SeniorPortfolioRubric.pdf` (read).
* Resume: `Shaunak_Senior_Presentation_Resume_Updated.pdf` (read, rendered to image).
* Example presentations: `Copy of GM Senior Presentation.pdf` and `Copy of Senior Presentation E.James .pdf` (read; both follow the same order: About Me, Resume, 9th/10th grade items, service, 11th grade, job shadow, reflection, future plans, thank you).
* `Seniorportfoliooutline26-27ADA.docx` (read; requires 8-10 minutes, resume on a slide, essay, service hours, job shadow, financial literacy, reflection, laptop).
* `b0m2px6bvy7s.pdf` (a scan of your service learning application and documentation log; used for the hours breakdown and project description. Supervisor contact details and signatures are not used).
* The file names in your prompt had "(1)" suffixes; the files in `Reference Materials/` had no suffix and were used.
