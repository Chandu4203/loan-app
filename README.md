# 🎓 Loan App – Full-Stack Scaffold

A full-stack student loan management application built with **React + Vite + Tailwind** on the frontend and **Express + Prisma + PostgreSQL** on the backend, secured with **JWT authentication**.

---

## 🗂 Project Structure

```
loan-app/
├── backend/           # Express API (Node.js)
│   ├── prisma/        # Prisma schema & seed script
│   ├── src/
│   │   ├── index.js
│   │   ├── middleware/auth.js
│   │   └── routes/
│   │       ├── auth.js
│   │       └── loans.js
│   ├── .env.example
│   └── Dockerfile
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── api/client.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ApplyLoan.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── Dockerfile
└── docker-compose.yml
```

---

## 🚀 Quick Start (Docker Compose)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)

### Run the full stack

```bash
git clone https://github.com/Chandu4203/loan-app.git
cd loan-app
docker compose up --build
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:3000         |
| Backend  | http://localhost:4000         |
| Health   | http://localhost:4000/health  |

> The backend automatically runs `prisma migrate deploy` and seeds the database on first start.

---

## 🔑 Demo Credentials

| Role      | Email                    | Password       |
|-----------|--------------------------|----------------|
| **Admin** | `admin@example.com`      | `Password123!` |
| Applicant | `applicant@example.com`  | `Password123!` |

Admins can **Approve** or **Reject** pending loan applications from the Dashboard.

---

## 🛠 Local Development (without Docker)

### Backend

```bash
cd backend
cp .env.example .env          # edit DATABASE_URL as needed
npm install
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev                   # starts on :4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                   # starts on :3000 (proxies /api → :4000)
```

---

## 🌐 API Endpoints

| Method | Path                       | Auth     | Description               |
|--------|----------------------------|----------|---------------------------|
| POST   | `/api/auth/register`       | –        | Register a new account    |
| POST   | `/api/auth/login`          | –        | Login and receive JWT     |
| GET    | `/api/loans`               | Bearer   | List loans (own / all)    |
| POST   | `/api/loans`               | Bearer   | Submit a loan application |
| PATCH  | `/api/loans/:id/status`    | Admin    | Approve or reject a loan  |

---

## 📦 Download Branch as ZIP

You can download the scaffold branch as a ZIP file directly from GitHub:

**[⬇️ Download scaffold branch ZIP](https://github.com/Chandu4203/loan-app/archive/refs/heads/copilot/scaffold-full-stack-loan-app.zip)**

---

## 🏗 Tech Stack

| Layer    | Technology                       |
|----------|----------------------------------|
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| Backend  | Node.js, Express 4               |
| ORM      | Prisma 5 (PostgreSQL)            |
| Auth     | JWT (jsonwebtoken, bcryptjs)     |
| Infra    | Docker Compose, Nginx            |
