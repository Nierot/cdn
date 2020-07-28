FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install nodemon

COPY . .

EXPOSE 8080

CMD ["nodemon", "app.js"]