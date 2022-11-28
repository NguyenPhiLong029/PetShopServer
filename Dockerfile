FROM node:16.0.0-alpine
WORKDIR /app
COPY . /app
RUN chmod +x /app
RUN yarn install
RUN yarn build

EXPOSE 9900

CMD [ "yarn", "start" ]

