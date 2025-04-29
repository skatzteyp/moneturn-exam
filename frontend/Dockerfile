FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY vite.config.ts tsconfig.json ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
