#!/bin/bash

# Setup script for Flask + Cypress Application

echo "🚀 Setting up Flask + Cypress Application..."

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "⚠️  Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Build and start services
echo "🐳 Building and starting Docker containers..."
docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check health
echo "🏥 Checking service health..."
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend is not responding"
    docker compose logs backend
    exit 1
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend is not responding"
    docker compose logs frontend
    exit 1
fi

echo ""
echo "✨ Setup complete! Your application is running:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "To run tests: npm run cypress:run"
echo "To stop services: docker compose down"
echo ""
