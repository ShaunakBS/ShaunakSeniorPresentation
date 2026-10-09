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
      'Hello everyone. My name is Shaunak Bangalore Shashikanth, and this is my senior presentation.',
      'I will walk through my portfolio from ninth grade to my plans after graduation, and explain how my interests have changed along the way.',
    ],
  },
  {
    id: 'about',
    seconds: 65,
    paragraphs: [
      "I will start with a little about me. I went to Saint Elizabeth's for first grade, then Knollwood Elementary for second through fifth grade, and Central Middle School for sixth grade, all in New Jersey. After that I went to Middle School East for seventh and eighth grade, and now I am at Boyertown Area Senior High School.",
      "[CONFIRM: one or two broad sentences about family and friends. Keep it general. You can point to the Family and Friends photo.]",
      "Outside of class, I swim on the varsity team, I play flute in concert band, I do taekwondo, and I am part of TSA. I am also interested in software development, business and finance, engineering, and entrepreneurship.",
      "For leadership, I am the district website intern, a DECA chapter cofounder, and I serve on the Student Advisory Board and the district Strategic Planning Committee. The Advisory Board is fifteen students chosen to advise school leaders, and the Planning Committee has around one hundred members.",
      "In competitions, I have won TSA Tech Bowl four times, and placed first at the Governor's GovSTEM PA competition and in TSA Structural Engineering. I also placed second in Engineering Design, and third in STEM Mass, Digital Video Production, and Photographic Technology. And I earned a Kukkiwon taekwondo black belt.",
      "[CONFIRM: if you add photos, say one short thing about each, such as where it was taken.]",
    ],
    confirm: ["Family and friends sentence", "Short remarks about each photo"],
  },
  {
    id: 'resume',
    seconds: 35,
    paragraphs: [
      'This is my current resume. I think of it in four parts.',
      'For technical experience, I am the District Website Intern. For professional work, I have also worked as a lifeguard and swim lesson instructor at the YMCA.',
      'For leadership, I am involved in DECA, the Student Advisory Board, and the Strategic Planning Committee. And for engineering, the resume covers my titration system and my assistive clothing tool.',
      'I can expand it on screen if anyone wants a closer look.',
    ],
  },
  {
    id: 'ninth',
    seconds: 45,
    paragraphs: [
      'In ninth grade I completed two Smart Futures activities: Think Like an Entrepreneur and Dive Into Career Clusters. They were my first real introduction to business thinking and to exploring different careers.',
      '[CONFIRM: one specific thing you remember learning from either activity.]',
      'My ninth grade college essay was about studying law at the University of Toronto. I researched the legal system, how a legal career can help people, and the programs, housing, activities, tuition, and campus life at the University.',
      'My interests have changed a lot since then. But writing that essay was one of my first chances to seriously research a future career and what college is actually like.',
      "Looking back, the Smart Futures activities and the essay both pushed me to think about the future earlier than I normally would have. Even though my plans changed, I learned how to research a school and a career, and I still use that approach now when I compare colleges.",
      "[CONFIRM: add one sentence on how this research habit shows up in your current college search.]",
    ],
    confirm: ['Specific memory from a ninth grade Smart Futures activity'],
  },
  {
    id: 'tenth',
    seconds: 30,
    paragraphs: [
      'In tenth grade, my Smart Futures activities were Using Email and Create a Personal Budget.',
      'These focused on everyday professional skills: communicating through email, and planning a budget. Both are useful in business and finance.',
      "Email is how professional communication happens in school, in internships, and in business. Budgeting connects directly to my interest in finance, because it is the personal-level version of managing money. Together, these two activities gave me practical skills, not just ideas.",
      "[CONFIRM: add one real example of when you used email professionally, or leave this out.]",
    ],
  },
  {
    id: 'service',
    seconds: 50,
    paragraphs: [
      "For my service learning project, I volunteered with Silvia's Gymnastics and completed 10 hours.",
      'I helped at a home gymnastics meet. According to my signed log, I spent four hours handling the floor music, five hours running the gift stand, and one hour on wind-up. I also helped with setup and cleanup.',
      '[CONFIRM: one specific moment or detail from the meet that you remember.]',
      'The experience gave me a chance to see how much coordination happens behind the scenes at an event. Different responsibilities have to be handled for it to run smoothly.',
      'It took teamwork, communication, organization, and responsibility. [CONFIRM: edit this reflection so it matches what you actually took away from it.]',
      "I would take two things from this project into the future. First, the work people do behind the scenes matters just as much as the work the audience sees. Second, when many people share responsibilities, clear communication keeps everything on track. ",
    ],
    confirm: ['Reflection wording and a specific memory'],
  },
  {
    id: 'everfi',
    seconds: 40,
    paragraphs: [
      'In eleventh grade, we completed EverFi Financial Literacy.',
      'One of the biggest topics I remember is taxes, which was definitely not my favorite part. We also covered savings accounts and checking accounts.',
      'Those are practical topics, especially since I want to study finance.',
      "EverFi also connects to what I do outside of class. Understanding how accounts work and how taxes affect income is the kind of knowledge I will need after graduation, no matter which career I choose. It also confirmed that I am interested in the finance side of business, even if some topics are more exciting than others.",
      "[CONFIRM: add anything you personally learned, such as one fact about taxes or accounts that surprised you.]",
    ],
  },
  {
    id: 'jobshadow',
    seconds: 45,
    paragraphs: [
      'For my job shadow, my placement was at InfoVision, and the profession was accountant.',
      '[CONFIRM BEFORE PRESENTING: Personal observations and connection to future goals. Say only what you personally saw, heard, or did during the job shadow. Nothing about the visit has been supplied, so nothing is written here.]',
      'In general terms, accounting is closely connected to finance. Accountants work with financial records and reporting, and organizations use that information to make decisions.',
      'I want to study finance, so understanding how financial information is recorded and reported is a useful foundation. [CONFIRM: add how the job shadow itself influenced your plans, if it did.]',
      "[CONFIRM BEFORE PRESENTING: The rubric asks for a thorough job shadow explanation that connects to your post-secondary goals. Add your own first-hand account here: what you did or watched during the day, one thing that surprised you, and how it affected your thinking about finance and college. Only include things you actually experienced.]",
    ],
    confirm: [
      'Everything personally observed at InfoVision',
      'How the job shadow connects to your own post-secondary plans',
      'The rubric asks for a thorough job shadow explanation. This slide is thin until you add firsthand details.',
    ],
  },
  {
    id: 'experience',
    seconds: 55,
    paragraphs: [
      'Now some of the work I am most proud of. First, web development.',
      'Since 2025, I have been the District Website Intern for Boyertown Area School District. I maintain and update the district website, make additions and improvements to existing pages, and add new content and features. I work with the district communications specialist to support the district\'s public-facing web resources. The district serves more than 6,000 students.',
      'Second, engineering. Our automated acid-base titration system is called SAPT. It uses Arduino-controlled components, pumps, and pH sensors. The device prototype was 3D printed, and we built a wooden display to present it. We also produced more than 60 pages of engineering documentation, and the project qualified for the National TSA competition.',
      'I also designed an assistive clothing tool, focused on accessibility and care for people with disabilities and age-related health issues. That project is associated with TechOwl and Temple University.',
      'Both showed me what practical problem solving looks like.',
      "The common thread is that I enjoy taking a real problem and working through it step by step, whether that is a website that many people rely on, or a prototype that has to measure something accurately. In engineering, the 60-plus pages of documentation were a big part of the work, not an extra. Documentation and clear communication matter just as much as the build.",
    ],
  },
  {
    id: 'reflection',
    seconds: 50,
    paragraphs: [
      'My career interests have changed quite a bit over the years. In seventh grade, I wanted to be a chef. In eighth grade, I was interested in becoming a cardiologist, and in ninth grade, I wanted to pursue corporate law.',
      'Later, I became more interested in engineering and software development, because I enjoyed building things and solving problems. Then I started exploring AI tools on my own, and I enjoyed working with AI-assisted development tools.',
      'As I explored artificial intelligence and finance, I realized those were areas I wanted to continue pursuing in college and beyond. Each stage taught me something about what I like doing, and it was a gradual shift, not one single moment.',
    ],
  },
  {
    id: 'future',
    seconds: 55,
    paragraphs: [
      "Right now, my main goal is to study finance while continuing to develop my software and AI skills. I am considering four business schools, and I chose them because of what they offer in finance.",
      "The University of Texas at Austin has McCombs, which has strong finance and business programs, and business analytics opportunities alongside finance. Indiana University has Kelley, where I like the practical career preparation, along with the Investment Banking Workshop and strong industry connections.",
      "Penn State has Smeal, which has a finance program with real investment experience through the Nittany Lion Fund and its trading room. And the University of Miami has Miami Herbert Business School, which offers a finance education in an international business environment, and a student managed investment fund.",
      "I have not been admitted anywhere yet, so these are schools I am looking at. In the long term, I would like to combine finance and technology, potentially by developing software or starting my own business.",
      "[CONFIRM: add one specific reason each school interests you, only if it is true for you.]",
    ],
    confirm: ["Personal reasons for each school; do not say you have been admitted anywhere"],
    reference: [
      "UT Austin (McCombs): Common App; apply as unspecified business. Early Action Oct 15, 2026; Regular Dec 1, 2026.",
      "Indiana (Kelley): Common App or Apply IU; select a Kelley major; Kelley Prospect Inventory priority Nov 15, 2026, final Feb 15, 2027; Early Action Nov 1, 2026. No automatic direct admission for Fall 2027.",
      "Penn State (Smeal): Common App or MyPennState; choose Smeal; Early Action Nov 1, 2026; complete STARS record in MyPennState. Admission to Smeal starts as a pre-major; entry to the Finance major comes later.",
      "Miami (Miami Herbert): Common App; select a Business School major for direct admission; Early Action Nov 1, 2026. Early Decision plans exist, but you have not chosen a binding plan.",
      "Full details and sources: ADMISSIONS_RESEARCH.md",
    ],
  },
  {
    id: 'thanks',
    seconds: 20,
    paragraphs: ['Thank you for listening. Thank you also to the teachers and staff who supported me through the portfolio process.', 'I am happy to answer any questions.'],
  },
];
