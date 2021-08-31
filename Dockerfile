FROM node:14 as build-stage

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:and:prune

EXPOSE 4200

CMD ["npm", "run", "start:prod"]
