FROM node:lts

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3300

CMD ["yarn", "run", "start"]