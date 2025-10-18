# Multi-stage build for fast boot times
FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock* yarn.lock* ./

# Install dependencies with Bun (faster than yarn)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
RUN bun run build

# Production stage - minimal image for fast startup
FROM oven/bun:1.3-alpine

WORKDIR /app

# Copy built app and dependencies from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port 8080
EXPOSE 8080

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Start the server
CMD ["bun", "server.js"]
