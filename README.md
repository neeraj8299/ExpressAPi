# ExpressAPi

1.) clone the repository from https://github.com/neeraj8299/ExpressAPi


2.) make .env file in project root folder


3.) Add following key


  NODE_ENV=development

  PORT=4000


4.) install package using npm install 


5.) create database and replace value in config/config.json and UserRepository.js

6.) Run following command for creating 1st user:-

  npx sequelize-cli db:migrate
  
  npx sequelize-cli db:seed:all


6.) start server using npm start and test api


