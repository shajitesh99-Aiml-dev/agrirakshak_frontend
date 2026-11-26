# ==============================================================================
# Agri Rakshak Frontend Production Dockerfile (Multi-Stage Build)
# Problem Statement: SIH26131
# ==============================================================================

# Stage 1: Build the React 19 + Vite Production Bundle
FROM node:20-alpine AS builder

WORKDIR /app

# Set non-interactive environment
ENV NODE_ENV=development

# Copy package descriptors first for optimal layer caching
COPY package*.json ./

# Install all dependencies including dev tools for building
RUN npm ci

# Copy full application source
COPY . .

# Build-time argument for API base URL (Default to standard local API port)
ARG VITE_API_BASE_URL=http://localhost:8000/api/v1
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build TypeScript and Vite distribution bundle
RUN npm run build

# ==============================================================================
# Stage 2: Serve using hardened, lightweight Nginx web server
# ==============================================================================
FROM nginx:alpine AS runner

# Remove default nginx HTML page
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom hardened Nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions for nginx non-root operation
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Expose HTTP port
EXPOSE 80

# Healthcheck for frontend web server
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx daemon in foreground
CMD ["nginx", "-g", "daemon off;"]
