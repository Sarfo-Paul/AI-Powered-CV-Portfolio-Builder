import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import ATSAnalyzer from "./components/ATSAnalyzer";
import { ResumeData } from "./types";
import { INITIAL_RESUME_DATA } from "./constants";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Download, Eye, Layout, Share2, Sparkles, X, LogOut, Brain } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "./components/FirebaseProvider";
import { db, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, onSnapshot, query, setDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";

type AppState = "landing" | "dashboard" | "editor";

export default function App() {
  const { user, signIn, logout } = useAuth();
  const [state, setState] = useState<AppState>("landing");
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  // Sync resumes from Firestore
  useEffect(() => {
    if (!user) {
      setResumes([]);
      if (state !== "landing") setState("landing");
      return;
    }

    if (state === "landing") setState("dashboard");

    const resumesRef = collection(db, "users", user.uid, "resumes");
    const q = query(resumesRef);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ResumeData));
      setResumes(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/resumes`);
    });

    return unsubscribe;
  }, [user]);

  const handleCreate = () => {
    const newResume: ResumeData = {
      ...INITIAL_RESUME_DATA,
      id: crypto.randomUUID(),
      title: "New Resume " + (resumes.length + 1)
    };
    setCurrentResume(newResume);
    setState("editor");
  };

  const handleSave = async () => {
    if (!currentResume || !user) return;
    
    const resumeId = currentResume.id || crypto.randomUUID();
    const docRef = doc(db, "users", user.uid, "resumes", resumeId);
    
    try {
      await setDoc(docRef, {
        ...currentResume,
        userId: user.uid,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      setState("dashboard");
      setCurrentResume(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, docRef.path);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (confirm("Are you sure you want to delete this resume?")) {
      const docRef = doc(db, "users", user.uid, "resumes", id);
      try {
        await deleteDoc(docRef);
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, docRef.path);
      }
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${currentResume?.title || 'resume'}.pdf`);
  };

  return (
    <div className="font-sans text-slate-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {state === "landing" && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage onStart={signIn} />
          </motion.div>
        )}

        {state === "dashboard" && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="absolute top-8 right-8 z-10">
               <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
               >
                 <LogOut size={16} /> Logout
               </button>
            </div>
            <Dashboard 
              userName={user?.displayName?.split(' ')[0] || "User"} 
              resumes={resumes}
              onCreate={handleCreate}
              onEdit={(r) => { setCurrentResume(r); setState("editor"); }}
              onDelete={handleDelete}
            />
          </motion.div>
        )}

        {state === "editor" && currentResume && (
          <motion.div 
            key="editor"
            className="fixed inset-0 bg-white z-50 flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            {/* Editor Top Bar */}
            <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setState("dashboard")}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                >
                  <ChevronLeft />
                </button>
                <div className="flex flex-col">
                  <input 
                    type="text" 
                    value={currentResume.title}
                    onChange={(e) => setCurrentResume({...currentResume, title: e.target.value})}
                    className="font-black tracking-tight text-lg outline-none bg-transparent"
                  />
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Editing Project</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-200 shadow-sm"
                >
                  {isPreviewOpen ? <Layout size={18} /> : <Eye size={18} />}
                  {isPreviewOpen ? "Editor View" : "Live Preview"}
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-all border border-indigo-200 shadow-sm"
                >
                  <Download size={18} />
                  Export PDF
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-200 hover:scale-105 transition-all"
                >
                  Finish Editing
                </button>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
               <div className={`flex-1 min-w-[400px] transition-all duration-500 ${isPreviewOpen ? 'hidden md:block opacity-50 pointer-events-none' : 'block'}`}>
                <ResumeEditor 
                  data={currentResume} 
                  onChange={setCurrentResume} 
                  onSave={handleSave}
                />
              </div>

              <div className={`flex-1 transition-all duration-500 ${!isPreviewOpen ? 'hidden lg:block' : 'block'}`}>
                <ResumePreview data={currentResume} />
              </div>
            </div>

            {/* AI Assistant Floating Widget */}
            <div className="fixed bottom-8 right-8 z-[60]">
               <button 
                onClick={() => setIsAnalyzerOpen(true)}
                className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:rotate-12 transition-transform group relative"
               >
                  <Brain size={28} />
                  <div className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    AI ATS Optimizer
                  </div>
               </button>
            </div>

            <ATSAnalyzer 
              data={currentResume} 
              isOpen={isAnalyzerOpen} 
              onClose={() => setIsAnalyzerOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
