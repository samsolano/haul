#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Clean install dependencies
echo "Installing dependencies..."
npm ci --production --no-audit --no-fund

# Build the application
echo "Building application..."
npm run build

# Start the application
echo "Starting application..."
npm start 