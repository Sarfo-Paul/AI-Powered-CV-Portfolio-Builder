import { ResumeData } from "../types";

export const aiService = {
  async generateSummary(experience: any[], skills: string[], tone: string = "professional") {
    const response = await fetch("/api/ai/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experience, skills, tone }),
    });
    if (!response.ok) throw new Error("AI Summary failed");
    return await response.json();
  },

  async analyzeATS(resumeData: ResumeData) {
    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData }),
    });
    if (!response.ok) throw new Error("ATS Analysis failed");
    return await response.json();
  }
};
