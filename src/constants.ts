import { ResumeData } from "./types";

export const TEMPLATES = [
  { id: "modern", name: "Modern Minimal", description: "Clean lines and ample whitespace" },
  { id: "professional", name: "Professional Executive", description: "Traditional layout for corporate roles" },
  { id: "creative", name: "Creative Bold", description: "Vibrant colors for modern portfolios" }
];

export const INITIAL_RESUME_DATA: ResumeData = {
  title: "Untitled Resume",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  templateId: "modern"
};
