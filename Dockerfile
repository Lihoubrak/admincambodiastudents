FROM node:20.11.1-alpine

WORKDIR /index
COPY package*.json ./

RUN npm i 

COPY . .

CMD [ "npm", "start" ]