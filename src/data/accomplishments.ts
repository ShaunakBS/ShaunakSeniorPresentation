// Accomplishments shown on the About Me slide. Every entry comes from the resume.
// (Engineering projects, skills, and certifications are intentionally NOT shown on About Me; see the Experience slide and the resume.)

export interface AccomplishmentGroup {
  title: string;
  items: { text: string; detail?: string; rank?: string }[];
}

export const leadership: AccomplishmentGroup = {
  title: 'Leadership',
  items: [
    { text: 'District Website Intern', detail: 'Boyertown Area School District' },
    { text: 'DECA Chapter Cofounder', detail: "The high school's inaugural chapter" },
    { text: 'Student Advisory Board', detail: '1 of 15 student representatives' },
    { text: 'District Strategic Planning Committee', detail: '100-member committee' },
  ],
};

export const awards: AccomplishmentGroup = {
  title: 'Competition Awards',
  items: [
    { rank: '1st', text: "Governor's GovSTEM PA" },
    { rank: '1st', text: 'TSA Tech Bowl (four-time champion)' },
    { rank: '1st', text: 'TSA Structural Engineering' },
    { rank: '2nd', text: 'TSA Engineering Design' },
    { rank: '3rd', text: 'PA TSA STEM Mass' },
    { rank: '3rd', text: 'TSA Digital Video Production' },
    { rank: '3rd', text: 'TSA Photographic Technology' },
    { rank: '', text: 'Kukkiwon Taekwondo Black Belt' },
  ],
};
