FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server.js ./server.js
RUN npm init -y >/dev/null 2>&1 && npm install express@4 --omit=dev
EXPOSE 8080
CMD ["node", "server.js"]
