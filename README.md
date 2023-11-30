## React
#### packages installed
```
npm i sass
npm i react-chartjs-2 chart.js
npm i axios
```

## Instructions
### 1. clone repository
```
https://github.com/Marin303/shopping_list_manager.git

```
### 2. cd/shopping_list_manager/frontend
```
npm install
```
```
npm start
```
### 3. cd/shopping_list_manager/backend
```
npm install
```
```
npm start
```
# Docker
### path shopping_list_manager
```
docker build -t frontend-image ./frontend
docker build -t backend-image ./backend
```
#### Ensure DockerDesktop is Running
```
docker run -p 3001:3001 backend-image
docker run -p 3000:3000 frontend-image
```

## Frontend
- custom made product.json - inside backend folder
- Connection to API inside src/Assets/Api

### Layout
- Layout - contains all main logic for web application
        - handlers for shoppingList names, routing to main components

### Components
   - Analytics - Chart - fetching product.json
  
   - Create Menu - Menu to create NewShoppingList component
 

- NewShoppingList - Form for creating custom shopping list content
                 - It appears every time when a user creates new shopping list
  
- ShoppingList - header contains all shopping categories
               - for mobile version contains a dropdown category menu
- ShoppingNavBar - routing to category


### Products
- contains all categories separated - connection to API component

## Backend
- server.js - storing object thought keys into product.json 

## To fix:
<ol>
  <li>forms name</li>
  <li>add localstorage to Api.jsx - update json</li>
  <li>responsive menu mobile - on smaller screen looks big</li>
  <li>header minify on mobile</li>
</ol>

## Project look initial phase

  <img width="40%" alt="Project Look Initial 01" src="https://github.com/Marin303/shopping_list_manager/assets/117216819/87014e21-04c8-4881-9696-68cb87f80ac3" /></br>
  <img width="40%" alt="Project Look Initial 02" src="https://github.com/Marin303/shopping_list_manager/assets/117216819/95f8e8d9-b75a-412a-bd0d-245b0daa44cd" />


