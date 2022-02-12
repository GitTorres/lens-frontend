# more on multi-stage builds @ https://docs.docker.com/develop/develop-images/multistage-build/

FROM node:16 as dev
WORKDIR /home/front/app
COPY package.json .
RUN npm i 
COPY public ./public

FROM dev as build
RUN npm run build

FROM nginx:1.21.5-alpine as production
COPY --from=build /home/front/app/build /usr/share/nginx/html