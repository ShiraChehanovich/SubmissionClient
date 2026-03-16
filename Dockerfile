# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time API base input with a default value
ARG REACT_APP_API_BASE=http://localhost:8000
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source + env file
COPY . .

# Build the production bundle
RUN npm run build

# ---- Serve stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

