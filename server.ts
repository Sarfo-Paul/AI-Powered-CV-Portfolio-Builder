import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Professional Summary Generation
app.post("/api/ai/summarize", async (req, res) => {
  try {
    const { experience, skills, tone = "professional" } = req.body;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a compelling professional summary for a CV. 
      Tone: ${tone}. 
      Experience: ${JSON.stringify(experience)}. 
      Skills: ${skills.join(", ")}.
      Keep it under 3-4 sentences.`,
    });

    res.json({ summary: response.text });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ATS Optimization & Interview Questions
app.post("/api/ai/analyze", async (req, res) => {
  try {
    const { resumeData } = req.body;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this resume for ATS optimization and provide improvement suggestions. 
      Also generate 3 targeted interview questions based on the experience.
      Return as JSON with keys: "score" (0-100), "feedback" (array of strings), "interviewQuestions" (array of strings).
      
      Resume Data: ${JSON.stringify(resumeData)}`,
      config: {
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
