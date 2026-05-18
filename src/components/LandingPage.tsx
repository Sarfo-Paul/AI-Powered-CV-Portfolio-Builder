import { motion } from "motion/react";
import { Briefcase, CheckCircle, FileText, Globe, Sparkles, Zap } from "lucide-react";

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <FileText size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Elite <span className="text-indigo-600 underline decoration-indigo-200">AI</span></span>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-md"
        >
          Sign In
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
              <Sparkles size={14} />
              AI-Powered Careers
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
              Craft your <span className="text-indigo-600 italic">future</span> with precision.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Build production-ready CVs and personal portfolio websites in minutes with EliteCV's intuitive AI assistant.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3"
              >
                Start Building <Zap size={20} fill="currentColor" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors">
                View Templates
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle size={18} className="text-green-500" />
                ATS Optimized
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle size={18} className="text-green-500" />
                PDF Export
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle size={18} className="text-green-500" />
                AI Summary
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-4 overflow-hidden border border-white/50">
               <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000" 
                alt="CV Builder interface"
                className="rounded-3xl w-full h-auto shadow-inner"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
            </div>
            
            {/* Floating UI elements */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-[3s]">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle />
              </div>
              <div>
                <div className="text-sm font-bold">ATS Score: 92%</div>
                <div className="text-xs text-slate-400">Optimized for Google, Meta</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-[4s]">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Globe />
              </div>
              <div>
                <div className="text-sm font-bold">Portfolio Ready</div>
                <div className="text-xs text-slate-400">Live at elite.cv/john</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold">AI Assistant</h3>
              <p className="text-slate-500 leading-relaxed">
                Generate professional summaries, career objectives, and achievements that resonate with recruiters.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold">Premium Templates</h3>
              <p className="text-slate-500 leading-relaxed">
                Choose from a collection of designer-crafted CV templates that look polished and professional.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">Instant Portfolio</h3>
              <p className="text-slate-500 leading-relaxed">
                One-click conversion from your CV to a fully responsive, hosted personal portfolio website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
