FROM node:16 as base
WORKDIR /home/front/app
COPY package.json ./
RUN npm i 
COPY . .
# RUN ["npm NODE_OPTIONS=--max-old-space-size=512"]

FROM base as build
RUN npm run build

FROM nginx:latest as production
COPY --from=build /home/front/app/build /usr/share/nginx/html