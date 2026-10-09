// Central, editable slide content. Change wording here; slide components only handle layout.
// Items marked CONFIRM are described in RUBRIC_CHECKLIST.md and need the presenter's review.

export const student = {
  name: 'Shaunak Bangalore Shashikanth',
  title: 'Senior Presentation',
  studentId: '301597',
  homeroom: '1236',
  school: 'Boyertown Area Senior High School',
  graduation: 'June 2027',
};

export interface SlideMeta {
  id: string;
  label: string;
  seconds: number; // target speaking time
}

export const slideMeta: SlideMeta[] = [
  { id: 'title', label: 'Title', seconds: 20 },
  { id: 'about', label: 'About Me', seconds: 65 },
  { id: 'resume', label: 'Resume', seconds: 35 },
  { id: 'ninth', label: 'Ninth Grade', seconds: 45 },
  { id: 'tenth', label: 'Tenth Grade', seconds: 30 },
  { id: 'service', label: 'Service Learning', seconds: 50 },
  { id: 'everfi', label: 'Eleventh Grade: EverFi', seconds: 40 },
  { id: 'jobshadow', label: 'Job Shadow', seconds: 45 },
  { id: 'experience', label: 'Experience', seconds: 55 },
  { id: 'reflection', label: 'Personal Reflection', seconds: 50 },
  { id: 'future', label: 'Future Plans', seconds: 55 },
  { id: 'thanks', label: 'Thank You', seconds: 20 },
];

export const aboutContent = {
  timeline: [
    { grades: '1st Grade', school: "Saint Elizabeth's", place: 'New Jersey' },
    { grades: '2nd–5th Grade', school: 'Knollwood Elementary', place: 'New Jersey' },
    { grades: '6th Grade', school: 'Central Middle School', place: 'New Jersey' },
    { grades: '7th–8th Grade', school: 'Middle School East', place: '' },
    { grades: '9th–12th Grade', school: 'Boyertown Area Senior High School', place: '' },
  ],
  familyAndFriends: 'Some of my family and friends.',
  activitiesTitle: 'Activities and Interests',
  activities: [
    'Technology Student Association (TSA)',
    'Varsity swimming',
    'Concert band (flute)',
    'Taekwondo',
    'Software development',
    'Business and finance',
    'Engineering',
    'Entrepreneurship',
  ],
  // Photo slots. To add a picture, drop a file named as below into src/assets/images/ (any of jpg, jpeg, png, webp),
  // or change "image" to your own file name. Use fit 'contain' to show the whole picture, and position to keep faces in view.
  photos: [
    { image: 'about-personal', label: 'Personal', alt: 'Shaunak hiking, looking out over a river valley', fit: 'cover' as const, position: 'center 42%' },
    { image: 'about-family', label: 'Family', alt: 'Family photo', fit: 'cover' as const, position: 'center 28%' },
    { image: 'about-friends', label: 'Friends', alt: 'Friends photo, dressed up at a TSA event', fit: 'cover' as const, position: 'center 32%' },
    { image: 'about-tsa', label: 'TSA', alt: 'Shaunak at a TSA competition holding first-place ribbons', fit: 'cover' as const, position: 'center 38%' },
  ],
};

export const resumeContent = {
  image: 'resume/resume.png',
  highlights: [
    { title: 'Technical experience', text: 'District Website Intern, Boyertown Area School District' },
    { title: 'Professional work', text: 'YMCA lifeguard and swim instructor' },
    { title: 'Leadership', text: 'DECA, Student Advisory Board, Strategic Planning Committee' },
    { title: 'Engineering projects', text: 'Titration System (SAPT) and Assistive Clothing Tool' },
  ],
};

export const ninthContent = {
  smartFutures: [
    { name: 'Think Like an Entrepreneur', note: 'First look at business and entrepreneurship' },
    { name: 'Dive Into Career Clusters', note: 'Looked at different career clusters' },
  ],
  essayTopic: 'Studying law at the University of Toronto',
  essaySeal: { image: 'seal-toronto', alt: 'Seal of the University of Toronto', label: 'University of Toronto Seal' },
  essayCovered: [
    'The legal system',
    'Helping people through a legal career',
    'University of Toronto programs',
    'Housing and campus activities',
    'Tuition and finances',
    'Campus life',
  ],
  reflection:
    'My plans have changed since then, but this was my first real research into a college and a career.',
};

export const tenthContent = {
  activities: [
    { name: 'Using Email', skill: 'Professional communication', note: '' },
    { name: 'Create a Personal Budget', skill: 'Financial planning', note: '' },
  ],
  connection: 'Both come up in business and finance.',
};

export const serviceContent = {
  organization: "Silvia's Gymnastics",
  hours: 10,
  event: 'Home gymnastics meet',
  logo: { image: 'silvias-gymnastics-logo', alt: "Silvia's Gymnastics logo", label: "Silvia's Gymnastics Logo" },
  // From the signed Student Documentation Log (handwritten; confirm the wording of the last entry).
  hoursByTask: [
    { task: 'Floor music', hours: 4 },
    { task: 'Gift stand', hours: 5 },
    { task: 'Wind-up', hours: 1 },
  ],
  duties: [
    'Worked the gift stand',
    'Handled floor music',
    'Helped with setup',
    'Helped with cleanup',
  ],
  skills: ['Teamwork', 'Communication', 'Organization', 'Responsibility'],
  // CONFIRM: reflection wording below is a draft for the presenter to verify or edit.
  reflection:
    'A meet takes more work behind the scenes than most people see. Someone has to run the music, the gift stand, and the setup.',
};

export const everfiContent = {
  topics: [
    { name: 'Taxes', note: 'Not my favorite, but worth knowing' },
    { name: 'Savings accounts', note: '' },
    { name: 'Checking accounts', note: '' },
  ],
  why: 'I want to study finance, so these are worth knowing.',
};

export const jobShadowContent = {
  placement: 'InfoVision',
  logo: { image: 'infovision-logo', alt: 'InfoVision logo', label: 'InfoVision Logo' },
  profession: 'Accountant',
  // General connection only. This is NOT a description of what the presenter personally observed.
  generalConnection: [
    { title: 'Records', text: 'Keeping track of where a company\'s money goes.' },
    { title: 'Reports', text: 'Turning those records into numbers people can use.' },
  ],
  goalLink: 'I plan to study finance, and accounting is part of that.',
};

export const experienceContent = {
  web: {
    role: 'District Website Intern',
    org: 'Boyertown Area School District · 2025 – Present',
    logo: { image: 'boyertown-asd-logo', alt: 'Boyertown Area School District logo', label: 'District Logo' },
    points: [
      'Maintain and update the district website',
      'Make additions and improvements to existing pages',
      'Add new content and features',
      'Work with the district communications specialist',
      'The district serves 6,000+ students',
    ],
  },
  titration: {
    name: 'Automated Titration System (SAPT)',
    tag: 'National TSA Qualifier',
    image: { image: 'titration-system', alt: 'SAPT electronics: Arduino, motor driver, peristaltic pump, battery pack, rotary encoder, and pH sensor', label: 'SAPT Electronics' },
    // SAPT is the name of the device. The prototype was 3D printed; the display structure was built from wood.
    points: [
      'Arduino-controlled pumps and pH sensors',
      '3D-printed prototype',
      'Custom wooden display',
      '60+ pages of engineering documentation',
    ],
  },
  clothing: {
    name: 'Assistive Clothing Tool',
    tag: 'TechOwl / Temple University',
    logo: { image: 'techowl-logo', alt: 'TechOwl logo', label: 'TechOwl Logo' },
    points: [
      'Clothing assistance multitool',
      'Designed for people with disabilities and age-related health issues',
    ],
  },
};

export const reflectionContent = {
  // Grade levels are only given for 7th-9th grade. Later interests use general labels, not invented grades or dates.
  phases: [
    {
      title: 'Earlier Interests',
      steps: [
        { when: '7th Grade', what: 'Chef', current: false },
        { when: '8th Grade', what: 'Cardiologist', current: false },
        { when: '9th Grade', what: 'Corporate Law', current: false },
      ],
    },
    {
      title: 'Later Interests',
      steps: [
        { when: 'Later in high school', what: 'Engineering', current: false },
        { when: 'Later in high school', what: 'Software Development', current: false },
        { when: 'Recent', what: 'Finance and AI', current: true },
        { when: 'Current direction', what: 'Entrepreneurship', current: true },
      ],
    },
  ],
  statement: 'I started using AI tools on my own and liked building with them. Now I want to see how software and finance fit together.',
};

export const futureContent = {
  schools: [
    {
      university: 'The University of Texas at Austin',
      business: 'McCombs School of Business',
      apply: 'Common App · McCombs (unspecified business)',
      seal: { image: 'seal-ut-austin', label: 'UT Austin Seal', alt: 'Official seal of The University of Texas at Austin' },
      reasons: ['Business Analytics major', 'Financial Technology course'],
    },
    {
      university: 'Indiana University Bloomington',
      business: 'Kelley School of Business',
      apply: 'Common App or Apply IU · Kelley major',
      seal: { image: 'seal-indiana', label: 'Indiana University Seal', alt: 'Official seal of Indiana University' },
      reasons: ['Investment Banking Workshop', 'Center for Financial Services'],
    },
    {
      university: 'The Pennsylvania State University',
      business: 'Smeal College of Business',
      apply: 'Common App or MyPennState · Smeal',
      seal: { image: 'seal-penn-state', label: 'Penn State Seal', alt: 'Official seal of The Pennsylvania State University' },
      reasons: ['Nittany Lion Fund, a student-run investment fund', 'Rogers Family Trading Room'],
    },
    {
      university: 'University of Miami',
      business: 'Miami Herbert Business School',
      apply: 'Common App · Business School major',
      seal: { image: 'seal-miami', label: 'University of Miami Seal', alt: 'Official seal of the University of Miami' },
      reasons: ['Category 5 Student Managed Investment Fund', 'Direct admission to the business school'],
    },
  ],
};

// Title slide portrait. Drop a photo named "title-portrait" (jpg, png, or webp) into src/assets/images/, or change "image".
export const titleContent = {
  portrait: { image: 'title-portrait', label: 'Portrait Photo', alt: 'Portrait of Shaunak Bangalore Shashikanth', fit: 'cover' as const, position: '28% 40%' },
};

export const thanksContent = { heading: 'Thank You', sub: 'Questions?' };
