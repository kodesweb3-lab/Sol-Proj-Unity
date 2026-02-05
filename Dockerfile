FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY npc-game-mvp/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY npc-game-mvp/ ./

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
