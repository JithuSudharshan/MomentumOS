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

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are the AI brain of an application called MomentumOS. 
      The user will provide a "brain dump" of messy thoughts, worries, and tasks. 
      Your job is to parse this text and return a structured JSON array of actionable tasks.
      
      For each task, determine:
      - title: A clear, concise, actionable task name.
      - category: One of 'work', 'personal', 'health', 'learning'.
      - energyRequired: One of 'low', 'medium', 'high' based on how draining it sounds.
      - xpReward: An integer between 10 and 100 based on the task's difficulty/importance.

      Output ONLY valid JSON. The format must be exactly:
      [
        {
          "title": "Do laundry",
          "category": "personal",
          "energyRequired": "low",
          "xpReward": 15
        }
      ]

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

    const taskObjects = JSON.parse(jsonString);
    
    // Save all to database
    const savedTasks = await Task.insertMany(taskObjects);
    
    // Format for frontend
    const mappedTasks = savedTasks.map(t => {
      const obj = t.toObject();
      return { ...obj, id: obj._id.toString() };
    });

    res.status(200).json({ tasks: mappedTasks });

  } catch (error) {
    console.error('AI Processing Error:', error);
    res.status(500).json({ error: 'Failed to process brain dump' });
  }
};
