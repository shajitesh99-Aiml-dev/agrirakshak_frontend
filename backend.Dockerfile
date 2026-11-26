# ==============================================================================
# Agri Rakshak Backend Production Dockerfile
# Problem Statement: SIH26131
# ==============================================================================

FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment flags
ENV NODE_ENV=production
ENV PORT=8000

# Install curl/wget for healthchecks
RUN apk add --no-cache curl

# Copy dependency manifests
COPY package*.json ./

# Install dependencies needed for runtime and Prisma ORM client
RUN npm ci --omit=dev && npm install prisma --no-save

# Copy Prisma schema and migrations
COPY prisma ./prisma

# Generate Prisma Client binary for linux-musl architecture
RUN npx prisma generate

# Copy backend source code and utility scripts
COPY server ./server
COPY scripts ./scripts

# Ensure application files are owned by unprivileged node user
RUN chown -R node:node /app

# Run as non-root user for security hardening
USER node

# Expose backend API port
EXPOSE 8000

# Docker healthcheck querying backend /health route
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/api/v1/health || exit 1

# Start the Node.js production server
CMD ["node", "server/server.js"]
