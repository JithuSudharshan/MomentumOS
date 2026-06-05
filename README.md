<div align="center">
  
# 🌌 MomentumOS

**An Emotionally Intelligent, AI-Powered Productivity Engine**

[![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-success.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/AI-Google_Gemini-orange.svg?style=for-the-badge)](https://deepmind.google/technologies/gemini/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-ff69b4.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

<img width="1890" height="1006" alt="Screenshot from 2026-05-30 02-19-02 (1)" src="https://github.com/user-attachments/assets/4dd0116f-4326-47c8-b5b5-148227310998" />
</div>

---

## 📖 Overview

Traditional task managers assume you operate at 100% capacity all the time. **MomentumOS** is different. It is an emotionally intelligent productivity platform designed specifically for the overwhelmed mind. 

Built with the **Google Gemini API**, MomentumOS doesn't just track tasks; it actively helps you overcome cognitive overload, executive dysfunction, and burnout through empathy, emotional validation, gamification, and AI-driven simplification.

## ✨ Core Features

### 🧠 Emotionally Intelligent Brain Dump & Priority Scoring
When you're overwhelmed, typing out a structured to-do list is impossible. 
- **Speak your chaos:** Use the built-in Web Speech API or text input to vent your raw thoughts out loud.
- **AI Synthesis & Multi-Variable Priority:** Gemini analyzes your dump to detect tasks, but it doesn't just sort by deadline. It scores tasks based on urgency, importance, and *emotional weight*, generating deeply supportive action plans.

### 🔋 The Overwhelm Meter
- Our Gemini AI analyzes your emotional state to calculate a humanized **"Mental Load Percentage."**
- A stunning, responsive semi-circle radial gauge visually tracks your cognitive overwhelm in real-time.

### 🛡️ Gamification & Resilience Badges
Productivity should build mental fortitude, not feel punishing.
- **Stats & Streaks:** Earn XP, level up, and maintain your streak to keep your protective **Shield** active. Tasks upgrade RPG-style stats: *Intellect, Vitality,* and *Creativity*.
- **Gamified Resilience Badges:** Users don't just check off tasks; they build resilience. We implemented an emotionally rewarding 3-state badge lifecycle (Locked, Eligible, Claimed) where users manually claim achievements with satisfying aesthetic glows.

### 🧩 Recovery Protocol & Micro-Steps
Staring at a massive task you don't have the energy for? Don't delete it.
- **Pause the task:** Tell the system *why* you are stuck ("Too Complex", "Low Energy", or "No Time").
- **AI Micro-Steps:** The system triggers a "Recovery Protocol" providing a ridiculously simple micro-step or self-care action (e.g., "Drink a glass of water") to help you rebuild momentum and recover without guilt.

### 🧘 The Sanctuary (Sensory Reset Room)
When the dashboard gets too noisy and the Overwhelm Meter spikes, enter the Sanctuary.
- **Bio-Feedback Protocol:** Follow a massive, pulsing UI orb that guides you through a 10-second Inhale/Exhale breathing loop, accompanied by ambient audio.
- **The Venting Node:** A distraction-free input field where you can vent your frustrations. The AI is strictly instructed to provide *only* deep psychological empathy and validation—no tasks, no toxic positivity.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 18 (Vite) + TypeScript
- **Styling:** Tailwind CSS (Custom "Vanguard" Glassmorphism theme)
- **Animations:** Framer Motion (for fluid micro-interactions and radial gauge transitions)
- **State Management:** Zustand
- **Routing:** React Router v6
- **Progressive Web App (PWA):** Vite PWA Plugin support

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
   git clone https://github.com/JithuSudharshan/MomentumOS.git
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
- Emotionally resonant colors for high-stress visualization (Overwhelm Meter).

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/JithuSudharshan/MomentumOS/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
