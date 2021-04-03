# develop stage
FROM node:12.20.2-alpine3.10 as develop-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn global add @quasar/cli
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn
RUN quasar build
# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# RUN yarn serve
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]