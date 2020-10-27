FROM node:14-alpine3.12 AS BUILD

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . /usr/src/app
RUN yarn build:prod

FROM node:14-alpine3.12

WORKDIR /app
COPY --from=BUILD /usr/src/app/dist /usr/src/app/package.json /usr/src/app/yarn.lock ./
RUN yarn install --production
EXPOSE 3001
USER 1000
ENV NODE_ENV "production"
CMD ["node", "/app/index.js"]