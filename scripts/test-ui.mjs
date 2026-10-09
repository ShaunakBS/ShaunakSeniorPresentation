// Functional UI checks against a running server. Usage: node scripts/test-ui.mjs [baseUrl]
import { chromium } from 'playwright-core';

const base = process.argv[2] || 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ channel: 'msedge' });
let failed = 0;
const check = (name, ok, extra = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} ${extra}`); if (!ok) failed++; };
const errors = [];
const failedReqs = [];
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));
page.on('requestfailed', (r) => failedReqs.push('failed ' + r.url()));
page.on('response', (r) => { if (r.status() >= 400) failedReqs.push(r.status() + ' ' + r.url()); });
const hash = () => page.evaluate(() => location.hash);
const text = () => page.evaluate(() => document.querySelector('.stage')?.innerText || '');

await page.goto(base);
await page.waitForTimeout(300);
// No intro: title slide is present immediately
check('no intro button/overlay', await page.getByRole('button', { name: 'Skip intro' }).count() === 0);
check('title slide visible immediately', (await text()).includes('Shaunak'));
check('default hash is #/slide/1', (await hash()) === '#/slide/1', await hash());

// Title slide data
const t = await text();
for (const s of ['Shaunak', 'Bangalore', 'Shashikanth', 'Senior Presentation', 'Student ID: 301597', 'Homeroom: 1236'])
  check(`title contains "${s}"`, t.includes(s));
check('no phone/email on title', !/@|\(862\)|239-5666/.test(t));

// Keyboard
const press = async (k) => { await page.keyboard.press(k); await page.waitForTimeout(500); };
await press('ArrowRight'); check('ArrowRight -> 2', (await hash()) === '#/slide/2');
await press(' ');          check('Space -> 3', (await hash()) === '#/slide/3');
await press('PageDown');   check('PageDown -> 4', (await hash()) === '#/slide/4');
await press('PageUp');     check('PageUp -> 3', (await hash()) === '#/slide/3');
await press('ArrowLeft');  check('ArrowLeft -> 2', (await hash()) === '#/slide/2');
await press('End');        check('End -> 12', (await hash()) === '#/slide/12');
await press('ArrowRight'); check('ArrowRight at end stays 12', (await hash()) === '#/slide/12');
await press('Home');       check('Home -> 1', (await hash()) === '#/slide/1');
await press('ArrowLeft');  check('ArrowLeft at start stays 1', (await hash()) === '#/slide/1');

// Walk all slides forward by keyboard and verify heading text for each
const expected = ['Shashikanth', 'About Me', 'Resume', 'Ninth Grade', 'Tenth Grade', 'Service Learning', 'Eleventh Grade', 'Job Shadow', 'Experience', 'Personal Reflection', 'Future Plans', 'Thank You'];
let walk = true;
for (let i = 0; i < 12; i++) {
  const tx = await text();
  if (!tx.includes(expected[i])) { walk = false; console.log('  slide', i + 1, 'missing', expected[i]); }
  if (i < 11) await press('ArrowRight');
}
check('all 12 slides reachable in order with correct headings', walk);

// Deep link + refresh
await page.goto(base + '#/slide/8'); await page.reload(); await page.waitForTimeout(1200);
check('deep link #/slide/8 survives refresh', (await hash()) === '#/slide/8' && (await text()).includes('InfoVision'));
await page.goto(base + '#/slide/99'); await page.reload(); await page.waitForTimeout(1200);
check('out-of-range slide clamps to 12', (await hash()) === '#/slide/12');

// Slide index overlay + Escape
await page.goto(base + '#/slide/5'); await page.reload(); await page.waitForTimeout(1200);
await press('g');
check('index opens with G', await page.getByRole('dialog', { name: 'Slide index' }).count() === 1);
await press('ArrowRight');
check('arrow keys ignored while index open', (await hash()) === '#/slide/5');
await page.getByRole('button', { name: /Job Shadow/ }).click(); await page.waitForTimeout(500);
check('index click jumps to slide 8', (await hash()) === '#/slide/8');
check('index closed after selecting', await page.getByRole('dialog', { name: 'Slide index' }).count() === 0);
await press('g'); await press('Escape');
check('Escape closes index', await page.getByRole('dialog', { name: 'Slide index' }).count() === 0);

// Notes hidden by default, N toggles
check('notes hidden by default', await page.getByLabel('Speaker notes (private)').count() === 0);
await press('n');
check('N opens notes', await page.getByLabel('Speaker notes (private)').count() === 1);
check('notes show job-shadow placeholder', (await page.getByLabel('Speaker notes (private)').innerText()).includes('CONFIRM'));
await press('Escape');
check('Escape closes notes', await page.getByLabel('Speaker notes (private)').count() === 0);

// Resume expand / Escape
await page.goto(base + '#/slide/3'); await page.reload(); await page.waitForTimeout(1200);
await page.getByRole('button', { name: 'Expand resume' }).click(); await page.waitForTimeout(300);
check('resume modal opens', await page.getByRole('dialog', { name: 'Resume' }).count() === 1);
await press('ArrowRight');
check('slide does not change while resume open', (await hash()) === '#/slide/3');
await press('Escape');
check('Escape closes resume', await page.getByRole('dialog', { name: 'Resume' }).count() === 0);
const imgOk = await page.evaluate(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
check('all images loaded', imgOk);

// On-screen next/prev buttons
await page.mouse.move(900, 900);
await page.getByRole('button', { name: 'Next slide' }).click(); await page.waitForTimeout(400);
check('on-screen Next works', (await hash()) === '#/slide/4');
await page.getByRole('button', { name: 'Previous slide' }).click(); await page.waitForTimeout(400);
check('on-screen Previous works', (await hash()) === '#/slide/3');

// Presenter window syncs
const pres = await ctx.newPage();
await pres.goto(base + '#/presenter'); await pres.waitForTimeout(800);
check('presenter shows notes for current slide', (await pres.innerText('body')).includes('Resume'));
await pres.keyboard.press('ArrowRight'); await page.waitForTimeout(800);
check('presenter advances main window', (await hash()) === '#/slide/4', await hash());
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800);
check('main advances presenter', (await pres.innerText('body')).includes('5. Tenth Grade'));

// Print view
const pp = await ctx.newPage();
await pp.goto(base + '#/print'); await pp.waitForTimeout(800);
check('print view has 12 pages', (await pp.locator('.print-page').count()) === 12);
check('print view has no notes/CONFIRM text', !(await pp.innerText('body')).includes('CONFIRM'));

// Reduced motion
const rm = await browser.newContext({ viewport: { width: 1920, height: 1080 }, reducedMotion: 'reduce' });
const rp = await rm.newPage(); await rp.goto(base + '#/slide/2'); await rp.waitForTimeout(1200);
check('reduced motion renders slide', (await rp.evaluate(() => document.querySelector('.stage').innerText)).includes('About Me'));

// Theme: black background, white text (bring the main tab to the front: animation frames and fullscreen only run in a visible tab)
await page.bringToFront();
const theme = await page.evaluate(() => ({ bg: getComputedStyle(document.body).backgroundColor, fg: getComputedStyle(document.body).color }));
check('theme background is #080808', theme.bg === 'rgb(8, 8, 8)', theme.bg);
check('theme text is white', theme.fg === 'rgb(255, 255, 255)', theme.fg);

// About Me content
await page.goto(base + '#/slide/2'); await page.reload(); await page.waitForTimeout(1200);
const about = await text();
check('About Me has Family and Friends label', about.includes('Family and Friends'));
for (const bad of ['Engineering Projects', 'Skills', 'Certifications', 'Titration', 'Assistive'])
  check(`About Me does not contain "${bad}"`, !about.includes(bad));
for (const good of ['Saint Elizabeth', 'Knollwood Elementary', 'Central Middle School', 'Middle School East', 'Boyertown Area Senior High School', 'GovSTEM', 'Tech Bowl', 'Structural Engineering', 'Engineering Design', 'STEM Mass', 'Digital Video', 'Photographic', 'DECA', 'Student Advisory Board', 'Strategic Planning', 'District Website Intern'])
  check(`About Me contains "${good}"`, about.includes(good));

// Resume: unmodified
await page.goto(base + '#/slide/3'); await page.reload(); await page.waitForTimeout(1200);
const resumeInfo = await page.evaluate(() => { const i = document.querySelector('.stage img'); const cs = getComputedStyle(i); return { filter: cs.filter, opacity: cs.opacity, w: i.naturalWidth }; });
check('resume preview has no filter/opacity effect', resumeInfo.filter === 'none' && resumeInfo.opacity === '1', JSON.stringify(resumeInfo));
check('resume image is high resolution', resumeInfo.w >= 1700, String(resumeInfo.w));

// Experience still has engineering projects
await page.goto(base + '#/slide/9'); await page.reload(); await page.waitForTimeout(1200);
const exp = await text();
check('Experience keeps Automated Titration System', exp.includes('Automated Titration System'));
check('Experience keeps Assistive Clothing Tool', exp.includes('Assistive Clothing Tool'));

// Future Plans
await page.goto(base + '#/slide/11'); await page.reload(); await page.waitForTimeout(1200);
const fut = await text();
for (const n of ['Future Plans', 'The University of Texas at Austin', 'McCombs School of Business', 'Indiana University Bloomington', 'Kelley School of Business', 'The Pennsylvania State University', 'Smeal College of Business', 'University of Miami', 'Miami Herbert Business School', 'Nittany Lion Fund', 'Category 5 Student Managed Investment Fund', 'Investment Banking Workshop'])
  check(`Future Plans contains "${n}"`, fut.includes(n));
check('Future Plans has no "Where Finance and Technology Meet"', !/where finance and technology meet/i.test(fut));
check('Future Plans does not mention Toronto', !fut.includes('Toronto'));
check('Future Plans has no deadline clutter', !/deadline|November|December/i.test(fut));
const overflow = await page.evaluate(() => { const st = document.querySelector('.stage').getBoundingClientRect(); return [...document.querySelectorAll('.stage *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.right > st.right + 1 || r.bottom > st.bottom + 1); }).length; });
check('Future Plans fits in viewport', overflow === 0, String(overflow));

// Final slide stability: sample every element each frame after navigating in from slide 11
await page.goto(base + '#/slide/11'); await page.reload(); await page.waitForTimeout(1200);
await page.evaluate(() => {
  window.__seen = {};
  const t0 = performance.now();
  const tick = () => {
    document.querySelectorAll('.stage h1, .stage p').forEach((el) => {
      const key = (el.textContent || '').slice(0, 14);
      const r = el.getBoundingClientRect();
      const rec = window.__seen[key] || { ys: [], hiddenFrames: 0 };
      const y = Math.round(r.top);
      if (!rec.ys.includes(y) && Number(getComputedStyle(el.closest('section') || el).opacity) >= 0) rec.ys.push(y);
      window.__seen[key] = rec;
    });
    if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(2800);
const seen = await page.evaluate(() => window.__seen);
const nameRec = Object.entries(seen).find(([k]) => k.startsWith('Shaunak Bangal'));
check('Thank You: name line is always at one bottom position (never mid-slide)', !!nameRec && nameRec[1].ys.length === 1 && nameRec[1].ys[0] > 900, JSON.stringify(nameRec));
await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(700);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1500);
const again = await page.evaluate(() => { const el = [...document.querySelectorAll('.stage p')].find((e) => e.textContent.includes('Shaunak')); return Math.round(el.getBoundingClientRect().top); });
check('Thank You: re-entering keeps name line at bottom', again > 900, String(again));
await page.goto(base + '#/slide/12'); await page.reload(); await page.waitForTimeout(800);
check('Thank You: direct refresh shows slide text only', (await text()).replace(/\s+/g, ' ').trim() === 'Thank You Questions? Shaunak Bangalore Shashikanth', (await text()).replace(/\s+/g, ' ').trim());
await page.mouse.click(960, 300); await page.keyboard.press('f'); await page.waitForTimeout(700);
check('fullscreen toggles on with F', await page.evaluate(() => !!document.fullscreenElement));
check('Thank You: still correct in fullscreen', (await text()).replace(/\s+/g, ' ').trim() === 'Thank You Questions? Shaunak Bangalore Shashikanth');
await page.keyboard.press('f'); await page.waitForTimeout(400);

// ---- Design and content refinements ----
await page.bringToFront();
// Title slide: portrait placeholder
await page.goto(base + '#/slide/1'); await page.reload(); await page.waitForTimeout(1200);
const tTitle = await text();
const portrait = await page.evaluate(() => { const f = document.querySelector('.stage figure'); const r = f.getBoundingClientRect(); const st = document.querySelector('.stage').getBoundingClientRect(); const sc = st.width / 1920; return { w: r.width / sc, h: r.height / sc, left: (r.left - st.left) / sc, right: (r.right - st.left) / sc, bottom: (r.bottom - st.top) / sc, top: (r.top - st.top) / sc }; });
check('Title: portrait is 4:5', Math.abs(portrait.w / portrait.h - 0.8) < 0.01, `${portrait.w.toFixed(0)}x${portrait.h.toFixed(0)}`);
check('Title: portrait fills the right 45% edge to edge', Math.abs(portrait.left - 1056) < 2 && Math.abs(portrait.right - 1920) < 2, `${portrait.left.toFixed(0)}-${portrait.right.toFixed(0)}`);
check('Title: portrait is full height', portrait.top < 2 && Math.abs(portrait.bottom - 1080) < 2, `${portrait.top.toFixed(0)}-${portrait.bottom.toFixed(0)}`);
check('Title: portrait has no decorative border', await page.evaluate(() => getComputedStyle(document.querySelector('.stage figure')).borderTopWidth === '0px'));
for (const s of ['Shaunak', 'Senior Presentation', 'Student ID: 301597', 'Homeroom: 1236'])
  check(`Title still has "${s}"`, tTitle.includes(s));

// Experience: SAPT facts
await page.goto(base + '#/slide/9'); await page.reload(); await page.waitForTimeout(1200);
const exp2 = await text();
check('Experience: title is "Automated Titration System (SAPT)"', exp2.includes('Automated Titration System (SAPT)'));
check('Experience: 60+ pages of engineering documentation', exp2.includes('60+ pages of engineering documentation'));
check('Experience: 3D-printed prototype', exp2.includes('3D-printed prototype'));
check('Experience: custom wooden display', exp2.includes('Custom wooden display'));
check('Experience: National TSA Qualifier', exp2.includes('National TSA Qualifier'));
check('Experience: no "41"', !/\b41\b/.test(exp2));
check('Experience: no wood/plexiglass prototype claim', !/plexiglass|wooden prototype|wood prototype/i.test(exp2));
check('Experience: Assistive Clothing Tool unchanged', exp2.includes('Assistive Clothing Tool') && exp2.includes('TechOwl / Temple University'));

// Personal Reflection order
await page.goto(base + '#/slide/10'); await page.reload(); await page.waitForTimeout(1500);
const refl = await text();
const order = ['7TH GRADE', 'CHEF', '8TH GRADE', 'CARDIOLOGIST', '9TH GRADE', 'CORPORATE LAW'];
const up = refl.toUpperCase();
let last = -1, inOrder = true;
for (const k of order) { const i = up.indexOf(k, last + 1); if (i < 0 || i < last) inOrder = false; last = i; }
check('Reflection: 7th Chef, 8th Cardiologist, 9th Corporate Law in order', inOrder);
const later = up.indexOf('ENGINEERING', last);
check('Reflection: later interests follow (Engineering, Software Development, Finance and AI, Entrepreneurship)', later > last && up.indexOf('SOFTWARE DEVELOPMENT') > later && up.indexOf('FINANCE AND AI') > later && up.indexOf('ENTREPRENEURSHIP') > up.indexOf('FINANCE AND AI'));
check('Reflection: Earlier / Later phase headers', up.includes('EARLIER INTERESTS') && up.includes('LATER INTERESTS'));
const rightEdge = await page.evaluate(() => { const st = document.querySelector('.stage').getBoundingClientRect(); const sc = st.width / 1920; return Math.max(...[...document.querySelectorAll('.stage h2, .stage p, .stage div')].filter((e) => e.children.length === 0 && e.textContent.trim()).map((e) => (e.getBoundingClientRect().right - st.left) / sc)); });
check('Reflection: no text past the right margin', rightEdge <= 1850, rightEdge.toFixed(0));

// Future Plans seals and Common App wording
await page.goto(base + '#/slide/11'); await page.reload(); await page.waitForTimeout(1200);
const fut2 = await text();
check('Future Plans: Common App x4 and Apply IU/MyPennState kept', (fut2.match(/Common App/g) || []).length === 4 && fut2.includes('Apply IU') && fut2.includes('MyPennState'));
const futOverflow = await page.evaluate(() => { const st = document.querySelector('.stage').getBoundingClientRect(); return [...document.querySelectorAll('.stage *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.right > st.right + 1 || r.bottom > st.bottom + 1); }).length; });
check('Future Plans: no overflow', futOverflow === 0);

// "Common Application" appears nowhere in visible slide text
let anyCommonApplication = false;
for (let i = 1; i <= 12; i++) { await page.goto(base + `#/slide/${i}`); await page.reload(); await page.waitForTimeout(500); if (/Common Application/i.test(await text())) anyCommonApplication = true; }
check('No visible "Common Application" on any slide', !anyCommonApplication);

// ---- Image integration and internship corrections ----
await page.bringToFront();
const imgReport = () => page.evaluate(() => [...document.querySelectorAll('.stage img')].map((i) => ({
  file: (i.currentSrc.split('/').pop() || '').replace(/-[A-Za-z0-9_]{6,10}(\.[a-z0-9]+)$/i, '$1'),
  ok: i.complete && i.naturalWidth > 0,
  fit: getComputedStyle(i).objectFit,
  nat: i.naturalWidth / i.naturalHeight,
  w: i.getBoundingClientRect().width, h: i.getBoundingClientRect().height,
  alt: i.alt,
})));
const expectImgs = async (slide, names, fitByName = {}) => {
  await page.goto(base + `#/slide/${slide}`); await page.reload(); await page.waitForTimeout(1200);
  const imgs = await imgReport();
  for (const n of names) {
    const im = imgs.find((i) => i.file.startsWith(n));
    check(`Slide ${slide}: ${n} is displayed and loaded`, !!im && im.ok, im ? `${im.file} ${im.w.toFixed(0)}x${im.h.toFixed(0)}` : 'not found');
    if (im) {
      check(`Slide ${slide}: ${n} has alt text`, im.alt.length > 5, im.alt);
      check(`Slide ${slide}: ${n} uses object-fit ${fitByName[n] || 'cover'}`, im.fit === (fitByName[n] || 'cover'), im.fit);
    }
  }
  check(`Slide ${slide}: no broken images and no placeholders`, imgs.every((i) => i.ok) && (await page.locator('.stage [role="img"]').count()) === 0);
  return imgs;
};
await expectImgs(1, ['title-portrait']);
const tImg = (await imgReport())[0];
check('Title: headshot is not distorted (4:5 frame, cover)', Math.abs(tImg.w / tImg.h - 0.8) < 0.01 && tImg.fit === 'cover', `${tImg.w.toFixed(0)}x${tImg.h.toFixed(0)}`);
check('Title: placeholder label removed once photo loads', !(await text()).includes('Portrait Photo'));
const aboutImgs = await expectImgs(2, ['about-personal', 'about-family', 'about-friends', 'about-tsa']);
const aboutText = await text();
check('About Me: captions Personal, Family, Friends, TSA', ['Personal', 'Family', 'Friends', 'TSA'].every((c) => aboutText.includes(c)));
check('About Me: four photos share one frame size', new Set(aboutImgs.map((i) => `${Math.round(i.w)}x${Math.round(i.h)}`)).size === 1);
await expectImgs(4, ['seal-toronto'], { 'seal-toronto': 'contain' });
check('Ninth Grade: seal sits in the College essay section', await page.evaluate(() => { const sec = document.querySelector('[data-section="college-essay"]'); return !!sec && !!sec.querySelector('img'); }));
await expectImgs(6, ['silvias-gymnastics-logo'], { 'silvias-gymnastics-logo': 'contain' });
await expectImgs(8, ['infovision-logo'], { 'infovision-logo': 'contain' });
await expectImgs(9, ['boyertown-asd-logo', 'titration-system'], { 'boyertown-asd-logo': 'contain', 'titration-system': 'contain' });
const futImgs = await expectImgs(11, ['seal-ut-austin', 'seal-indiana', 'seal-penn-state', 'seal-miami'], { 'seal-ut-austin': 'contain', 'seal-indiana': 'contain', 'seal-penn-state': 'contain', 'seal-miami': 'contain' });
const sealByCard = await page.evaluate(() => [...document.querySelectorAll('.stage h2')].map((h) => ({ uni: h.textContent, seal: h.closest('[data-school]').querySelector('img')?.currentSrc.split('/').pop() })));
const want = { 'The University of Texas at Austin': 'seal-ut-austin', 'Indiana University Bloomington': 'seal-indiana', 'The Pennsylvania State University': 'seal-penn-state', 'University of Miami': 'seal-miami' };
for (const [uni, f] of Object.entries(want)) check(`Future Plans: ${uni} uses ${f}`, (sealByCard.find((c) => c.uni === uni)?.seal || '').startsWith(f), JSON.stringify(sealByCard.find((c) => c.uni === uni)));
check('Future Plans: seals are the same size', new Set(futImgs.map((i) => `${Math.round(i.w)}x${Math.round(i.h)}`)).size === 1);
check('Future Plans: Toronto seal not used', !futImgs.some((i) => i.file.startsWith('seal-toronto')));

// Internship corrections: no Webmaster / redesign / 2,000 anywhere visible
let bad = [];
for (let i = 1; i <= 12; i++) { await page.goto(base + `#/slide/${i}`); await page.reload(); await page.waitForTimeout(450); const t = await text(); for (const w of ['Webmaster', 'webmaster', '2,000', 'edesign', 'overhaul']) if (t.includes(w)) bad.push(`slide ${i}: ${w}`); }
check('No "Webmaster", "2,000", or redesign claims on any slide', bad.length === 0, bad.join(', '));
await page.goto(base + '#/slide/9'); await page.reload(); await page.waitForTimeout(1200);
const e3 = await text();
check('Experience: "District Website Intern"', e3.includes('District Website Intern'));
check('Experience: 6,000+ students', e3.includes('6,000+ students'));
check('Experience: maintain/update, additions, communications specialist', e3.includes('Maintain and update the district website') && e3.includes('Make additions and improvements to existing pages') && e3.includes('Work with the district communications specialist'));

// All requests for images succeeded (no 404s)
check('no failed or 404 requests during image tests', failedReqs.length === 0, failedReqs.join(' | '));

check('no console errors', errors.length === 0, errors.join(' | '));

await browser.close();
console.log(failed ? `\n${failed} CHECK(S) FAILED` : '\nALL CHECKS PASSED');
process.exit(failed ? 1 : 0);
