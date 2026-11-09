# 🔴 DeepScope — AI-Powered Research Agent

**Turn questions into deep research.**

DeepScope is a full-stack AI-powered research platform that transforms natural-language questions into comprehensive, structured, and well-sourced research reports.

It combines the reasoning capabilities of **Google Gemini** with real-time web search through **Tavily** to gather relevant information, analyze multiple sources, and generate detailed research reports. Users can save their research, revisit previous reports, and manage their research history.

🌐 **Live Application:** https://deep-scope.vercel.app/  
⚙️ **Backend API:** https://deepscope-hcgh.onrender.com/  
📂 **GitHub Repository:** https://github.com/singhsatyam-dev/DeepScope

---

## ✨ Features

- **AI-Powered Research:** Generate comprehensive research reports using Google Gemini.
- **Real-Time Web Search:** Retrieve relevant information from multiple online sources using Tavily.
- **Structured Reports:** Convert research findings into organized, readable reports.
- **Source References:** Store and display sources associated with generated research.
- **User Authentication:** Secure registration and login with JWT-based authentication.
- **Research History:** Save and access previously generated research reports.
- **Redis Caching:** Cache research results to improve response efficiency.
- **PostgreSQL Persistence:** Store users, research reports, and source information.
- **Responsive UI:** Clean, modern interface with a dark cinematic design.
- **Research Management:** Access and manage saved research from your account.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- React Markdown
- Lucide React

### Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- Cookie Parser

### Database & Caching

- PostgreSQL
- Redis

### AI & Search

- Google Gemini API
- Tavily Search API

### DevOps & Deployment

- Docker
- Docker Compose
- Vercel (Frontend)
- Render (Backend)
- Render PostgreSQL
- Render Key Value (Redis-compatible)

---

## 🏗️ System Architecture

DeepScope follows a client-server architecture with separate frontend and backend applications.

```text
                 ┌──────────────────────┐
                 │      User             │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   React Frontend      │
                 │   Redux Toolkit       │
                 │   Vercel              │
                 └──────────┬───────────┘
                            │ REST API
                            ▼
                 ┌──────────────────────┐
                 │   Express Backend     │
                 │   Node.js             │
                 │   Render              │
                 └──────────┬───────────┘
                            │
                  ┌─────────┼──────────┐
                  │         │          │
                  ▼         ▼          ▼
             ┌────────┐ ┌────────┐ ┌─────────┐
             │ Gemini │ │ Tavily │ │ Redis   │
             │  API   │ │ Search │ │ Cache   │
             └────────┘ └────────┘ └─────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │     PostgreSQL        │
                 │  Users, Research,     │
                 │  Research Sources     │
                 └──────────────────────┘
```

### Research Workflow

1. A user submits a research question through the frontend.
2. The backend checks Redis for a cached result.
3. Tavily searches the web for relevant information.
4. Google Gemini analyzes the gathered information and generates a structured research report.
5. The report and associated sources are stored in PostgreSQL.
6. The generated report is returned to the frontend.
7. Users can revisit their saved research through research history.

---

## 📁 Project Structure

```text
DeepScope/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── hooks/
│   │   └── ...
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── Middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── scripts/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run DeepScope locally.

### 1. Clone the Repository

```bash
git clone https://github.com/singhsatyam-dev/DeepScope.git

cd DeepScope
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL=postgresql://username:password@localhost:5432/deepscope?schema=public

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model

TAVILY_API_KEY=your_tavily_api_key

REDIS_URL=redis://localhost:6379

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=1d

CLIENT_URL=http://localhost:5173
```

**API keys required:**

- Google Gemini API: https://aistudio.google.com/
- Tavily API: https://tavily.com/

Make sure PostgreSQL and Redis are running before starting the backend.

### 3. Start PostgreSQL and Redis

If you're using the included Docker Compose configuration:

```bash
cd ..
docker compose up -d postgres redis
```

Make sure the database credentials in your backend `.env` match your PostgreSQL configuration.

### 4. Run Database Migrations

```bash
cd backend

npx prisma generate
npx prisma migrate dev
```

### 5. Start the Backend Server

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 6. Configure the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 7. Start the Frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

| Variable         | Description                             |
| ---------------- | --------------------------------------- |
| `PORT`           | Backend server port                     |
| `NODE_ENV`       | Application environment                 |
| `DATABASE_URL`   | PostgreSQL connection string            |
| `GEMINI_API_KEY` | Google Gemini API key                   |
| `GEMINI_MODEL`   | Gemini model identifier                 |
| `TAVILY_API_KEY` | Tavily Search API key                   |
| `REDIS_URL`      | Redis connection URL                    |
| `JWT_SECRET`     | JWT signing secret                      |
| `JWT_EXPIRES_IN` | JWT expiration duration                 |
| `CLIENT_URL`     | Frontend origin allowed by backend CORS |
| `VITE_API_URL`   | Backend API URL used by frontend        |

**Security:** Never commit `.env` files, database credentials, JWT secrets, or API keys to GitHub.

---

## ☁️ Deployment

DeepScope is deployed using separate frontend and backend hosting services.

| Component | Platform          | URL                                  |
| --------- | ----------------- | ------------------------------------ |
| Frontend  | Vercel            | https://deep-scope.vercel.app/       |
| Backend   | Render            | https://deepscope-hcgh.onrender.com/ |
| Database  | Render PostgreSQL | Private connection                   |
| Cache     | Render Key Value  | Private connection                   |

The frontend communicates with the backend through REST APIs. Production environment variables are configured separately on Vercel and Render.

---

## 🎯 Learning Outcomes

Building DeepScope provided practical experience with:

- Designing and developing a full-stack application.
- Integrating LLMs into real-world applications.
- Building AI research workflows using external search APIs.
- Implementing JWT-based authentication.
- Working with PostgreSQL and Prisma ORM.
- Implementing Redis caching.
- Containerizing services using Docker.
- Managing environment variables and production configurations.
- Deploying frontend and backend applications independently.

---

## 🔮 Future Improvements

- Streaming AI-generated research reports.
- Advanced research customization and depth controls.
- Export reports to PDF and Markdown.
- Research comparison and collaboration.
- Improved source verification and relevance ranking.
- Background research processing and notifications.

---

## 👨‍💻 Author

**Satyam Kumar Singh**

BCA Graduate | Full Stack Developer | AI Enthusiast

- GitHub: https://github.com/singhsatyam-dev
- Project: https://github.com/singhsatyam-dev/DeepScope

---

⭐ If you find DeepScope interesting, consider giving the repository a star!

**Built with curiosity, code, and AI.**
