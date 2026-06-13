FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM caddy:2-alpine
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile