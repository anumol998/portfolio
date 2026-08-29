// data/projects.ts

export interface SiteInfo {
  name: string;
  title: string;
  intro: string;
}

export interface TimelineEntry {
  period: string;
  place: string;
  role?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface AboutInfo {
  greeting: string;
  photo: string;
  paragraphs: string[];
  skills: Skill[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
}

export interface Category {
  slug: string;
  title: string;
  image: string;
}

export interface Drawing {
  image: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  cover: string;
  description: string[];
  projectType?: string;
  stage?: string;
  location?: string;
  role?: string;
  drawings?: Drawing[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phones: string[];
  address: string;
  website?: string;
  photo?: string;
  socials: SocialLink[];
}

export const siteInfo: SiteInfo = {
  name: 'Anumol T Regi',
  title: 'Architectural Portfolio',
  intro:
    'Anumol is an architect focused on designing spaces that balance functionality, climate response, and material honesty — from compact residences to commercial interiors.',
};

export const aboutInfo: AboutInfo = {
  greeting: 'oh, hello there',
  photo: '/images/contact-photo.png',
  paragraphs: [
    "Hello and thank you for taking the time to explore my portfolio.",
    "I'm Anumol T Regi, an architect based in Kerala, India. I trained as an architect in India, where I gained my degree and registration, and over the years I've built a portfolio spanning residential, interior, and commercial projects.",
    "Along the way, I've worked alongside talented architects and designers who have shaped my approach. Each project has strengthened my belief that good design should be both purposeful and humane.",
  ],
  skills: [
    { name: 'AutoCAD', level: 90 },
    { name: 'SketchUp', level: 85 },
    { name: 'Revit', level: 75 },
    { name: 'Lumion', level: 70 },
    { name: 'Adobe Photoshop', level: 65 },
  ],
  experience: [
    { period: '2023 NOV - PRESENT', place: 'Independent Practice, Kerala', role: 'Architect' },
    { period: '2020 DEC - 2023 OCT', place: 'DACglobal, Calicut, Kerala, India', role: 'Associate Architect' },
    { period: '2019 JAN - 2020 OCT', place: 'Studio KIA, Kerala, India', role: 'Junior Architect' },
  ],
  education: [
    {
      period: '2012-2017',
      place: 'BArch — Malik Sandal Institute of Art and Architecture, Bijapur, India (Visvesvaraya Technical University)',
    },
    { period: '2010-2012', place: 'St. George HSS Kattappana, India (Kerala State Board)' },
    { period: '2005-2010', place: 'Secondary School, Kerala, India' },
  ],
};

export const categories: Category[] = [
  { slug: 'residential', title: 'Residential', image: 'https://picsum.photos/seed/residential/600/600' },
  { slug: 'interior', title: 'Interior', image: 'https://picsum.photos/seed/interior/600/600' },
  { slug: 'commercial', title: 'Commercial', image: 'https://picsum.photos/seed/commercial/600/600' },
];

export const projects: Record<string, Project[]> = {
  residential: [
    {
      slug: 'house-1',
      title: 'House One',
      cover: 'https://picsum.photos/seed/house1/1600/700',
      description: [
        'A minimal courtyard house with cross-ventilation and local laterite finish. The layout wraps around a central open-to-sky courtyard that draws light and air into every room.',
        'Deep eaves and a laterite base keep interiors cool through the year, reducing reliance on mechanical cooling even during peak summer months.',
        'The material palette stays deliberately restrained — exposed laterite, timber, and oxide-finished floors — letting the courtyard light do most of the work.',
      ],
      projectType: 'Residential',
      stage: 'Completed in 2022',
      location: 'Kerala, India',
      role: 'Lead Architect',
      drawings: [
        { image: 'https://picsum.photos/seed/house1-plan/800/600', caption: 'Ground floor plan' },
        { image: 'https://picsum.photos/seed/house1-section/800/600', caption: 'Section A-A through the courtyard' },
        { image: 'https://picsum.photos/seed/house1-elevation/800/600', caption: 'Front elevation' },
        { image: 'https://picsum.photos/seed/house1-view/800/600', caption: 'View of the central courtyard' },
      ],
    },
    {
      slug: 'house-2',
      title: 'House Two',
      cover: 'https://picsum.photos/seed/house2/1600/700',
      description: [
        'Compact two-storey home with a green roof terrace. Designed for a narrow urban plot, the plan stacks living spaces vertically to make the most of a tight footprint.',
        'A planted roof terrace extends usable outdoor area and improves thermal performance, cutting down heat gain to the floor below.',
      ],
      projectType: 'Residential',
      stage: 'Completed in 2021',
      location: 'Kochi, Kerala, India',
      role: 'Architect',
      drawings: [
        { image: 'https://picsum.photos/seed/house2-plan/800/600', caption: 'First floor plan' },
        { image: 'https://picsum.photos/seed/house2-section/800/600', caption: 'Longitudinal section' },
        { image: 'https://picsum.photos/seed/house2-view/800/600', caption: 'Roof terrace view' },
      ],
    },
  ],
  interior: [
    {
      slug: 'living-space-1',
      title: 'Living Space One',
      cover: 'https://picsum.photos/seed/interior1/1600/700',
      description: [
        "Warm-toned living area with exposed wood ceiling. Furniture and finishes were chosen to keep the palette warm and tactile.",
        "The timber ceiling was left exposed as the room's primary material gesture, anchoring the space without additional ornamentation.",
      ],
      projectType: 'Interior',
      stage: 'Completed in 2023',
      location: 'Kozhikode, Kerala, India',
      role: 'Interior Designer',
      drawings: [
        { image: 'https://picsum.photos/seed/interior1-plan/800/600', caption: 'Furniture layout plan' },
        { image: 'https://picsum.photos/seed/interior1-view/800/600', caption: 'Living area view' },
      ],
    },
  ],
  commercial: [
    {
      slug: 'office-1',
      title: 'Office One',
      cover: 'https://picsum.photos/seed/office1/1600/700',
      description: [
        'Open-plan office with natural light wells. Light wells cut through the building section to bring daylight deep into the floor plate.',
        'This reduces dependence on artificial lighting across working hours and helps regulate internal temperature through passive stack ventilation.',
      ],
      projectType: 'Commercial',
      stage: 'Completed in 2020',
      location: 'Ernakulam, Kerala, India',
      role: 'Project Architect',
      drawings: [
        { image: 'https://picsum.photos/seed/office1-plan/800/600', caption: 'Typical floor plan' },
        { image: 'https://picsum.photos/seed/office1-section/800/600', caption: 'Section through light well' },
        { image: 'https://picsum.photos/seed/office1-view/800/600', caption: 'Interior view of workspace' },
      ],
    },
  ],
};

export const contactInfo: ContactInfo = {
  email: 'hello@example.com',
  phones: ['+91 00000 00000'],
  address: 'Kerala, India',
  website: 'www.example.com',
  photo: '/images/contact-photo.png',
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/yourhandle' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourhandle' },
  ],
};