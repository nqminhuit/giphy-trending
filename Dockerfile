FROM node:14.15.4-alpine3.10 as build
WORKDIR /giphy-trending-app
COPY ./package.json /giphy-trending-app/package.json
COPY ./package-lock.json /giphy-trending-app/package-lock.json
RUN npm clean-install
COPY . .
RUN npm run build:prod

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /giphy-trending-app/dist /usr/share/nginx/html
