FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

EXPOSE 8080

CMD ["nodemon", "/usr/src/app/src/app.js"]