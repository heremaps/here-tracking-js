FROM node:12-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/

RUN npm install --non-interactive

COPY . /usr/src/app/

CMD ["npm", "run", "test"]
