import os
import json
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
from pydantic import BaseModel
from typing import List
from groq import Groq

app = FastAPI(title="AI Placement Copilot API")

# Whitelisting all your local development server ports for seamless communication
origins = [
    "http://localhost:5173", "http://127.0.0.1:5173",
    "http://localhost:5174", "http://127.0.0.1:5174",
    "http://localhost:5175", "http://127.0.0.1:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# 🚀 INITIALIZE THE FREE GROQ CLIENT
# Paste your active 'gsk_' key directly inside the quotes below
client = Groq(api_key="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")


@app.get("/")
def read_root():
    return {"status": "success", "message": "Backend server is running perfectly on Free Groq Engine!"}


# =====================================================================
# MODULE 1: RESUME SCANNER & ROADMAP PIPELINE
# =====================================================================
@app.post("/api/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    try:
        # 1. Parse binary text stream from uploaded PDF
        file_bytes = await file.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        extracted_text = ""
        for page in doc:
            extracted_text += page.get_text()
            
        if not extracted_text.strip():
            return {"status": "error", "message": "Could not extract text from the PDF."}

        # 2. Build explicit JSON prompt structure for Llama 3.1
        prompt = f"""
        You are an expert technical recruiter and ATS evaluation engine. Analyze this resume text and return a valid JSON object matching this exact structure layout. Do not include markdown code blocks, backticks, or text before/after the JSON string.

        JSON Structure: {{
            "ats_score": 85,
            "matched_skills": ["Skill1", "Skill2"],
            "missing_skills": ["Skill3", "Skill4"],
            "placement_probability": "High",
            "detailed_feedback": "Feedback string here.",
            "roadmap": [
                {{"week": "Week 1", "topic": "Topic Name", "description": "Details"}},
                {{"week": "Week 2", "topic": "Topic Name", "description": "Details"}},
                {{"week": "Week 3", "topic": "Topic Name", "description": "Details"}},
                {{"week": "Week 4", "topic": "Topic Name", "description": "Details"}}
            ]
        }}

        Resume text to analyze:
        {extracted_text}
        """

        # 3. Fire request to Groq's active free-tier instant model
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        ai_data = json.loads(completion.choices[0].message.content)
        return {"status": "success", "data": ai_data}
        
    except Exception as e:
        print(f"Error analyzing resume: {e}")
        return {"status": "error", "message": str(e)}


# =====================================================================
# MODULE 2: LIVE INTERVIEW PROCTOR EVALUATOR
# =====================================================================
@app.post("/api/evaluate-answer")
async def evaluate_answer(submission: dict):
    try:
        question = submission.get("question")
        user_answer = submission.get("user_answer")

        # 1. Prompt forcing structural logic breakdown back to the React client
        prompt = f"""
        You are an elite technical interviewer proctoring a developer assessment. Analyze the question and answer provided below, then return a valid JSON object matching this exact structure layout. Do not include markdown code blocks, backticks, or conversational narrative outside the JSON object.

        JSON Structure: {{
            "score": 90,
            "correctness": "Correct",
            "strengths": "Strengths detail text.",
            "weaknesses_and_gaps": "Gaps detail text.",
            "ideal_answer_or_code": "Pristine code snippet or senior engineering explanation text."
        }}

        Question: {question}
        User Answer: {user_answer}
        """

        # 2. Process metrics via Groq pipeline
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        eval_data = json.loads(completion.choices[0].message.content)
        return {"status": "success", "data": eval_data}
        
    except Exception as e:
        print(f"Error evaluating answer: {e}")
        return {"status": "error", "message": str(e)}



        # --- MODULE 2: QUESTION GENERATION SCHEMAS ---
# --- MODULE 2: QUESTION GENERATION SCHEMAS ---
class QuestionRequest(BaseModel):
    missing_skills: List[str]

@app.post("/api/generate-question")
async def generate_question(request: QuestionRequest):
    try:
        skills_to_test = request.missing_skills if request.missing_skills else ["Backend Engineering", "Databases", "APIs", "Algorithms"]
        skills_string = ", ".join(skills_to_test)

        prompt = f"""
        You are an elite technical interviewer running an adaptive engineering assessment. 
        Review this target domain of identified candidate skill gaps: [{skills_string}].
        
        Dynamically choose ONE of the following interview types to generate:
        1. TYPE: ALGORITHMIC CODING - A hands-on LeetCode style problem requiring an actual programmatic code solution function.
        2. TYPE: SYSTEM DESIGN & ARCHITECTURE - A high-level architectural scenario prompt requiring system block breakdowns, structural trade-offs, database choices, or design notes.

        Return a valid JSON object matching this exact structure layout. Do not include markdown code blocks, backticks, or text before/after the JSON string.

        JSON Structure: {{
            "question_type": "CODING" or "ARCHITECTURE",
            "skill": "The specific domain framework or concept picked",
            "question": "The problem or architectural challenge scenario description text here. Make it deep and situational.",
            "editor_stub": "Prisinte code function block template if CODING, or a structured architectural review text outline checklist if ARCHITECTURE."
        }}
        """

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        question_data = json.loads(completion.choices[0].message.content)
        return {"status": "success", "data": question_data}
        
    except Exception as e:
        print(f"Error generating mixed question: {e}")
        return {
            "status": "success", 
            "data": {
                "question_type": "CODING",
                "skill": "Algorithms",
                "question": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                "editor_stub": "def two_sum(nums, target):\n    # Write your optimal O(N) solution below\n    pass"
            }
        }