FROM node:20-alpine
WORKDIR /app
COPY . /app
CMD ["sh", "-c", "npm install && node app.js"]
EXPOSE 8080