FROM node:14 as build-stage

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

# Configure the main process to run when running the image
ADD startup.sh /
RUN chmod +x /startup.sh
CMD ["/startup.sh"]
