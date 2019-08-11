#Base image 
FROM node

LABEL author="Felix Avelar"

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV production
ENV PORT 80

EXPOSE 80

CMD [ "npm", "start" ]