FROM node:12.16.2-alpine3.11

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install

ENV NODE_ENV=production

RUN npm run build && npm i -g http-server

# Remove unused directories
RUN rm -rf ./src
WORKDIR /usr/src/app/dist

# Port to expose
EXPOSE 8080
CMD [ "httpserver" ]