FROM node:14

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD [ "npm","run", "build" ]
CMD [ "npm","run", "start:prod" ]
