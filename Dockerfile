FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build-prod

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/www /app
COPY nginx.conf /etc/nginx/nginx.conf