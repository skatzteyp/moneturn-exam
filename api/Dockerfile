FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json prisma ./ 
COPY src ./src

RUN npx prisma generate

EXPOSE 3001

CMD sh -c "npx prisma db push && npm run dev"
