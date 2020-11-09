FROM node:12

WORKDIR /usr/src/app

RUN mkdir /music
RUN mkdir /usr/src/app/temp

#COPY package*.json ./
COPY . .

RUN npm install
#RUN npm install -g nodemon

EXPOSE 8080

#CMD ["nodemon", "/usr/src/app/src/app.js"]
CMD ["node", "/usr/src/app/src/app.js"]