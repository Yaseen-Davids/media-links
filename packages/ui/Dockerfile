FROM node:alpine as build

# EXPOSE 8080 
RUN mkdir -p /app/public /app/src
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["serve", "-p", "$PORT", "-s", "dist"]