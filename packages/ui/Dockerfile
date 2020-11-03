FROM node:alpine as build

# EXPOSE 8080 
RUN mkdir -p /app/public /app/src
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx as server
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html