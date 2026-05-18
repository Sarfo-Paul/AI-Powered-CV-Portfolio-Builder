import React, { useState } from "react";
import { ResumeData } from "../types";
import { aiService } from "../services/ai";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Sparkles, X, ChevronRight, Brain } from "lucide-react";

interface Props {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

export default function ATSAnalyzer({ data, isOpen, onClose }: Props) {
  const [analysis, setAnalysis] = useState<{ score: number, feedback: string[], interviewQuestions: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await aiService.analyzeATS(data);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <Brain size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">AI ATS Optimizer</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Analyze & Improve</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {!analysis && !loading && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Sparkles size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Ready to optimize?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">
                    Our AI will analyze your CV against modern Applicant Tracking Systems and give you tailored feedback.
                  </p>
                  <button 
                    onClick={runAnalysis}
                    className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition-all"
                  >
                    Analyze My Resume
                  </button>
                </div>
              )}

              {loading && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
                  <p className="font-bold text-slate-900">AI is reading your profile...</p>
                  <p className="text-sm text-slate-400 mt-2 font-medium">Checking keywords, formatting, and impact.</p>
                </div>
              )}

              {analysis && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                  {/* Score Circle */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="60" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle 
                          cx="64" cy="64" r="60" fill="none" stroke="#4f46e5" strokeWidth="8" 
                          strokeDasharray="377" 
                          strokeDashoffset={377 - (377 * analysis.score) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black text-indigo-600 font-mono italic">{analysis.score}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Score</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <section>
                    <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2">
                       <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <AlertCircle size={14} className="text-indigo-600" /> Key Feedback
                      </h3>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-tighter">Diagnostic v2.4</span>
                    </div>
                    <div className="grid gap-3">
                      {analysis.feedback.map((item, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm flex gap-3 group hover:border-indigo-100 transition-colors">
                          <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full shrink-0 flex items-center justify-center">
                            <span className="text-[10px] font-bold">!</span>
                          </div>
                          <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Interview Questions */}
                  <section>
                    <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2">
                       <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Brain size={14} className="text-indigo-600" /> Interview Prep
                      </h3>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-tighter">AI AGENT ACTIVE</span>
                    </div>
                    <div className="grid gap-3">
                      {analysis.interviewQuestions.map((q, i) => (
                        <div key={i} className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-sm flex gap-3 group hover:bg-white transition-colors">
                          <div className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full shrink-0 flex items-center justify-center">
                            <ChevronRight size={12} />
                          </div>
                          <span className="text-indigo-900 font-medium leading-relaxed italic">"{q}"</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>

            {analysis && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
                 <button 
                  onClick={runAnalysis}
                  className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                >
                  Recalculate Analysis
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
