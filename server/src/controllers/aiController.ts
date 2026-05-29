import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import Task from '../models/Task';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const generateTasksFromDump = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `
      You are an emotionally intelligent AI productivity assistant for MomentumOS.
      Your job is to transform messy human brain dumps into a calm, realistic, and prioritized action plan.

      The user may:
      - vent emotionally
      - write incomplete thoughts
      - mix emotions with tasks
      - mention worries, deadlines, people, responsibilities, and random thoughts

      Your responsibilities:
      1. Detect emotional state (stress, overwhelm, anxiety, sadness, frustration, excitement, motivation level, mental energy level).
      2. Extract actionable tasks. Identify all explicit and implied tasks.
      3. Detect priorities and dependencies.

      Return ONLY valid JSON in this exact format:

      {
        "emotion": {
          "stress_level": "low | medium | high",
          "overwhelm_level": "low | medium | high",
          "energy_level": "low | medium | high",
          "dominant_emotion": "..."
        },
        "summary": "Short summary of the user's state and needs",
        "tasks": [
          {
            "task": "Task name",
            "category": "work | personal | health | learning",
            "xpReward": <integer 10-100 based on effort>,
            "priority_label": "Critical | Important | Moderate | Can Wait",
            "urgency": <integer 0-10>,
            "importance": <integer 0-10>,
            "emotional_weight": <integer 0-10>,
            "deadline_score": <integer 0-10 representing proximity>,
            "estimated_effort": "low | medium | high",
            "deadline": "Descriptive deadline or null",
            "dependency": "What this depends on or null",
            "reason": "Why this needs to be done"
          }
        ],
        "recommended_plan": [
          "Step 1...",
          "Step 2..."
        ],
        "focus_recommendation": "What to do right now",
        "supportive_response": "Empathetic, calm, non-robotic response"
      }

      Priority Scoring Rules:
      - Critical = immediate deadlines or major emotional pressure
      - Important = meaningful and time-sensitive
      - Moderate = useful but not urgent
      - Can Wait = low urgency and low emotional weight

      Behavior Rules:
      - Never shame the user
      - Never overload the plan
      - Prefer clarity over completeness
      - If the user sounds mentally exhausted, prioritize stabilization first
      - If multiple heavy tasks exist, suggest the easiest meaningful starting point
      - Detect emotional blockers separately from normal tasks

      User Input: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonString = response.text();
    
    // Clean up markdown block if present
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    } else if (jsonString.startsWith('\`\`\`')) {
      jsonString = jsonString.replace(/\`\`\`/g, '').trim();
    }

    const parsedResult = JSON.parse(jsonString);
    
    // Calculate priority scores and map fields for DB
    const mappedToDb = parsedResult.tasks.map((t: any) => {
      const u = t.urgency || 0;
      const i = t.importance || 0;
      const e = t.emotional_weight || 0;
      const d = t.deadline_score || 0;
      const priorityScore = (u * 0.35) + (i * 0.30) + (e * 0.20) + (d * 0.15);
      
      return {
        title: t.task,
        category: t.category || 'personal',
        energyRequired: t.estimated_effort || 'medium',
        xpReward: t.xpReward || 20,
        status: 'pending',
        priorityScore: Number(priorityScore.toFixed(2)),
        priorityLabel: t.priority_label,
        urgency: u,
        importance: i,
        emotionalWeight: e,
        deadlineScore: d,
        deadline: t.deadline,
        dependency: t.dependency,
        reason: t.reason,
      };
    });

    const savedTasks = await Task.insertMany(mappedToDb);
    
    const mappedTasks = savedTasks.map((t: any) => {
      const obj = t.toObject();
      return { ...obj, id: obj._id.toString() };
    });

    res.status(200).json({ 
      emotion: parsedResult.emotion,
      summary: parsedResult.summary,
      recommended_plan: parsedResult.recommended_plan,
      focus_recommendation: parsedResult.focus_recommendation,
      supportive_response: parsedResult.supportive_response,
      tasks: mappedTasks 
    });

  } catch (error) {
    console.error('AI Processing Error:', error);
    res.status(500).json({ error: 'Failed to process brain dump' });
  }
};

export const generateTaskMicroStep = async (taskTitle: string, category: string, reason?: string) => {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const prompt = `
    You are an emotionally intelligent AI productivity assistant.
    A user is feeling overwhelmed by the following task: "${taskTitle}" (Category: ${category}).
    They have decided to "Pause & Simplify" this task.
    Their provided reason is: "${reason || 'General overwhelm'}"

    Your goal is to generate a single, highly actionable, ultra-low energy "recovery micro-step".
    
    If the reason is "Too Complex": Break the task down into the absolute easiest, most trivial first physical step (e.g., "Just open the document and type the title", "Get the laundry basket out").
    If the reason is "Low Energy" or "No Time": Completely pivot to a 5-minute restorative action (e.g., "Drink a full glass of water", "Do a 2-minute breathing exercise", "Stretch your shoulders").

    Return ONLY valid JSON in this exact format:
    {
      "title": "The micro-step text",
      "energyRequired": "low",
      "xpReward": <integer between 5 and 15>
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let jsonString = response.text();
  
  if (jsonString.startsWith('\`\`\`json')) {
    jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
  } else if (jsonString.startsWith('\`\`\`')) {
    jsonString = jsonString.replace(/\`\`\`/g, '').trim();
  }

  return JSON.parse(jsonString);
};

export const generateSanctuaryResponse = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `
      You are an emotionally intelligent AI in a calm, distraction-free "Sanctuary" environment.
      A user is feeling overwhelmed and has come here to vent their stress.
      The user says: "${text}"

      Your task is to provide a deeply empathetic, psychologically reassuring, and emotionally validating response (3-4 sentences max).
      You are acting as a digital supportive friend.
      
      CRITICAL RULES:
      1. First, validate their emotions immediately (e.g., "It makes total sense that you're feeling overwhelmed right now...").
      2. Second, gently help them reflect on *why* they might be feeling this way based on their vent, offering a comforting perspective shift.
      3. Third, gently suggest a tiny, non-demanding way to improve their current physical or mental condition right now (e.g., grounding, letting go of guilt, taking a sip of water).
      4. Do NOT give them productivity tasks, bullet points, or action items.
      5. Do NOT use toxic positivity (e.g., "You can do this!"). Keep it grounded and calm.

      Return ONLY valid JSON in this exact format:
      {
        "response": "Your empathetic response here"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonString = response.text();
    
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    } else if (jsonString.startsWith('\`\`\`')) {
      jsonString = jsonString.replace(/\`\`\`/g, '').trim();
    }

    const parsedResult = JSON.parse(jsonString);
    res.status(200).json(parsedResult);
  } catch (error) {
    console.error('Sanctuary AI Error:', error);
    res.status(500).json({ error: 'Failed to process sanctuary response' });
  }
};
