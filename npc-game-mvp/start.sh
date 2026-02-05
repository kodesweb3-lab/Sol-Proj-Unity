#!/bin/bash
# NPC-GAME Startup Script for Railway

set -e

echo "🚀 Starting NPC-GAME..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building NPC-GAME..."
npm run build

# Start the production server
echo "✅ Starting production server..."
npm run start

echo "🎮 NPC-GAME is live!"
