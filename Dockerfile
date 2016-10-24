FROM node:6.6

MAINTAINER Quentin Meffre <quentin.meffre@epitech.eu>

WORKDIR /myapp
COPY . /myapp
RUN (cd /myapp/server && npm i)
RUN (cd /myapp/client && npm i)

WORKDIR /myapp
CMD node ./server/index.js
