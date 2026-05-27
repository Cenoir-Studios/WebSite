export interface Social {
  label: string;
  url: string;
  icon: string;
}

export interface Emails {
  contact: string;
  careers: string;
  support: string;
  social: string;
  legal: string;
}

export interface SharedContent {
  brand: string;
  copyright: string;
  socials: Social[];
  emails: Emails;
  nav: NavLabels;
}

export interface CTA {
  text: string;
  href: string;
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface Pillar {
  icon: string;
  title: string;
  text: string;
}

export interface IndexContent {
  hero: {
    tag: string;
    title: string;
    description: string;
    cta_primary: CTA;
    cta_secondary: CTA;
  };
  featured: {
    label: string;
    title: string;
    description: string;
    images: ImageRef[];
  };
  pillars: Pillar[];
}

export interface CardBlock {
  title: string;
  paragraphs: string[];
}

export interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export interface TrailerVideo {
  id: string;
  caption: string;
}

export interface AboutContent {
  hero: { label: string; title: string; description: string };
  cards: CardBlock[];
  values: ValueItem[];
  journey: {
    label: string;
    title: string;
    description: string;
    milestones: Milestone[];
  };
  trailers: {
    label: string;
    title: string;
    description: string;
    videos: TrailerVideo[];
  };
}

export interface TeamMember {
  name: string;
  photo: string;
  initials: string;
  role: string;
  games: string;
}

export interface Department {
  name: string;
  members: TeamMember[];
}

export interface TeamContent {
  label: string;
  title: string;
  description: string;
  departments: Department[];
}

export interface Downloads {
  windows: string;
  mac: string;
  linux: string;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  tags: string[];
  downloads: Downloads;
  gallery: ImageRef[];
}

export interface BoardGameData {
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  tags: string[];
  status: string;
}

export interface ProjectsContent {
  hero: { label: string; title: string };
  nosains: ProjectData;
  boardgame: BoardGameData;
}

export interface NewsEntry {
  day: string;
  month: string;
  title: string;
  text: string;
  tag: string;
}

export interface NewsContent {
  hero: { label: string; title: string; description: string };
  entries: NewsEntry[];
}

export interface Role {
  title: string;
  dept: string;
  location: string;
  type: string;
  about: string;
  tasks: string[];
  tools?: string[];
}

export interface CareersContent {
  hero: { label: string; title: string; description: string };
  roles: Role[];
}

export interface AllContent {
  shared: SharedContent;
  index: IndexContent;
  about: AboutContent;
  team: TeamContent;
  projects: ProjectsContent;
  news: NewsContent;
  careers: CareersContent;
  timeline: TimelineContent;
}

export interface NavLabels {
  home: string;
  about: string;
  team: string;
  projects: string;
  news: string;
  careers: string;
  timeline: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'planned';
}

export interface TimelineContent {
  hero: { label: string; title: string; description: string };
  milestones: TimelineMilestone[];
}
