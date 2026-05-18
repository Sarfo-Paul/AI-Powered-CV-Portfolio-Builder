import React, { useState } from "react";
import { ResumeData, Skill, Experience, Education, Project } from "../types";
import { Plus, Trash2, Sparkles, ChevronRight, ChevronLeft, Save, FileText, Briefcase, GraduationCap, Code, Layout, X } from "lucide-react";
import { aiService } from "../services/ai";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onSave: () => void;
}

export default function ResumeEditor({ data, onChange, onSave }: Props) {
  const [activeTab, setActiveTab] = useState("info");
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: "info", icon: <FileText size={18} />, label: "Basic Info" },
    { id: "experience", icon: <Briefcase size={18} />, label: "Experience" },
    { id: "education", icon: <GraduationCap size={18} />, label: "Education" },
    { id: "skills", icon: <Code size={18} />, label: "Skills" },
    { id: "projects", icon: <Layout size={18} />, label: "Projects" },
  ];

  const updateInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleAISummary = async () => {
    if (data.experience.length === 0) return alert("Add some experience first!");
    setIsGenerating(true);
    try {
      const skillsList = data.skills.map(s => s.name);
      const res = await aiService.generateSummary(data.experience, skillsList);
      onChange({ ...data, summary: res.summary });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      achievements: [""]
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: ""
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: 80,
      category: "Technical"
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const addProject = () => {
    const newProj: Project = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      url: ""
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const removeItem = (type: keyof ResumeData, id: string) => {
    const list = data[type] as any[];
    onChange({ ...data, [type]: list.filter(item => item.id !== id) });
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Tab Header */}
      <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id 
              ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" 
              : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {activeTab === "info" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  value={data.personalInfo.fullName}
                  onChange={(e) => updateInfo("fullName", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                <input 
                  type="email" 
                  value={data.personalInfo.email}
                  onChange={(e) => updateInfo("email", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone</label>
                <input 
                  type="text" 
                  value={data.personalInfo.phone}
                  onChange={(e) => updateInfo("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="space-y-4 pt-10 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-indigo-100 pl-4">Professional Summary</h2>
                <button 
                  onClick={handleAISummary}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 disabled:opacity-50 transition-all border border-indigo-100 shadow-sm"
                >
                  <Sparkles size={14} />
                  {isGenerating ? "Thinking..." : "AI Generate"}
                </button>
              </div>
              <textarea 
                value={data.summary}
                onChange={(e) => onChange({...data, summary: e.target.value})}
                className="w-full h-40 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed italic"
                placeholder="Briefly describe your professional background and key strengths..."
              />
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Work History</h2>
              <button 
                onClick={addExperience}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-indigo-200 shadow-lg"
              >
                <Plus size={18} />
                Add Entry
              </button>
            </div>
            
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group animate-in zoom-in-95 duration-300">
                <button 
                  onClick={() => removeItem("experience", exp.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={exp.company}
                    onChange={(e) => {
                      const newList = [...data.experience];
                      newList[idx].company = e.target.value;
                      onChange({...data, experience: newList});
                    }}
                    placeholder="Company Name"
                    className="col-span-2 text-lg font-bold bg-transparent outline-none border-b border-transparent focus:border-indigo-300 transition-all"
                  />
                  <input 
                    type="text" 
                    value={exp.role}
                    onChange={(e) => {
                      const newList = [...data.experience];
                      newList[idx].role = e.target.value;
                      onChange({...data, experience: newList});
                    }}
                    placeholder="Role (e.g. Senior Software Engineer)"
                    className="col-span-2 text-slate-600 bg-transparent outline-none border-b border-transparent focus:border-indigo-300 transition-all font-medium"
                  />
                  <input 
                    type="text" 
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newList = [...data.experience];
                      newList[idx].startDate = e.target.value;
                      onChange({...data, experience: newList});
                    }}
                    className="px-3 py-2 bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-indigo-200 outline-none" 
                  />
                  <div className="col-span-2 space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Achievements</label>
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex gap-2">
                        <input 
                          type="text" 
                          value={ach}
                          onChange={(e) => {
                            const newList = [...data.experience];
                            newList[idx].achievements[aIdx] = e.target.value;
                            onChange({...data, experience: newList});
                          }}
                          className="flex-1 px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-indigo-200 outline-none"
                          placeholder="Reduced server costs by 40%..."
                        />
                        <button 
                          onClick={() => {
                            const newList = [...data.experience];
                            newList[idx].achievements.splice(aIdx, 1);
                            onChange({...data, experience: newList});
                          }}
                          className="p-2 text-slate-300 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newList = [...data.experience];
                        newList[idx].achievements.push("");
                        onChange({...data, experience: newList});
                      }}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Achievement
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ... similar updates for education, skills, projects ... */}
        {activeTab === "education" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Education</h2>
              <button 
                onClick={addEducation}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-indigo-200 shadow-lg"
              >
                <Plus size={18} />
                Add Education
              </button>
            </div>
            
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                <button 
                  onClick={() => removeItem("education", edu.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={edu.school}
                    onChange={(e) => {
                      const newList = [...data.education];
                      newList[idx].school = e.target.value;
                      onChange({...data, education: newList});
                    }}
                    placeholder="University Name"
                    className="col-span-2 text-lg font-bold bg-transparent outline-none focus:ring-1 focus:ring-indigo-200 rounded px-1"
                  />
                  <input 
                    type="text" 
                    value={edu.degree}
                    onChange={(e) => {
                      const newList = [...data.education];
                      newList[idx].degree = e.target.value;
                      onChange({...data, education: newList});
                    }}
                    placeholder="Degree Name"
                    className="col-span-2 text-slate-600 bg-transparent outline-none focus:ring-1 focus:ring-indigo-200 rounded px-1 font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
              <button 
                onClick={addSkill}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-indigo-200 shadow-lg"
              >
                <Plus size={18} />
                Add Skill
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, idx) => (
                <div key={skill.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-indigo-200 transition-colors">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={skill.name}
                      onChange={(e) => {
                        const newList = [...data.skills];
                        newList[idx].name = e.target.value;
                        onChange({...data, skills: newList});
                      }}
                      placeholder="Skill name"
                      className="w-full bg-transparent font-bold outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => removeItem("skills", skill.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
              <button 
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-indigo-200 shadow-lg"
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>
            
            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group hover:border-indigo-200 transition-colors">
                <button 
                  onClick={() => removeItem("projects", proj.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <input 
                  type="text" 
                  value={proj.title}
                  onChange={(e) => {
                    const newList = [...data.projects];
                    newList[idx].title = e.target.value;
                    onChange({...data, projects: newList});
                  }}
                  placeholder="Project Title"
                  className="w-full text-lg font-bold bg-transparent outline-none mb-2"
                />
                <textarea 
                  value={proj.description}
                  onChange={(e) => {
                    const newList = [...data.projects];
                    newList[idx].description = e.target.value;
                    onChange({...data, projects: newList});
                  }}
                  placeholder="Project Description"
                  className="w-full bg-transparent outline-none text-slate-600 text-sm resize-none h-20 font-medium"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Cloud Sync Active
        </div>
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition-all"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
