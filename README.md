<div align="center">
  
# 🌌 MomentumOS

**An Emotionally Intelligent, AI-Powered Productivity Engine**

[![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-success.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/AI-Google_Gemini-orange.svg?style=for-the-badge)](https://deepmind.google/technologies/gemini/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-ff69b4.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

</div>

---

## 📖 Overview

Traditional task managers assume you operate at 100% capacity all the time. **MomentumOS** is different. It is an emotionally intelligent productivity platform designed to adapt to your mental state. 

Built with the **Google Gemini API**, MomentumOS doesn't just track tasks; it actively helps you overcome cognitive overload, executive dysfunction, and burnout through gamification, emotional validation, and AI-driven simplification.

## ✨ Core Features

### 🧠 The Brain Dump (Voice-to-Text AI Synthesis)
When you're overwhelmed, typing out a structured to-do list is impossible. 
- **Speak your chaos:** Use the built-in Web Speech API to vent your thoughts out loud.
- **AI Synthesis:** The Gemini API analyzes your raw brain dump, detects your stress levels, and automatically structures your ramblings into organized, prioritized tasks based on urgency, importance, and emotional weight.

### 🛡️ Gamification & Shield Mechanics
Productivity should feel rewarding, not punishing.
- Earn **XP** and level up by completing tasks.
- Maintain your **Streak** to keep your protective **Shield** active.
- Tasks are categorized into RPG-style stats: *Intellect, Vitality,* and *Creativity*.

### 🧩 Pause & Simplify (Phoenix Quests)
Staring at a massive task you don't have the energy for? Don't delete it.
- **Pause the task:** Tell the system *why* you are stuck ("Too Complex", "Low Energy", or "No Time").
- **AI Micro-Steps:** The system hides the overwhelming task and uses AI to instantly generate a "Phoenix Quest"—a ridiculously simple micro-step or self-care action (e.g., "Drink a glass of water") to help you rebuild momentum and recover your Shield without guilt.

### 🧘 The Sanctuary (Sensory Reset Room)
When the dashboard gets too noisy, enter the Sanctuary.
- **Bio-Feedback Protocol:** Follow a massive, pulsing UI orb that guides you through a 10-second Inhale/Exhale breathing loop, accompanied by ambient audio.
- **The Venting Node:** A distraction-free input field where you can vent your frustrations. The AI is strictly instructed to provide *only* deep psychological empathy and validation—no tasks, no toxic positivity. Just a digital supportive friend.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 18 (Vite) + TypeScript
- **Styling:** Tailwind CSS (Custom "Vanguard" Glassmorphism theme)
- **Animations:** Framer Motion (for fluid micro-interactions and layout transitions)
- **State Management:** Zustand
- **Routing:** React Router v6

### Backend (Server)
- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ORM)
- **AI Integration:** Google Generative AI SDK (`gemini-3.5-flash`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas connection string
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/MomentumOS.git
   cd MomentumOS
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `/server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the `/client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Start the client:
   ```bash
   npm run dev
   ```

4. **Access the App:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 🎨 Design Philosophy
MomentumOS utilizes a custom design language we call the **"Vanguard" aesthetic**. It heavily features:
- Deep dark modes with breathable spacing.
- CSS backdrop-filters for frosted glass (Glassmorphism).
- Vibrant, glowing auras (Teal, Ice, and Ember) that dynamically react to your task statuses.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/MomentumOS/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
