// Private speaker notes. Never rendered on a slide. Shown only in the notes panel (N) or presenter view (P).
// Text in [CONFIRM: ...] brackets is a placeholder for something only the presenter can supply.

export interface SpeakerNote {
  id: string;
  seconds: number;
  paragraphs: string[];
  confirm?: string[];
  /** Background details for the presenter only. Not part of the spoken script. */
  reference?: string[];
}

export const speakerNotes: SpeakerNote[] = [
  {
    id: 'title',
    seconds: 20,
    paragraphs: [
      "Hi, I'm Shaunak Bangalore Shashikanth, and this is my senior presentation.",
      "I'll go through my portfolio from ninth grade to what I'm planning after graduation.",
    ],
  },
  {
    id: 'about',
    seconds: 65,
    paragraphs: [
      "I'll start with where I went to school. First grade was Saint Elizabeth's, then Knollwood Elementary for second through fifth, and Central Middle School for sixth, all in New Jersey. Seventh and eighth were at Middle School East, and now I'm at Boyertown Area Senior High School.",
      "[CONFIRM: a sentence or two about your family and friends. Keep it general.]",
      "Outside of class, I swim varsity, play flute in concert band, do taekwondo, and compete in TSA. I'm also into software, business and finance, engineering, and entrepreneurship.",
      "For leadership, I'm the District Website Intern, a DECA cofounder, and I'm on the Student Advisory Board and the district Strategic Planning Committee. The advisory board is fifteen students who advise school leaders. The planning committee has about a hundred members.",
      "In TSA, I've won Tech Bowl four times. I also took first at the Governor's GovSTEM PA competition and in Structural Engineering, second in Engineering Design, and third in STEM Mass, Digital Video Production, and Photographic Technology. I also have a Kukkiwon black belt in taekwondo.",
      "[CONFIRM: one short thing about each photo, like where it was taken.]",
    ],
    confirm: ['Family and friends sentence', 'A short remark about each photo'],
  },
  {
    id: 'resume',
    seconds: 35,
    paragraphs: [
      "This is my current resume. The top part is my work. I'm the District Website Intern, and I've also been a lifeguard and swim instructor at the YMCA.",
      "Next is leadership: DECA, the advisory board, and the planning committee. Then my two engineering projects, the titration system and the assistive clothing tool.",
      "I can zoom in if anyone wants a closer look.",
    ],
  },
  {
    id: 'ninth',
    seconds: 45,
    paragraphs: [
      "In ninth grade I did two Smart Futures activities, Think Like an Entrepreneur and Dive Into Career Clusters.",
      "[CONFIRM: one thing you remember from either activity.]",
      "My college essay was about studying law at the University of Toronto. I wrote about the legal system and about helping people through a legal career. Then I researched Toronto itself: the programs, housing, activities, tuition, and campus life.",
      "I don't plan on law anymore, but that essay was the first time I researched a college and a career in detail. [CONFIRM: how that shows up in your current college search.]",
    ],
    confirm: ['A memory from a ninth grade Smart Futures activity', 'How the essay research affects your college search'],
  },
  {
    id: 'tenth',
    seconds: 30,
    paragraphs: [
      "In tenth grade, the Smart Futures activities were Using Email and Create a Personal Budget.",
      "The budget connects to finance, which is what I want to study. [CONFIRM: a real example of using email professionally, or skip it.]",
    ],
  },
  {
    id: 'service',
    seconds: 50,
    paragraphs: [
      "For service learning, I volunteered at Silvia's Gymnastics for 10 hours, all at a home gymnastics meet. By my signed log, I spent four hours on floor music, five at the gift stand, and one on wind-up. I also helped with setup and cleanup.",
      "[CONFIRM: one specific moment from the meet that you remember.]",
      "What I took from it is that a meet takes more work behind the scenes than most people see. Someone has to run the music, the gift stand, and the setup. [CONFIRM: change this so it matches what you actually took from it.]",
    ],
    confirm: ['A specific memory from the meet', 'Your own wording for what you learned'],
  },
  {
    id: 'everfi',
    seconds: 40,
    paragraphs: [
      "In eleventh grade we did EverFi Financial Literacy. The topics were taxes, savings accounts, and checking accounts.",
      "Taxes were definitely not my favorite part, but I'm glad we covered them. I want to study finance, so it was worth knowing.",
      "[CONFIRM: one thing you learned, like a fact about taxes or accounts that surprised you.]",
    ],
  },
  {
    id: 'jobshadow',
    seconds: 45,
    paragraphs: [
      "My job shadow was at InfoVision, with an accountant.",
      "[CONFIRM BEFORE PRESENTING: What you saw and did at InfoVision. Only include things you actually experienced. Nothing about the visit has been provided, so none of it is written here. The rubric asks for a thorough explanation that connects to your goals.]",
      "I want to study finance, and accounting is closely tied to it. Accountants keep the records that finance works from.",
      "[CONFIRM: how the job shadow affected your plans, if it did.]",
    ],
    confirm: [
      'Everything you personally saw or did at InfoVision',
      'How the job shadow connects to your own plans after high school',
      'The rubric asks for a thorough job shadow explanation. This slide stays thin until you add firsthand details.',
    ],
  },
  {
    id: 'experience',
    seconds: 55,
    paragraphs: [
      "First, web development. Since 2025, I've been the District Website Intern for Boyertown Area School District. I maintain and update the district website, add to existing pages, and put up new content and features. I work with the district communications specialist. The district has more than 6,000 students.",
      "Second, engineering. We built SAPT, an automated acid-base titration system. A titration measures how much acid or base is in a solution, and SAPT does that automatically. An Arduino controls the pumps and the pH sensors. The prototype is 3D printed, and we built a wooden display for it. We wrote more than 60 pages of documentation, and the project qualified for the National TSA competition.",
      "My other project is the assistive clothing tool, a multitool that helps with clothing, made for people with disabilities and age-related health issues. It's connected to TechOwl and Temple University.",
    ],
  },
  {
    id: 'reflection',
    seconds: 50,
    paragraphs: [
      "My career interests have changed a few times. In seventh grade I wanted to be a chef, in eighth grade a cardiologist, and in ninth grade a corporate lawyer.",
      "Later I got into engineering and software development. I liked building things and solving problems.",
      "Then I started using AI tools on my own, and I liked building with them. I was already interested in finance, so I started looking at how software and finance fit together. That's what I want to study, and maybe I'll start my own business someday.",
    ],
  },
  {
    id: 'future',
    seconds: 55,
    paragraphs: [
      "I want to study finance and keep working on software and AI. I'm looking at four business schools.",
      "At UT Austin, McCombs has a Business Analytics major and a Financial Technology course. Indiana's Kelley has the Investment Banking Workshop. Penn State's Smeal has the Nittany Lion Fund, a student-run investment fund, and the Rogers Family Trading Room. And Miami Herbert at the University of Miami has the Category 5 Student Managed Investment Fund.",
      "I haven't been admitted anywhere, so these are just the schools I'm looking at. Long term, I'd like to combine finance and technology, maybe by building software or starting my own business.",
      "[CONFIRM: a personal reason for each school, only if it's true.]",
    ],
    confirm: ['A personal reason for each school. Do not say you have been admitted anywhere.'],
    reference: [
      "UT Austin (McCombs): Common App; apply as unspecified business. Early Action Oct 15, 2026; Regular Dec 1, 2026.",
      "Indiana (Kelley): Common App or Apply IU; select a Kelley major; Kelley Prospect Inventory priority Nov 15, 2026, final Feb 15, 2027; Early Action Nov 1, 2026. No automatic direct admission for Fall 2027. The Investment Banking Workshop is selective and only for admitted Kelley students.",
      "Penn State (Smeal): Common App or MyPennState; choose Smeal; Early Action Nov 1, 2026; complete STARS record in MyPennState. Admission to Smeal starts as a pre-major; entry to the Finance major comes later.",
      "Miami (Miami Herbert): Common App; select a Business School major for direct admission; Early Action Nov 1, 2026. Early Decision plans exist, but you have not chosen a binding plan. The Cat 5 fund is competitive and for enrolled Miami Herbert students.",
      "Full details and sources: ADMISSIONS_RESEARCH.md",
    ],
  },
  {
    id: 'thanks',
    seconds: 20,
    paragraphs: ["Thanks for listening. I'm happy to take questions."],
  },
];
