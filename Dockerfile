# Multi-stage build for fast boot times
FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN bun run build

# Production stage - minimal image for fast startup
FROM oven/bun:1.3-alpine

WORKDIR /app

# Copy built app and dependencies from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port 8080
EXPOSE 8080

# Set environment variable for port
ENV PORT=8080
ENV NODE_ENV=production

# Start the server
CMD ["bun", "build/index.js"]
