#  — Online Coding  Platform

<div align="center">

**A full-stack coding and problem-solving platform built with the MERN stack.**

Practice DSA problems • Write & run code in-browser • Get AI-powered hints • Watch video editorials


</div>

---

##  Features

| Feature | Description |
|---|---|
| ** Authentication** | Secure signup & login with JWT tokens, bcrypt password hashing, and cookie-based sessions |
| ** Problem Bank** | Browse coding problems with difficulty levels (Easy / Medium / Hard) and topic tags (Array, Linked List, Graph, DP) |
| ** In-Browser Code Editor** | Monaco Editor (VS Code engine) supporting **JavaScript**, **C++**, and **Java** |
| ** Run & Submit Code** | Execute code against visible test cases (Run) or hidden test cases (Submit) via **Judge0** API |
| ** Submission History** | View past submissions with status, runtime, memory usage, and test case results |
| ** AI Doubt Solver** | Context-aware chat assistant powered by **Google Gemini 2.5 Flash** — helps with hints, explanations, and approach guidance without giving away the solution |
| ** Video Editorials** | Admin-uploaded video solutions stored on **Cloudinary** |
| ** Admin Panel** | Full CRUD for problems — create, update, delete problems and upload video editorials |
| ** Redis Caching** | Server-side caching with Redis for improved performance |
| ** Role-Based Access** | `user` and `admin` roles with protected routes on both frontend and backend |

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose ODM)
- **Caching:** Redis
- **Auth:** JWT + bcrypt
- **Code Execution:** Judge0 (RapidAPI)
- **AI:** Google Gemini 2.5 Flash (`@google/genai`)
- **Media Storage:** Cloudinary
- **Validation:** validator.js

### Frontend
- **Library:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS 4 + DaisyUI 5
- **State Management:** Redux Toolkit + React Redux
- **Routing:** React Router 7
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **HTTP Client:** Axios

---

## 📁 Project Structure

```
CodeArena/
├── backend/
│   └── src/
│       ├── config/          # DB & Redis connection
│       ├── controllers/     # Route handlers
│       │   ├── userAuthent.js       # Signup, login, logout, profile
│       │   ├── userProblem.js       # Problem CRUD
│       │   ├── userSubmission.js    # Code run & submit via Judge0
│       │   ├── solveDoubt.js        # AI chat (Gemini)
│       │   └── videoSection.js      # Video editorial uploads
│       ├── middleware/      # Auth & admin guards
│       ├── models/          # Mongoose schemas
│       │   ├── user.js
│       │   ├── problem.js
│       │   ├── submission.js
│       │   └── solutionVideo.js
│       ├── routes/          # Express route definitions
│       ├── utils/           # Judge0 helpers, validators
│       └── index.js         # App entry point
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Homepage.jsx       # Problem listing
│       │   ├── ProblemPage.jsx    # Editor + problem view
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── Admin.jsx
│       ├── components/
│       │   ├── AdminPanel.jsx     # Create/edit problems
│       │   ├── AdminUpload.jsx    # Upload video editorials
│       │   ├── AdminDelete.jsx    # Delete problems
│       │   ├── AdminVideo.jsx     # Manage videos
│       │   ├── ChatAi.jsx         # AI doubt solver UI
│       │   ├── Editorial.jsx      # Video editorial player
│       │   └── SubmissionHistory.jsx
│       ├── store/           # Redux store config
│       ├── utils/           # Axios instance, helpers
│       └── authSlice.js     # Auth state management
│
└── DataPart/
    └── datapart.md          # Link to project data sheet
```

---

##  Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (Atlas or local)
- **Redis** (Cloud or local)
- API keys for:
  - [Judge0 on RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce)
  - [Google Gemini](https://ai.google.dev/)
  - [Cloudinary](https://cloudinary.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/14Dev.git
cd 14Dev
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
DB_CONNECT_STRING=<your-mongodb-connection-string>
JWT_KEY=<your-jwt-secret>
REDIS_PASS=<your-redis-password>
JUDGE0_KEY=<your-rapidapi-judge0-key>
GEMINI_KEY=<your-google-gemini-api-key>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

---

##  API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user/signup` | Register a new user |
| `POST` | `/user/login` | Login & receive JWT cookie |
| `POST` | `/user/logout` | Clear auth cookie |
| `GET`  | `/user/profile` | Get current user profile |

### Problems
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/problem/allProblems` | List all problems |
| `GET` | `/problem/:id` | Get problem details |
| `POST` | `/problem/create` | Create a problem *(admin)* |
| `DELETE` | `/problem/:id` | Delete a problem *(admin)* |

### Submissions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/submission/run/:id` | Run code against visible test cases |
| `POST` | `/submission/submit/:id` | Submit code against hidden test cases |
| `GET` | `/submission/history/:id` | Get submission history for a problem |

### AI Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ai/chat` | Send a message to the AI doubt solver |

### Video Editorials
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/video/upload` | Upload a video editorial *(admin)* |
| `GET` | `/video/:problemId` | Get video editorial for a problem |

---

##  Supported Languages

| Language | Judge0 ID |
|----------|-----------|
| JavaScript (Node.js) | 63 |
| C++ (GCC) | 54 |
| Java (OpenJDK) | 62 |

---

##  Admin Access

To access the admin panel, a user must have `role: "admin"` in the database. Admin routes include:

- `/admin` — Admin dashboard
- `/admin/create` — Create new problems with test cases and starter code
- `/admin/delete` — Manage and delete existing problems
- `/admin/video` — Upload and manage video editorials

---

##  License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<div align="center">
  <b>Built with ❤️ for competitive programming enthusiasts</b>
</div>
]]>
