# more on multi-stage builds @ https://docs.docker.com/develop/develop-images/multistage-build/

FROM node:17.5.0-alpine as ts-compiler
WORKDIR /home/front/app
COPY package*.json ./
COPY tsconfig*.json ./

# dev stage
FROM ts-compiler as dev
RUN npm i 
COPY . .

FROM dev as build
RUN npm run build

# remove ts compiler and dev dependencies for production
FROM node:17.5.0-alpine as build-no-dev-deps
WORKDIR /home/front/app
COPY --from=build /home/front/app/package*.json ./
COPY --from=build /home/front/app/build ./
RUN npm install --only=production

# prod stage
# FROM nginx:1.21.5-alpine as prod
# COPY --from=build-no-dev-deps /home/front/app/build /usr/share/nginx/html