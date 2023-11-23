FROM node:18

WORKDIR /shopping_list_manager/frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]


