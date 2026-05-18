import React from "react";
import { Plus, FileText, MoreVertical, Trash2, Edit3, Download, Sparkles, TrendingUp } from "lucide-react";
import { ResumeData } from "../types";
import { motion } from "motion/react";

interface Props {
  resumes: ResumeData[];
  onCreate: () => void;
  onEdit: (resume: ResumeData) => void;
  onDelete: (id: string) => void;
  userName: string;
}

export default function Dashboard({ resumes, onCreate, onEdit, onDelete, userName }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <FileText size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">Elite <span className="text-indigo-600 underline decoration-indigo-200">AI</span></span>
        </div>
        
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
            <Layout size={18} />
            My Resumes
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <User size={18} />
            Profile
          </a>
        </nav>

        <div className="mt-auto p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-1">Pro Account</div>
          <div className="text-[11px] text-indigo-600 leading-tight mb-3">Unlock 15+ premium templates and unlimited AI generations.</div>
          <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">Upgrade Now</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Welcome back, {userName}!</h1>
            <p className="text-slate-500 font-medium">Manage your resumes and career documents.</p>
          </div>
          <button 
            onClick={onCreate}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition-all"
          >
            <Plus size={20} />
            Create New CV
          </button>
        </header>

        {/* Stats Row - Bento Style */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
              <TrendingUp size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 relative z-10">88%</div>
            <div className="text-sm text-slate-400 font-bold uppercase tracking-tighter relative z-10">Average ATS Score</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
              <FileText size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 relative z-10">{resumes.length}</div>
            <div className="text-sm text-slate-400 font-bold uppercase tracking-tighter relative z-10">Active Resumes</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
              <Sparkles size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 relative z-10">12</div>
            <div className="text-sm text-slate-400 font-bold uppercase tracking-tighter relative z-10">AI Suggestions Applied</div>
          </div>
        </div>

        {/* Resume List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {resumes.map((resume) => (
            <motion.div 
              key={resume.id}
              layoutId={resume.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="aspect-[1/1.4] bg-slate-50 relative overflow-hidden flex items-start justify-center p-4">
                {/* Scaled down preview */}
                <div className="w-[150%] origin-top scale-[0.4] shadow-2xl bg-white p-4 pointer-events-none">
                   <div className="h-4 w-1/3 bg-slate-200 rounded mb-6" />
                   <div className="h-2 w-full bg-slate-100 rounded mb-2" />
                   <div className="h-2 w-full bg-slate-100 rounded mb-2" />
                   <div className="h-2 w-2/3 bg-slate-100 rounded" />
                   <div className="mt-8 space-y-4">
                     <div className="h-10 w-full bg-slate-50 rounded shadow-sm" />
                     <div className="h-10 w-full bg-slate-50 rounded shadow-sm" />
                   </div>
                </div>
                
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                  <button 
                    onClick={() => onEdit(resume)}
                    className="p-3 bg-white text-slate-900 rounded-xl hover:scale-110 transition-transform shadow-lg"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button className="p-3 bg-white text-slate-900 rounded-xl hover:scale-110 transition-transform shadow-lg">
                    <Download size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 truncate pr-4">{resume.title}</h3>
                  <div className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded font-black uppercase">Modern</div>
                </div>
                <div className="text-xs text-slate-400 font-medium">Last edited 2h ago</div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between">
                   <button 
                    onClick={() => onDelete(resume.id!)}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                   >
                    <Trash2 size={16} />
                   </button>
                   <button 
                    onClick={() => onEdit(resume)}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                   >
                    Edit Resume
                   </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty Add State */}
          <button 
            onClick={onCreate}
            className="group aspect-[1/1.4] rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-indigo-500"
          >
            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-all">
              <Plus size={32} />
            </div>
            <span className="font-bold tracking-tight">Create New</span>
          </button>
        </div>
      </main>
    </div>
  );
}

// Missing icons in imports
import { Layout, User } from "lucide-react";
