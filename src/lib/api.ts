// src/lib/api.ts
//
// Drop-in replacement for the hardcoded exports in data/projects.ts.
// The TS interfaces (SiteInfo, AboutInfo, Category, Project, ContactInfo, ...)
// stay exactly the same — only how you GET the data changes.

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
  level: number;
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

// Base URL of the Django API. Set VITE_API_URL in a .env file at the
// project root, e.g.: VITE_API_URL=http://127.0.0.1:8000
const API_BASE = "https://api.modelflick.com";
// const API_BASE = "http://127.0.0.1:8000";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function fetchSiteInfo(): Promise<SiteInfo> {
  return getJSON<SiteInfo>("/api/portfolio/site-info/");
}

export function fetchAboutInfo(): Promise<AboutInfo> {
  return getJSON<AboutInfo>("/api/portfolio/about/");
}

export function fetchCategories(): Promise<Category[]> {
  return getJSON<Category[]>("/api/portfolio/categories/");
}

// Matches the old `projects: Record<string, Project[]>` shape exactly.
export function fetchProjects(): Promise<Record<string, Project[]>> {
  return getJSON<Record<string, Project[]>>("/api/projects/");
}

export function fetchProject(categorySlug: string, projectSlug: string): Promise<Project> {
  return getJSON<Project>(`/api/portfolio/projects/${categorySlug}/${projectSlug}/`);
}

export function fetchContactInfo(): Promise<ContactInfo> {
  return getJSON<ContactInfo>("/api/portfolio/contact/");
}
