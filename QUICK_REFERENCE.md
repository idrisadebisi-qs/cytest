# Quick Reference Card

## 🚀 Quick Start

```bash
# Option 1: Using the setup script
./setup.sh

# Option 2: Using Make
make install
make up

# Option 3: Manual
npm install
docker compose up -d
```

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `make up` | Start all services |
| `make down` | Stop all services |
| `make test` | Run Cypress tests |
| `make test-ui` | Open Cypress interactive mode |
| `make logs` | View all logs |
| `make restart` | Restart services |
| `make clean` | Clean everything |
| `make help` | Show all available commands |

## 🌐 Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🧪 Testing

```bash
# Run all tests (headless)
npm run cypress:run

# Open Cypress UI
npm run cypress:open

# Run specific test
npx cypress run --spec "cypress/e2e/items.cy.js"
```

## 🐳 Docker Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# Rebuild images
docker compose build --no-cache

# Check service status
docker compose ps
```

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create new item |
| DELETE | `/api/items/:id` | Delete item |

## 📦 Project Structure

```
cytest/
├── backend/           # Flask API
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/          # HTML/CSS/JS
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── Dockerfile
│   └── nginx.conf
├── cypress/           # E2E tests
│   ├── e2e/
│   └── support/
├── .github/
│   └── workflows/
│       └── ci.yml     # GitHub Actions
├── docker-compose.yml
└── cypress.config.js
```

## 🔧 Development

### Local Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Local Frontend Development
```bash
cd frontend
python -m http.server 3000
```

## 📤 Push to GitHub

```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

See `GITHUB_SETUP.md` for detailed instructions.

## 🐛 Troubleshooting

### Services won't start
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5000

# Clean everything and restart
make clean
make up
```

### Tests failing
```bash
# Check service health
make health

# View logs
make logs

# Restart services
make restart
```

### CORS errors
- Backend has CORS enabled for all origins
- Frontend should point to `http://localhost:5000` for local development

## 📝 Notes

- The backend uses an in-memory data store (resets on restart)
- Cypress tests create and delete test data
- GitHub Actions run automatically on push/PR to main or develop branches
- Docker images are built for production use with Gunicorn and Nginx
