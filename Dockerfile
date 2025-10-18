# Multi-stage build for fast boot times - builds evilcharts Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Install yarn
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Copy evilcharts dependency files
COPY evilcharts/package.json evilcharts/yarn.lock ./

# Install dependencies with yarn
RUN yarn install --frozen-lockfile

# Copy evilcharts source code
COPY evilcharts/ ./

# Build the Next.js app
RUN yarn build

# Production stage - minimal image for fast startup
FROM node:20-alpine

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
CMD ["node", "server.js"]
