# Personal Portfolio Website

A modern, premium‑looking personal portfolio built with **Node.js**, **Express**, **MongoDB** and a beautiful static front‑end. It includes an **admin UI** for managing projects, skills, and contact messages, along with **Docker** support for production and testing.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Docker Compose Helper for Tests](#docker-compose-helper-for-tests)
- [Parallel Test Execution](#parallel-test-execution)
- [CI/CD (GitHub Actions)](#cicd-github-actions)
- [Custom Domain & TLS (Caddy)](#custom-domain--tls-caddy)
- [Secrets Management](#secrets-management)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features
- **Vibrant gradient UI** (`linear-gradient(135deg, #4FACFE 0%, #A855F7 50%, #FF4D9D 100%)`) with glass‑morphism cards and micro‑animations.
- **Admin dashboard** (login via JWT) to CRUD projects, skills and view contact messages.
- **REST API** for public portfolio data (`/api/projects`, `/api/skills`, `/api/portfolio`).
- **Contact form** storing submissions in MongoDB and sending email notifications via Nodemailer.
- **Dockerized** production and test environments, **parallel Jest test execution**, and **resource‑hardened** containers.
- **CI/CD** workflow that runs tests, builds the Docker image, and can deploy to Vercel.

---

## Tech Stack
- **Backend**: Node.js 20, Express 5, Mongoose, JWT, Helmet, CORS
- **Database**: MongoDB 7 (Docker)
- **Testing**: Jest, Supertest
- **Containerisation**: Docker & Docker‑Compose
- **Reverse Proxy (optional)**: Caddy 2 (automatic TLS via Let's Encrypt)
- **Styling**: Vanilla CSS, Google Font *Inter*

---

## Prerequisites
- Docker Engine (or Docker Desktop) ≥ 20.10
- Node.js ≥ 20 (for local dev only)
- (Optional) Vercel CLI if you want to deploy manually
- A Gmail account and **App Password** for email notifications (or configure another SMTP)

---

## Local Development
```bash
# Clone the repo
git clone https://github.com/Mahi-tech-c/Personal-Portfolio-Website.git
cd Personal-Portfolio-Website

# Install dependencies
npm ci

# Create .env (copy from .env.example) and set your values
cp .env.example .env
# Edit .env – set MONGODB_URI=mongodb://localhost:27017/portfolio

# Run locally (development mode)
npm run dev
```
Visit <http://localhost:3000> – you should see the portfolio. Admin UI is at <http://localhost:3000/admin.html> (login with the credentials you set in `.env`).

---

## Production Deployment
```bash
# From the project root
docker compose -f docker-compose.prod.yml up --build -d
```
### What the production compose does
- **Secrets** – reads Mongo URI, JWT secret, admin email/password from files under `secrets/` (replace the placeholders in `secrets/placeholder.txt`).
- **Resource limits** – caps the app at 0.5 CPU and 512 MiB.
- **Read‑only filesystem** – container runs as non‑root `node` user.
- **Log rotation** – `json-file` driver with max‑size 10 MiB, max‑files 3.
- **Optional Caddy reverse‑proxy** – enable by adding `ENABLE_PROXY=true` to your `.env`; Caddy will obtain TLS certificates automatically for the domain you configure in `caddy/Caddyfile`.

### Secrets
Create real secret files (replace the placeholder values):
```bash
mkdir -p secrets
echo "mongodb://mongo:27017/portfolio" > secrets/mongodb_uri.txt
echo "YOUR_JWT_SECRET" > secrets/jwt_secret.txt
echo "YOUR_ADMIN_EMAIL" > secrets/admin_email.txt
echo "YOUR_ADMIN_PASSWORD" > secrets/admin_password.txt
```
Do **NOT** commit these files.

---

## Docker Compose Helper for Tests
The file `docker-compose.test.yml` runs a single container that executes `npm test` against a temporary MongoDB instance.
```bash
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
```
---

## Parallel Test Execution
`docker-compose.parallel-test.yml` launches three test runners simultaneously, each with its own isolated test database and writing JUnit XML reports to `test-reports/`.
```bash
docker compose -f docker-compose.parallel-test.yml up --build --abort-on-container-exit
# Reports are available in ./test-reports/
```
You can change the number of runners by editing the file or by setting the environment variable `PARALLEL_WORKERS` (default = 3).

---

## CI/CD (GitHub Actions)
The workflow `.github/workflows/ci.yml` automatically:
1. Checks out the repo.
2. Sets up Node 20.
3. Installs dependencies.
4. Runs **parallel tests** with coverage.
5. Uploads the coverage report and JUnit test results as artifacts.
6. Builds the Docker image and pushes it to Docker Hub (optional – configure `DOCKER_USERNAME`/`DOCKER_PASSWORD` secrets).
7. Deploys to Vercel (optional – configure `VERCEL_TOKEN` and `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`).

See the workflow file for details.

---

## Custom Domain & TLS (Caddy)
Edit `caddy/Caddyfile` with your real domain and email:
```caddy
myportfolio.com {
    tls youremail@domain.com
    reverse_proxy app:3000
}
```
Set `ENABLE_PROXY=true` in `.env` and redeploy the production stack. Caddy will automatically obtain and renew certificates from Let's Encrypt.

---

## Secrets Management
- **Docker secrets** are used in production (`docker-compose.prod.yml`).
- For local development you can still use plain env vars in `.env`.
- Never commit secret files; add `secrets/` to `.gitignore` (already present).

---

## Project Structure
```
├─ public/                # Static assets (HTML, CSS, JS)
│   ├─ admin.html
│   ├─ css/
│   └─ js/
├─ src/                  # Server‑side source
│   ├─ app.js            # Express app
│   ├─ server.js         # HTTP server entry point
│   ├─ config/           # DB & other config
│   ├─ controllers/      # MVC controllers
│   ├─ middleware/       # auth, error handling
│   └─ models/           # Mongoose schemas
├─ tests/                # Jest/Supertest integration tests
├─ Dockerfile            # Multi‑stage, non‑root production image
├─ docker-compose.yml    # Development compose (app + mongo)
├─ docker-compose.prod.yml
├─ docker-compose.test.yml
├─ docker-compose.parallel-test.yml
├─ caddy/                # Optional reverse‑proxy config
│   └─ Caddyfile
├─ .github/workflows/ci.yml
├─ .env.example
├─ jest.config.js
└─ README.md
```
---

## License
MIT – feel free to fork, modify, and share!
