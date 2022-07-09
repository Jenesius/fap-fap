FROM node:16 as front-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm i
COPY frontend ./
RUN npm run build
# Frontenn build in the folder: app/frontend/build

FROM node:16 as back-builder
WORKDIR /app 
COPY backend/package*.json ./
RUN npm i

COPY backend .
# Build bundle to dist folder
RUN npm run build

FROM node:16
WORKDIR /app
COPY --from=back-builder /app/dist ./
COPY backend/package*.json ./
RUN npm i

EXPOSE 3001

CMD ["node", "app/backend/dist/app.js"]