.PHONY: help install up down test logs clean restart

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install Node.js dependencies
	npm install

up: ## Start all services with Docker Compose
	docker compose up -d
	@echo "Waiting for services to start..."
	@sleep 5
	@echo "✅ Services started:"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:5000"

down: ## Stop all services
	docker compose down

restart: down up ## Restart all services

test: ## Run Cypress tests locally (requires npm install)
	npm run cypress:run

test-ui: ## Run Cypress tests in interactive mode locally
	npm run cypress:open

test-docker: ## Run Cypress tests in Docker container
	docker compose run --rm cypress

test-ci: up ## Run tests in CI mode (Docker)
	@echo "Waiting for services to be ready..."
	@sleep 10
	docker compose run --rm cypress
	@EXIT_CODE=$$?; docker compose down; exit $$EXIT_CODE

logs: ## Show logs from all services
	docker compose logs -f

logs-backend: ## Show backend logs
	docker compose logs -f backend

logs-frontend: ## Show frontend logs
	docker compose logs -f frontend

ps: ## Show running containers
	docker compose ps

health: ## Check service health
	@echo "Checking backend health..."
	@curl -f http://localhost:5000/api/health && echo "✅ Backend healthy" || echo "❌ Backend unhealthy"
	@echo "Checking frontend..."
	@curl -f http://localhost:3000 && echo "✅ Frontend healthy" || echo "❌ Frontend unhealthy"

clean: down ## Stop services and remove volumes
	docker compose down -v
	rm -rf node_modules cypress/videos cypress/screenshots

rebuild: ## Rebuild Docker images and restart
	docker compose down
	docker compose build --no-cache
	docker compose up -d

dev-backend: ## Run backend in development mode (local)
	cd backend && python app.py

dev-frontend: ## Run frontend in development mode (local)
	cd frontend && python -m http.server 3000
