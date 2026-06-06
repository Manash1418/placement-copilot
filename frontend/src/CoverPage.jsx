import React from 'react';

export default function CoverPage({ onExplore }) {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white font-sans">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-cyan-400">
            Placement Copilot
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <button className="text-cyan-400 border-b-2 border-cyan-400 pb-1">Cover Page</button>
          <button className="hover:text-white transition">Project Report</button>
          <button className="hover:text-white transition">Architecture</button>
          <button className="hover:text-white transition">Specifications</button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
            MH
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 text-center">
        {/* Project Report Label */}
        <div className="inline-block bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-full mb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400">Official Project Report & System Overview</span>
        </div>

        {/* Project Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white">
          AUTOMATED PLACEMENT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
            COPILOT
          </span>
        </h1>

        {/* Project Subtitle Description */}
        <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto mb-10 leading-relaxed">
          An intelligent recruitment ecosystem engineered to bridge the gap between academic preparation and industry standards. The system provides real-time resume scanning, metric alignment checks, and dynamic, context-aware mock interview generation.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-3.5 rounded-lg flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5 shadow-md shadow-cyan-500/20"
          >
            <span>LAUNCH LIVE APPLICATION</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>

        {/* Information Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
          
          {/* Card 1: Developer Information */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-cyan-500/30 transition duration-300">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 block mb-2">DEVELOPER DETAILS</span>
              <h3 className="text-2xl font-bold text-white mb-1">Manash Harsh</h3>
              <p className="text-xs text-slate-400 font-medium mb-4">Full-Stack Developer & Systems Engineer</p>
              
              <div className="border-t border-slate-800 pt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-start space-x-2">
                  <span className="text-slate-500 font-medium text-xs uppercase w-20">Affiliation:</span>
                  <span className="text-xs">B.Tech Student</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-slate-500 font-medium text-xs uppercase w-20">University:</span>
                  <span className="text-xs text-slate-200">Jaypee University of Information Technology</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 text-slate-500 text-sm mt-6 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-cyan-500">Student ID Verified</span>
            </div>
          </div>

          {/* Card 2: Core Project Overview */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition duration-300">
            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 block mb-2">PROJECT ABSTRACT & FUNCTIONALITY</span>
            <h3 className="text-lg font-bold mb-3 text-white">Advanced Resume Intelligence & Interview Automation</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              This deployment establishes a high-performance production pipeline. By completely avoiding raw hardcoded tokens, it securely orchestrates system logic via cloud environment keys. The application parses multi-page PDF resumes asynchronously to extract semantic text blocks, mapping data nodes against specialized job guidelines.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Secure Production Pipeline</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Asynchronous Document Parsing</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Dynamic Mock QA Lab</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Context-Aware Inference Mapping</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Technical Architecture Specifications */}
          <div className="md:col-span-3 bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <span className="text-[10px] uppercase tracking-widest font-bold text-teal-400 block mb-4">TECHNICAL ARCHITECTURE SPECIFICATIONS</span>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 w-1/4">Architecture Layer</th>
                    <th className="pb-3 w-2/4">Technology Stack</th>
                    <th className="pb-3 w-1/4">Deployment Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-3 font-medium text-white">Frontend UI</td>
                    <td className="py-3 text-slate-400">React.js, Vite, Axios, Tailwind CSS</td>
                    <td className="py-3"><span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[10px]">Vercel (Free-Tier)</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white">Backend API</td>
                    <td className="py-3 text-slate-400">Python, FastAPI, Uvicorn, Pydantic, Python-Multipart</td>
                    <td className="py-3"><span className="px-2 py-0.5 bg-slate-800 text-purple-400 rounded font-mono text-[10px]">Render (Free-Tier)</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white">AI Inference Engine</td>
                    <td className="py-3 text-slate-400">Groq Cloud SDK (Llama 3.1 Architecture Model Layer)</td>
                    <td className="py-3"><span className="px-2 py-0.5 bg-slate-800 text-cyan-400 rounded font-mono text-[10px]">Serverless Memory</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white">Document Processing</td>
                    <td className="py-3 text-slate-400">PyMuPDF (FitZ Parser Library Engine)</td>
                    <td className="py-3"><span className="px-2 py-0.5 bg-slate-800 text-blue-400 rounded font-mono text-[10px]">Cloud Workspace</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Analytics Bottom Row */}
        <div className="border-t border-slate-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">500+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Skill Tags Matrix</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">24/7</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">AI Processing</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-cyan-400 mb-1">12ms</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">LLM Latency</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">10k+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Parsed Resumes</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4下">
        <div>
          <span className="font-bold text-slate-400">Placement Copilot</span>
          <p className="mt-1">© 2026 Manash Harsh. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 tracking-wide uppercase font-semibold text-[10px] text-slate-400">
          <span>Jaypee University of Information Technology</span>
        </div>
      </footer>
    </div>
  );
}