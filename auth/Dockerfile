FROM node:10.22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD [ "nodemon", "src/index.ts" ]