# Multi-stage build for fast boot times - builds evilcharts Next.js app
FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Copy evilcharts dependency files
COPY evilcharts/package.json evilcharts/yarn.lock ./

# Install dependencies with Bun
RUN bun install

# Copy evilcharts source code
COPY evilcharts/ ./

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
