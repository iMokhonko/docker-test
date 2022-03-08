FROM node:15

WORKDIR /application

COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
      then npm install; \
      else npm install --only=production; \
      fi

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start"]