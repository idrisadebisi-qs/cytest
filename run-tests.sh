#!/bin/bash

# Script to run Cypress tests in Docker

echo "🧪 Running Cypress Tests in Docker"
echo "==================================="

# Check if services are running
if ! docker compose ps | grep -q "flask-backend.*Up"; then
    echo "⚠️  Backend is not running. Starting services..."
    docker compose up -d backend frontend
    echo "⏳ Waiting for services to be ready..."
    sleep 10
fi

# Run Cypress tests
echo "🚀 Starting Cypress tests..."
docker compose run --rm cypress

# Capture exit code
EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Tests failed with exit code: $EXIT_CODE"
fi

exit $EXIT_CODE
