import React from "react";
import { ResumeData } from "../types";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

interface Props {
  data: ResumeData;
  id?: string;
}

export default function ResumePreview({ data, id = "resume-preview" }: Props) {
  return (
    <div className="flex flex-col items-center p-8 bg-slate-50 overflow-y-auto h-full custom-scrollbar">
      <div id={id} className="cv-preview-container p-12 text-slate-800 bg-white border border-slate-200 rounded-sm shadow-2xl relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600"></div>

        {/* Header */}
        <header className="mb-8 border-b border-slate-100 pb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">
              Professional Profile
            </p>
          </div>
          <div className="text-right space-y-1 text-[11px] font-medium text-slate-500">
            {data.personalInfo.email && <div className="flex items-center justify-end gap-1.5">{data.personalInfo.email} <Mail size={12} className="text-slate-300" /></div>}
            {data.personalInfo.phone && <div className="flex items-center justify-end gap-1.5">{data.personalInfo.phone} <Phone size={12} className="text-slate-300" /></div>}
            {data.personalInfo.location && <div className="flex items-center justify-end gap-1.5">{data.personalInfo.location} <MapPin size={12} className="text-slate-300" /></div>}
          </div>
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-50 pb-2">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-slate-600 italic border-l-4 border-indigo-50 pl-4 bg-slate-50/50 py-3 rounded-r-lg">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 pb-2">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{exp.role} at {exp.company}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>
                  <ul className="space-y-1.5 list-disc ml-4">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-xs text-slate-600 leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 pb-2">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{edu.school}</h3>
                    <span className="text-[10px] font-bold text-slate-400">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-xs text-slate-600 italic font-medium">{edu.degree}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 pb-2">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 bg-indigo-50/30 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-100 uppercase tracking-tighter">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 pb-2">Projects</h2>
            <div className="space-y-5">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{proj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Placeholder for empty state */}
        {data.experience.length === 0 && !data.summary && (
          <div className="flex flex-col items-center justify-center h-full py-20 text-slate-300">
            <Sparkles size={48} className="mb-4 opacity-10" />
            <p className="text-center italic text-sm font-medium">Start building your story...</p>
          </div>
        )}
      </div>
    </div>
  );
}
