/**
 * All of the site's non-project content lives in this file.
 *
 * Everything marked PLACEHOLDER is sample copy written for an ideal Data
 * Engineering candidate. Replace it with your real details before publishing.
 * Projects are not defined here: see src/content/projects/.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  organisation: string;
  location?: string;
  start: string;
  end: string;
  summary?: string;
  highlights: string[];
  stack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  start: string;
  end: string;
  notes?: string;
}

export interface VolunteeringItem {
  role: string;
  organisation: string;
  /** Optional link to the organisation's website. */
  url?: string;
  /** Free-form period, for example "2023 - Present" or "Oct 2024, Oct 2025". */
  period: string;
  highlights: string[];
}

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  /** Award received for the paper, shown as a highlighted label. */
  award?: string;
  /** Optional short summary. Leave empty to hide it. */
  abstract?: string;
  keywords: string[];
  /** Optional links (DOI, PDF, slides). Leave empty to hide the buttons. */
  links: PublicationLink[];
}

export const profile = {
  name: 'Dimitrios Papakonstantinou',
  initials: 'DP',
  role: 'Data Engineer',
  tagline: 'I build batch and streaming data pipelines and the warehouses they feed.',
  intro:
    'Informatics student at the University of Western Macedonia. I started out building web applications, moved towards data engineering, and write compilers in my spare time.',
  location: 'Kastoria, Greece',
  availability: 'Open to Data Engineering roles',
  email: 'papakonstantinou.dm@gmail.com',
  social: {
    github: 'https://github.com/Turtel216',
    gitlab: 'https://gitlab.com/papakonstantinou',
    linkedin: 'https://www.linkedin.com/in/dimitrios-papakonstantinou-44a7672b3/',
  },
} as const;

export const seo = {
  title: `${profile.name} | ${profile.role}`,
  description:
    'Data Engineer and Informatics student at the University of Western Macedonia. Data pipelines and warehouses, some web development, and compilers as a hobby.',
};

export const nav: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Background', href: '/#background' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Publication', href: '/#publication' },
  { label: 'Compilers', href: '/#compilers' },
  { label: 'Contact', href: '/#contact' },
];

/** Shown in the summary panel next to the hero text. */
export const atAGlance: { label: string; value: string }[] = [
  { label: 'Role', value: profile.role },
  { label: 'Focus', value: 'Batch and streaming pipelines, data modelling, data quality' },
  { label: 'Core stack', value: 'Python, SQL, Spark, Airflow, dbt, Kafka' },
  { label: 'Location', value: profile.location },
  { label: 'Status', value: profile.availability },
];

/** About section. Each string is one paragraph. */
export const about: string[] = [
  'I study Informatics at the University of Western Macedonia and I am working towards a career in data engineering. The parts I like most are ingestion, orchestration and data modelling. I prefer pipelines that can be rerun without side effects and schemas that reject bad data early.',
  'I got here through web development. I built the web portal of my university department as part of a team, and later SyncSet, a real-time collaborative app with a PostgreSQL backend. Because of that I am comfortable with the services and APIs on either side of a pipeline.',
  'In my spare time I write compilers and interpreters. It is a hobby, but parsing, type checking and optimisation passes turned out to be useful background for understanding how query engines work.',
  'I have a great love for functional programming. I write Haskell whenever I get the chance, and my current compiler project is a lazy functional language. It also affects how I write pipelines: a transformation that always gives the same output for the same input is easy to test and safe to rerun.',
];

/** Short facts shown beside the About text. */
export const aboutFacts: { label: string; value: string }[] = [
  { label: 'Focus', value: 'Data engineering' },
  { label: 'Studying', value: 'BSc Informatics, University of Western Macedonia' },
  { label: 'Also', value: 'Web development' },
  { label: 'Hobby', value: 'Compilers' },
  { label: 'Favourite paradigm', value: 'Functional programming' },
];

// PLACEHOLDER: trim these lists down to what you can discuss in an interview.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['Python', 'SQL', 'Scala', 'TypeScript', 'Go', 'Bash'],
  },
  {
    title: 'Processing and orchestration',
    skills: ['Apache Spark', 'Apache Kafka', 'Apache Airflow', 'dbt', 'Apache Flink', 'Pandas', 'Polars'],
  },
  {
    title: 'Storage and modelling',
    skills: [
      'PostgreSQL',
      'Snowflake',
      'BigQuery',
      'Delta Lake',
      'Apache Iceberg',
      'Parquet',
      'Dimensional modelling',
    ],
  },
  {
    title: 'Cloud and infrastructure',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux'],
  },
  {
    title: 'Quality and observability',
    skills: ['Great Expectations', 'dbt tests', 'Data contracts', 'OpenLineage', 'Prometheus', 'Grafana'],
  },
  {
    title: 'Web development',
    skills: ['React', 'Node.js', 'REST APIs', 'Tailwind CSS', 'Astro'],
  },
];

/**
 * Work experience. While this array is empty the section is titled
 * "Education and volunteering" and shows only those two lists. Add an entry
 * and the section becomes "Experience", with the roles listed first.
 *
 * Template for an entry:
 *
 *   {
 *     role: 'Data Engineer',
 *     organisation: 'Company Name',
 *     location: 'City, Country',
 *     start: '2027',
 *     end: 'Present',
 *     summary: 'One sentence on the team and what you are responsible for.',
 *     highlights: [
 *       'What you built or changed, and the effect it had.',
 *       'A second outcome, with a number if you have one.',
 *     ],
 *     stack: ['Python', 'SQL', 'Airflow'],
 *   },
 */
export const experience: ExperienceItem[] = [];

export const education: EducationItem[] = [
  {
    degree: 'BSc in Informatics',
    institution: 'University of Western Macedonia, Kastoria, Greece',
    start: '2021',
    end: 'Present',
  },
];

export const volunteering: VolunteeringItem[] = [
  {
    role: 'Member',
    organisation: 'IEEE Student Branch UoWM Kastoria',
    period: '2023 - Present',
    highlights: [
      'Member of the Student Branch executive committee, serving as Webmaster for two terms.',
      'Project Coordinator for the Web Development, Smart Campus and Competitive Programming projects.',
    ],
  },
  {
    role: 'Technical Support Staff',
    organisation: 'Diamorfosis',
    url: 'https://diamorfosis.eu/',
    period: 'Oct 2024, Oct 2025',
    highlights: [],
  },
];

export const publication: Publication = {
  title: 'Evaluating Lightweight Kubernetes Distributions on Heterogeneous ARM64 Edge Clusters',
  authors: [
    'Ioannis Keps',
    'Dimitrios Papakonstantinou',
    'Christos Hitiris',
    'Dimitrios J. Vergados',
    'Angelos Michalas',
  ],
  venue: 'SEEDA-CECNSM 2026',
  year: 2026,
  award: 'Best Student Paper Award in Informatics',
  // TODO: add a two or three sentence summary of the paper here.
  abstract: '',
  keywords: ['Kubernetes', 'ARM64', 'Edge computing'],
  // TODO: add the DOI or PDF link once available, e.g. { label: 'Read the paper', href: 'https://doi.org/...' }
  links: [],
};

export const compilersIntro =
  'Hobby projects. This is not the field I am applying in, but it is where most of my free-time code ends up.';

export const contactText =
  'I am looking for Data Engineering roles. Email is the quickest way to reach me.';
