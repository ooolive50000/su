FROM node:22-alpine
LABEL "language"="nodejs"
LABEL "framework"="vite"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["npx", "serve", "dist", "-l", "8080"]