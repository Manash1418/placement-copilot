import CoverPage from './CoverPage';
import { useState, useEffect } from 'react';
import React from 'react'; // Added explicit import for React hooks safety if using older versions
import axios from 'axios';

function App() {
  // --- NEW: COVERSHEET AND VIEW ROUTING SYSTEM ---
  const [showApp, setShowApp] = useState(false);

  const [backendMessage, setBackendMessage] = useState('CONNECTING TO BACKEND...');
  const [serverStatus, setServerStatus] = useState('loading');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('home');

  // --- INTERVIEW WORKSPACE STATES ---
  const [currentQuestion, setCurrentQuestion] = useState("Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.");
  const [activeSkill, setActiveSkill] = useState("Algorithms");
  const [questionType, setQuestionType] = useState("CODING");
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(false);

  // --- LIVE TIMER STATE (25 Minutes Standard) ---
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerActive, setTimerActive] = useState(true);

  // --- INTERACTIVE MULTI-FILE TEXT EDITOR STORAGE ---
  const [selectedFileTab, setSelectedFileTab] = useState('main_file');
  const [editorContents, setEditorContents] = useState({
    main_file: "def two_sum(nums, target):\n    # Write your optimal O(N) solution below\n    pass",
    test_cases: "{\n  \"test_case_1\": {\n    \"nums\": [2, 7, 11, 15],\n    \"target\": 9\n  }\n}",
    diagram_notes: "# SYSTEM INFRASTRUCTURE NODE CONFIGURATIONS\n- Ingestion Gateway Tier\n- Distributed Compute Pool\n- Persistence Matrix"
  });

  // --- EFFECT: HARDWARE COUNTDOWN CLOCK TICKER ---
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Format integer seconds into MM:SS layout
  const formatTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle local data switching inside code editor pane
  const updateEditorText = (textValue) => {
    setEditorContents(prev => ({
      ...prev,
      [selectedFileTab]: textValue
    }));
  };

  // Dynamic state mapper for compiler choice dropdown toggles
  const handleCompilerChange = (lang) => {
    if (lang === 'c') {
      setEditorContents(prev => ({
        ...prev,
        main_file: "#include <stdio.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Implement optimal pointer sorting logic layout here\n    return NULL;\n}"
      }));
    } else {
      setEditorContents(prev => ({
        ...prev,
        main_file: "def two_sum(nums, target):\n    # Write your optimal O(N) solution below\n    pass"
      }));
    }
  };

  // --- INTERACTIVE QUICK PROFILE LOAD DISPATCH ENGINE ---
  const loadQuickProfile = (profileType) => {
    setLoading(true);
    setTimeout(() => {
      if (profileType === 'Senior') {
        const mockSenior = {
          ats_score: 94,
          matched_skills: ["C", "C++", "Data Structures & Algorithms", "Git & GitHub", "Problem Solving", "Teamwork", "FastAPI", "SQL Databases", "System Design"],
          missing_skills: ["Machine Learning", "Cloud Computing Deployments"],
          placement_probability: "Exceptionally High",
          detailed_feedback: "Demonstrates exceptional maturity across microservices, asynchronous execution blocks, and memory-safe code optimizations.",
          roadmap: [
            { week: "Week 1", topic: "Distributed Machine Learning Pipelines", description: "Master tensor transformations and inference optimizations via Triton server configurations." },
            { week: "Week 2", topic: "Cloud Native Deployment Scale", description: "Audit multi-region orchestration patterns using automated infrastructure deployment scripts." }
          ]
        };
        setResult(mockSenior);
        fetchNewQuestion(mockSenior.missing_skills);
      } else if (profileType === 'Self-Taught') {
        const mockSelfTaught = {
          ats_score: 72,
          matched_skills: ["Python", "FastAPI", "Git & GitHub", "Communication", "Quick Learning"],
          missing_skills: ["C", "C++", "Data Structures & Algorithms", "SQL Databases"],
          placement_probability: "Medium",
          detailed_feedback: "Strong application building foundations. Needs to significantly fortify lower-level core computer science principles and database indexing optimizations.",
          roadmap: [
            { week: "Week 1-2", topic: "Pointers & Memory Layouts in C", description: "Deep dive into allocation, stack verification, and reference logic blocks." },
            { week: "Week 3-4", topic: "Relational Indexing & Join Performance", description: "Optimize transaction layers and isolate resource blocks." }
          ]
        };
        setResult(mockSelfTaught);
        fetchNewQuestion(mockSelfTaught.missing_skills);
      } else {
        const mockNonCS = {
          ats_score: 64,
          matched_skills: ["Python", "Problem Solving", "Teamwork", "Leadership"],
          missing_skills: ["FastAPI", "SQL Databases", "Data Structures", "Git & GitHub"],
          placement_probability: "Targeted Adjustment Required",
          detailed_feedback: "Analytical mindset is present, but complete engineering portfolio architecture patterns need immediate expansion to comply with enterprise software screening filters.",
          roadmap: [
            { week: "Week 1", topic: "Asynchronous API Routing Layers", description: "Build scalable route routers and validate request payloads." },
            { week: "Week 2", topic: "Relational Modeling Schemes", description: "Map enterprise entity boundaries and handle cascading mutations safely." }
          ]
        };
        setResult(mockNonCS);
        fetchNewQuestion(mockNonCS.missing_skills);
      }
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    axios.get('https://placement-copilot-buvp.onrender.com/')
      .then((response) => {
        setBackendMessage(response.data.message.toUpperCase());
        setServerStatus('connected');
      })
      .catch((error) => {
        console.error(error);
        setBackendMessage('BACKEND OFFLINE - HANDSHAKE FAILED');
        setServerStatus('error');
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setErrorMsg('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMsg('Please upload a PDF resume first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.post('https://placement-copilot-buvp.onrender.com/api/analyze-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.status === 'success') {
        setResult(response.data.data);
        fetchNewQuestion(response.data.data.missing_skills);
      } else {
        setErrorMsg(`Analysis Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to process with the AI Engine.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewQuestion = async (skillsList) => {
    const targetSkills = skillsList || (result ? result.missing_skills : ["Python", "FastAPI", "SQL Databases", "Data Structures"]);
    setQuestionLoading(true);
    try {
      const response = await axios.post('https://placement-copilot-buvp.onrender.com/api/generate-question', {
        missing_skills: targetSkills
      });
      if (response.data.status === 'success') {
        const aiChallenge = response.data.data;
        setCurrentQuestion(aiChallenge.question);
        setActiveSkill(aiChallenge.skill);
        setQuestionType(aiChallenge.question_type || "CODING");
        
        setTimeLeft(1500);
        setTimerActive(true);
        setEditorContents(prev => ({
          ...prev,
          main_file: aiChallenge.editor_stub || ""
        }));
        setEvalResult(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    setEvalLoading(true);
    try {
      // FIXED: Swapped out localhost for your live production Render API deployment link
      const response = await axios.post('https://placement-copilot-buvp.onrender.com/api/evaluate-answer', {
        question: currentQuestion,
        user_answer: editorContents.main_file
      });
      if (response.data.status === 'success') {
        setEvalResult(response.data.data);
        setTimerActive(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEvalLoading(false);
    }
  };

  // --- INTERCEPT ROUTING: Show cover details if user hasn't clicked past it ---
  if (!showApp) {
    return <CoverPage onExplore={() => setShowApp(true)} />;
  }

  // --- PRIMARY DASHBOARD HTML APP COMPONENT VIEW ---
  return (
    <div style={{ backgroundColor: '#0b111e', color: '#f1f5f9', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box', margin: 0, minHeight: '100vh' }}>
      
      {/* HEADER SYSTEM BAR */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2.5rem', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#0284c7', color: 'white', padding: '0.4rem 0.6rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>🤖</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '0.5px', color: '#e2e8f0' }}>Placement Copilot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            onClick={() => setShowApp(false)}
            style={{ backgroundColor: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            ← View Cover Page
          </button>
          <button onClick={() => setActiveTab('mock-qa')} style={{ backgroundColor: 'transparent', border: '1px solid #0284c7', color: '#38bdf8', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
            + Mock Session
          </button>
        </div>
      </header>

      {/* MAIN SCREEN DISPATCH HUB */}
      <div style={{ padding: '2rem 2.5rem 8rem 2.5rem', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* TAB 1: HOME PANEL (COMPACT SIDE-BY-SIDE GRID) */}
        {activeTab === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Intake Left Controls Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h1 style={{ fontSize: '2rem', margin: '0 0 0.25rem 0', color: '#ffffff' }}>AI Placement Copilot 🚀</h1>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>Instant Profile Analytics, ATS Assessment & Learning Roadmaps</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid #1e293b', paddingTop: '1rem' }}>
                  <div style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: serverStatus === 'connected' ? '#14532d' : '#7f1d1d', color: serverStatus === 'connected' ? '#4ade80' : '#fca5a5' }}>
                    ● SYNC: {backendMessage}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 'bold' }}>QUICK-PROFILES:</span>
                    <button onClick={() => loadQuickProfile('Senior')} style={{ backgroundColor: '#00d2ff', color: '#0b111e', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Senior</button>
                    <button onClick={() => loadQuickProfile('Self-Taught')} style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid #334155', cursor: 'pointer' }}>Self</button>
                    <button onClick={() => loadQuickProfile('Non-CS')} style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid #334155', cursor: 'pointer' }}>Non-CS</button>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Paste Resume/CV Text or Drag & Drop:</h3>
                <p style={{ color: '#64748b', margin: '0 0 1rem 0', fontSize: '0.85rem' }}>Upload profiles to execute compatibility evaluations.</p>
                
                <div style={{ backgroundColor: '#0f172a', border: '1px dashed #334155', borderRadius: '10px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <label style={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#e2e8f0', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    Browse Resume
                    <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedFile ? selectedFile.name : 'No file chosen...'}</span>
                </div>

                <div style={{ position: 'relative', backgroundColor: '#070a13', borderRadius: '10px', border: '1px solid #1e293b', padding: '0.75rem' }}>
                  <textarea rows="3" placeholder="Paste structural CV details directly into this panel matrix space..." style={{ width: '100%', border: 'none', backgroundColor: 'transparent', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none', fontFamily: 'monospace', resize: 'none' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
                    <span style={{ color: '#475569', fontSize: '0.8rem' }}>Core parsing pipeline ready</span>
                    <button onClick={handleUpload} disabled={loading} style={{ background: 'linear-gradient(90deg, #b3f6ff, #d4f9ff)', color: '#0f172a', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                      {loading ? 'Analyzing...' : '🚀 Launch Audit'}
                    </button>
                  </div>
                </div>
                {errorMsg && <p style={{ color: '#ef4444', marginTop: '0.75rem', fontSize: '0.8rem' }}>{errorMsg}</p>}
              </div>
            </div>

            {/* Right Result Column Stack */}
            {result && (
              <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>ATS Compatibility Score</h3>
                  <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(#00d2ff 0% ${result.ats_score}%, #1e293b ${result.ats_score}% 100%)`, boxShadow: '0 0 20px rgba(0,210,255,0.15)' }}>
                    <div style={{ width: '106px', height: '106px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff' }}>{result.ats_score}</span>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'monospace' }}>/100</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: '#4ade80', fontSize: '0.85rem', fontWeight: 'bold' }}>✓ Verified Strengths</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {result.matched_skills.map((skill, i) => <span key={i} style={{ backgroundColor: '#14532d', color: '#4ade80', fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid #15803d' }}>{skill}</span>)}
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: '#f87171', fontSize: '0.85rem', fontWeight: 'bold' }}>⚠ Critical Skill Gaps</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {result.missing_skills.map((skill, i) => <span key={i} style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid #991b1b' }}>{skill}</span>)}
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#0a0f1d', borderLeft: '4px solid #00d2ff', borderRadius: '8px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#00d2ff', fontSize: '0.85rem', fontWeight: 'bold' }}>✨ Career Placement Analysis</h4>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.4' }}>{result.detailed_feedback}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TECHNICAL INTERVIEW LABORATORY WORKSPACE */}
        {activeTab === 'mock-qa' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#ffffff' }}>Technical Evaluation Room 🖥️</h2>
              <button onClick={() => fetchNewQuestion()} disabled={questionLoading} style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
                {questionLoading ? 'Generating Challenge...' : '🔄 Next Random Gap Challenge'}
              </button>
            </div>

            <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '1.25rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifycontent: 'space-between', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                <span>TOPIC DOMAIN: <strong style={{ color: '#e2e8f0' }}>{activeSkill}</strong></span>
                <span style={{ color: '#f43f5e', fontFamily: 'monospace', letterSpacing: '0.5px' }}>⏳ TIMER: {formatTimer()}</span>
              </div>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#f1f5f9', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{currentQuestion}</p>
            </div>

            <div style={{ border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#070a13' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', backgroundColor: '#0f172a', padding: '0.4rem 1rem', borderBottom: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '4px' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308', marginRight: '4px' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', marginRight: '12px' }} />
                  
                  <button onClick={() => setSelectedFileTab('main_file')} style={{ backgroundColor: selectedFileTab === 'main_file' ? '#1e293b' : 'transparent', color: selectedFileTab === 'main_file' ? '#38bdf8' : '#64748b', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}>
                    📄 {questionType === 'CODING' ? 'solution.py' : 'architecture_notes.txt'}
                  </button>
                  <button onClick={() => setSelectedFileTab('test_cases')} style={{ backgroundColor: selectedFileTab === 'test_cases' ? '#1e293b' : 'transparent', color: selectedFileTab === 'test_cases' ? '#38bdf8' : '#64748b', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem', cursor: 'pointer' }}>
                    📄 test_cases.json
                  </button>
                  <button onClick={() => setSelectedFileTab('diagram_notes')} style={{ backgroundColor: selectedFileTab === 'diagram_notes' ? '#1e293b' : 'transparent', color: selectedFileTab === 'diagram_notes' ? '#38bdf8' : '#64748b', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem', cursor: 'pointer' }}>
                    📄 blueprints.md
                  </button>
                </div>
                
                {questionType === 'CODING' ? (
                  <select onChange={(e) => handleCompilerChange(e.target.value)} style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace', outline: 'none', cursor: 'pointer' }}>
                    <option value="python3">Python 3.10</option>
                    <option value="c">C (GCC 11)</option>
                  </select>
                ) : (
                  <span style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'monospace' }}>Markdown Sync Active</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr' }}>
                <div style={{ backgroundColor: '#0b111e', borderRight: '1px solid #1e293b', padding: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ color: '#475569', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.70rem' }}>Explorer Workspace</div>
                  <div onClick={() => setSelectedFileTab('main_file')} style={{ color: selectedFileTab === 'main_file' ? '#38bdf8' : '#64748b', padding: '0.3rem', backgroundColor: selectedFileTab === 'main_file' ? '#1e293b' : 'transparent', borderRadius: '4px', fontFamily: 'monospace', marginBottom: '0.2rem', cursor: 'pointer' }}>
                    💾 {questionType === 'CODING' ? 'solution.py' : 'architecture_notes.txt'}
                  </div>
                  <div onClick={() => setSelectedFileTab('test_cases')} style={{ color: selectedFileTab === 'test_cases' ? '#38bdf8' : '#64748b', padding: '0.3rem', backgroundColor: selectedFileTab === 'test_cases' ? '#1e293b' : 'transparent', borderRadius: '4px', fontFamily: 'monospace', marginBottom: '0.2rem', cursor: 'pointer' }}>
                    💾 test_cases.json
                  </div>
                  <div onClick={() => setSelectedFileTab('diagram_notes')} style={{ color: selectedFileTab === 'diagram_notes' ? '#38bdf8' : '#64748b', padding: '0.3rem', backgroundColor: selectedFileTab === 'diagram_notes' ? '#1e293b' : 'transparent', borderRadius: '4px', fontFamily: 'monospace', cursor: 'pointer' }}>
                    💾 blueprints.md
                  </div>
                </div>

                <div>
                  <textarea 
                    value={editorContents[selectedFileTab]}
                    onChange={(e) => updateEditorText(e.target.value)}
                    style={{ width: '100%', height: '200px', backgroundColor: 'transparent', border: 'none', color: '#e2e8f0', padding: '1rem', fontSize: '0.95rem', fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: '1.5' }}
                  />
                </div>
              </div>

              <div style={{ backgroundColor: '#090d16', borderTop: '1px solid #1e293b', padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifycontent: 'space-between', color: '#00d2ff', marginBottom: '0.25rem', fontWeight: 'bold' }}>
                  <span>&gt;_ CONSOLE METRICS LOGS</span>
                  <span style={{ color: '#475569', cursor: 'pointer' }} onClick={() => updateEditorText('')}>Reset File</span>
                </div>
                <div style={{ color: '#94a3b8' }}>
                  {selectedFileTab === 'main_file' && `[VIRTUAL CONTAINER] Buffered tab text mapping. Active mode validation standard enabled.`}
                  {selectedFileTab === 'test_cases' && `[JSON SCHEMAS] Parsing structural dictionary input metrics. Ready for variable inject testing.`}
                  {selectedFileTab === 'diagram_notes' && `[MARKDOWN INTERFACES] System documentation matrix synced to local engine block buffer.`}
                </div>
              </div>
            </div>

            <button onClick={handleAnswerSubmit} disabled={evalLoading} style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(90deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              {evalLoading ? 'Processing Evaluation Strings...' : '⚡ Submit Solution for Evaluation'}
            </button>

            {evalResult && (
              <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: '#00d2ff', fontWeight: 'bold' }}>Assessment Score Breakdown</h4>
                  <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#34d399' }}>{evalResult.score} / 100 <small style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>({evalResult.correctness})</small></span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <h5 style={{ margin: '0 0 0.4rem 0', color: '#34d399', fontSize: '0.85rem', fontWeight: 'bold' }}>Key Strengths Demonstrated</h5>
                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.4' }}>{evalResult.strengths}</p>
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 0.4rem 0', color: '#f87171', fontSize: '0.85rem', fontWeight: 'bold' }}>Conceptual / Architectural Gaps</h5>
                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.4' }}>{evalResult.weaknesses_and_gaps}</p>
                  </div>
                </div>
                <div style={{ marginTop: '1.25rem', backgroundColor: '#070a13', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
                  <h5 style={{ margin: '0 0 0.4rem 0', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 'bold' }}>Ideal Production-Grade Reference Blueprint</h5>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{evalResult.ideal_answer_or_code}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TIMELINE MILESTONE TRACK ROADMAP */}
        {activeTab === 'roadmap' && (
          <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '2.5rem', borderRadius: '16px' }}>
            <h2 style={{ marginTop: 0, color: '#ffffff', fontSize: '1.4rem' }}>Personalized Skill-Gap Bridging Roadmap</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 2rem 0' }}>Step-by-step target preparation schedule generated with respect to discovered critical profile limitations.</p>
            {result ? (
              <div style={{ borderLeft: '2px solid #0284c7', paddingLeft: '2rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {result.roadmap.map((step, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-41px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#00d2ff', border: '4px solid #111827', boxShadow: '0 0 10px #00d2ff' }} />
                    <span style={{ backgroundColor: '#1e293b', color: '#00d2ff', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold' }}>🗓️ {step.week.toUpperCase()}</span>
                    <h3 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.15rem', color: '#ffffff' }}>{step.topic}</h3>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.4' }}>{step.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2.5rem', textAlign: 'center', color: '#475569', border: '1px dashed #1e293b', borderRadius: '12px' }}>
                Please analyze your core resume configuration matrix inside the Home Tab to unlock targeted baseline roadmap milestones.
              </div>
            )}
          </div>
        )}

      </div>

      {/* 🧭 NAVIGATION FLOATING DOCK */}
      <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid #1e293b', padding: '0.4rem 1.75rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '2.5rem', boxShadow: '0 10px 32px rgba(0,0,0,0.6)', zIndex: 1000 }}>
        <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '0.4rem', opacity: activeTab === 'home' ? 1 : 0.35 }}>
          <span style={{ fontSize: '1.25rem' }}>📊</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '0.2rem', color: activeTab === 'home' ? '#00d2ff' : '#94a3b8' }}>Home</span>
        </button>
        <button onClick={() => setActiveTab('mock-qa')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '0.4rem', opacity: activeTab === 'mock-qa' ? 1 : 0.35 }}>
          <span style={{ fontSize: '1.25rem', color: activeTab === 'mock-qa' ? '#00d2ff' : '#94a3b8', fontFamily: 'monospace', fontWeight: 'bold' }}>&gt;_</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '0.2rem', color: activeTab === 'mock-qa' ? '#00d2ff' : '#94a3b8' }}>Mock QA</span>
        </button>
        <button onClick={() => setActiveTab('roadmap')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '0.4rem', opacity: activeTab === 'roadmap' ? 1 : 0.35 }}>
          <span style={{ fontSize: '1.25rem' }}>🗺️</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '0.2rem', color: activeTab === 'roadmap' ? '#00d2ff' : '#94a3b8' }}>Roadmap</span>
        </button>
      </div>

    </div>
  );
}

export default App;