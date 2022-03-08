FROM node:15

WORKDIR /application

COPY package.json .

RUN npm i

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start"]