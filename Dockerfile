FROM node:5

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install --silent
COPY . /app

CMD ["npm", "start"]
