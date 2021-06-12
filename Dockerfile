FROM node:14

WORKDIR /usr/src/app

COPY package*.json .env .eslintrc.json .prettierrc .gitignore README.md tsconfig.json ./
COPY doc ./doc
COPY src ./src
COPY logs ./logs
COPY test ./test

RUN npm install

COPY ormconfig.docker.json ./ormconfig.json

EXPOSE 4000

CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "start" ]