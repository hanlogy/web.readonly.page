# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build app
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy built static files
# adjust "dist" if your build output differs
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
