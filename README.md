# Flask + Frontend + Cypress Test Application

A full-stack application with Flask backend, vanilla JavaScript frontend, Cypress E2E tests, and Docker support.

## Project Structure

```
cytest/
├── backend/          # Flask API application
├── frontend/         # Static HTML/CSS/JS frontend
├── cypress/          # Cypress E2E tests
├── .github/          # GitHub Actions workflows
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker & Docker Compose
- Node.js (for local Cypress tests)
- Python 3.11+ (for local development)

## Quick Start

### Using Docker Compose

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Local Development

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

#### Frontend
```bash
cd frontend
python -m http.server 3000
```

#### Run Cypress Tests
```bash
npm install
npm run cypress:open  # Interactive mode
npm run cypress:run   # Headless mode
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `GET /api/items/:id` - Get item by ID
- `DELETE /api/items/:id` - Delete item by ID

## CI/CD

GitHub Actions workflow automatically runs on push/PR:
1. Builds Docker images
2. Starts services with docker-compose
3. Runs Cypress E2E tests
4. Reports test results

## Testing

Run tests locally:
```bash
# Start services
docker compose up -d

# Run Cypress tests
npm run cypress:run

# Stop services
docker compose down
```
