FROM node:18

WORKDIR /shopping_list_manager/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "start"]
