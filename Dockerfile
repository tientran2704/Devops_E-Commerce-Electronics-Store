# Dockerfile for Frontend (for Render.com deployment)
FROM node:20-alpine AS build
WORKDIR /app

# Copy frontend files
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci || npm install

COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Copy static images directory
COPY frontend/public/images /usr/share/nginx/html/images
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

