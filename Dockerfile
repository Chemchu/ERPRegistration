FROM node:16.15.1
ENV NODE_ENV=production

WORKDIR /erpregistration

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 7070
CMD [ "node", "index.js" ]