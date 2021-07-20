FROM node:14 as build-stage

WORKDIR .

COPY package*.json ./

RUN npm install --only=prod

COPY . .

EXPOSE 4200

CMD [ "npm","run", "build" ]

FROM nginx:1.20.1

COPY --from=build-stage ./build /usr/share/nginx/html

COPY --from=build-stage ./nginx.conf /etc/nginx/conf.d/default.conf

