export interface Category {
  slug: string;
  title: string;
  image: string;
}

export interface Project {
  slug: string;
  title: string;
  cover: string;
  description: string;
}

export const categories: Category[] = [
  { slug: 'residential', title: 'Residential', image: 'https://picsum.photos/seed/residential/600/600' },
  { slug: 'interior', title: 'Interior', image: 'https://picsum.photos/seed/interior/600/600' },
  { slug: 'commercial', title: 'Commercial', image: 'https://picsum.photos/seed/commercial/600/600' },
];

export const projects: Record<string, Project[]> = {
  residential: [
    { slug: 'house-1', title: 'House One', cover: 'https://picsum.photos/seed/house1/800/500', description: 'A minimal courtyard house with cross-ventilation and local laterite finish.' },
    { slug: 'house-2', title: 'House Two', cover: 'https://picsum.photos/seed/house2/800/500', description: 'Compact two-storey home with a green roof terrace.' },
  ],
  interior: [
    { slug: 'living-space-1', title: 'Living Space One', cover: 'https://picsum.photos/seed/interior1/800/500', description: 'Warm-toned living area with exposed wood ceiling.' },
  ],
  commercial: [
    { slug: 'office-1', title: 'Office One', cover: 'https://picsum.photos/seed/office1/800/500', description: 'Open-plan office with natural light wells.' },
  ],
};