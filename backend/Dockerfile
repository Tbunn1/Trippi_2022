FROM node:14

COPY package*.json /
# COPY ./src /
# VOLUME ./src:/src

RUN mkdir -p /uploads


EXPOSE 8080

RUN npm i
CMD [ "npm", "start" ]