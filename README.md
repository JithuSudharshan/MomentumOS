# MomentumOS 🚀  

[![MIT License](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20AI-orange.svg)](#)
[![Deployment Status](https://img.shields.io/badge/Demo-Live-brightgreen.svg)](#)

> **“Don’t punish users for failing. Help them recover momentum.”**

MomentumOS is an AI-driven life operating system focused on cognitive recovery, task gamification, and psychological safety. Built for developers, students, and professionals, it completely replaces toxic, rigid streak systems with an intelligent, adaptive recovery engine that scales tasks dynamically based on the user's emotional and behavioral state.

[🔗 Live Application Demo](#) · [🎬 3-Minute Presentation Pitch](#) · [🐛 Issue Tracker](https://github.com/JithuSudharshan/MomentumOS/issues)

---

## 📱 Interactive Presentation Grid
<img width="1073" height="729" alt="image" src="https://github.com/user-attachments/assets/9f16dadb-6162-4dc2-83aa-ba6717a240ed" />


---

## 💎 The Killer Differentiators (Why This Wins)

| Feature | Standard Apps | MomentumOS Approach | Technical Implementation |
| :--- | :--- | :--- | :--- |
| **Streak Mechanics** | Strict sequential days. Miss one day = Reset to zero. | **Recovery Buffers & Streaks**. Tracks execution resilience, rewarding the *return* to consistency. | Dynamic decay algorithm factoring runtime performance intervals over chronological dates. |
| **Task Input** | Rigid form fields, mandatory dates, manual tags. | **Quantum Voice & Text Brain Dump**. Fluid, conversational natural language processing. | Integrated Web Audio API streaming to a Whisper/Gemini audio model. Contextual vector parsing extracts intent, emotional load, and priority metrics automatically. |
| **Decision Paralysis** | Infinite lists causing overwhelm and fatigue. | **The "What Now?" Recommendation Engine**. Surfaces optimal next actions. | Intelligent ranking pipeline factoring current user energy levels, deadline proximity, and momentum score. |
---

## 🧠 Core System Pillars & Features

### 1. AI Intelligent Planning Engine
* 🎙️ **Zero-Friction Voice Venting:** Users can vent unstructured audio directly into the app when overwhelmed. The system streams the audio, transcribes it, and handles the cognitive load of organizing it.
* 🧠 **Natural Language Processing:** Parses messy, chaotic blocks of spoken or written thought, maps dependencies, and automatically generates organized, actionable task tokens.
* 🔬 **Micro-Task Atomization:** Instantly breaks down overwhelming, massive tasks into ultra-low-friction micro-steps to bypass executive dysfunction and spark immediate action.

### 2. Non-Punitive Recovery Engine
* **Adaptive Momentum Tracking:** Replaces static scores with an exponential-moving-average momentum formula. 
* **The "Grace Period" Mechanic:** Automatically scales down task difficulties when detecting periods of high friction or emotional stagnation.

### 3. Deep RPG Gamification System
* **Skill Tree Progression:** Automatically maps completed tasks to user custom categories (e.g., *Frontend Engineering*, *Physical Wellness*, *Deep Focus*).
* **Dynamic Quest Structuring:** Transforms routine assignments into rewarding high-fidelity daily campaigns complete with progression levels and custom achievement indicators.

---

## 🏗️ Technical Architecture & System Flow

### Modern Engineering Stack
* **Frontend UI:** React.js, Tailwind CSS, Framer Motion (Fluid layout animations)
* **Backend Infrastructure:** Node.js, Express.js (Modular route handling)
* **Persistent Data Layer:** MongoDB, Mongoose (Optimized compound indexes)
* **Artificial Intelligence Framework:** Google Gemini / OpenAI API integration via structured semantic inputs

---

## ⚡ Performance & Quality-of-Code Highlights

* **Optimized Render Cycles:** Used customized state providers to eliminate global UI flickering during rapid task modifications.
* **Robust Fail-Safes:** Handled structural fallbacks for AI requests; if an LLM rate limit occurs, the app safely switches to an internal heuristic prioritizing algorithm without breaking user flow.
* **Clean Architectural Boundaries:** Distinct decoupling of data modeling logic, validation controllers, and AI routing mechanisms.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18 or higher)
* Local MongoDB Service or MongoDB Atlas cluster URI
* Access Keys for OpenRouter / Gemini API

### Installation Process

1. Clone the repository and transition to the dedicated development workspace:
```bash
  git clone https://github.com/JithuSudharshan/MomentumOS.git
  cd MomentumOS
  git checkout dev

npm install
   # If client/server are decoupled:
   # cd client && npm install && cd ../server && npm install
