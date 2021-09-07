
# Dew
The point of Dew isn't to reinvent the wheel. It is simply a micro task manager in its purest form. Users can create, read, update and delete tasks and groups of tasks to keep themselves organized.


## Features

- Creating, editing and deleting Tasks once completed (or whenever, no pressure)
- Creating, editing and deleting groups of tasks


  
## Screenshots

![App Screenshot](https://github.com/sergeveli/Dew/blob/main/splashscreenshot.png)
![App Screenshot](https://github.com/sergeveli/Dew/blob/main/allscreenshot.png)
![App Screenshot](https://github.com/sergeveli/Dew/blob/main/choresscreenshot.png)
![App Screenshot](https://github.com/sergeveli/Dew/blob/main/errandsscreenshot.png)
![App Screenshot](https://github.com/sergeveli/Dew/blob/main/miscscreenshot.png)

  
## Tech Stack

**Client:** <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>

**Server:** <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>

  
## What's Next?

This was my first solo full stack project and I must say, it was quite the adventure. I learned many things, such as the importance of keeping code organized and making sure to sweat over the details. The future of Dew includes layout/styling optimization as well as code being refactored. As far as features go, a pomodoro timer is something that may be part of the next steps. 

  
## Run Locally

From the root of the app, let's enter the backend directory and run the following command:

### Install Dependencies
```bash
  npm install
```

Now let's return to the root, enter the frontend directory and run the same command:


```bash
  npm install
```

### Mounting the Database

Let's enter the backend directory, create a .env file and populate it with the following:
```bash
  DB_USERNAME = YourUserNameOfChoice
  DB_PASSWORD = YourPasswordOfChoice
  DB_DATABASE = YourDatabaseNameOfChoice
  DB_HOST = localhost
  JWT_SECRET = YourGeneratedJWTSecret
  JWT_EXPIRES_IN = 604500
```

While remaining in the backend, we can run the following command to run a migration:
```bash
  npx dotenv sequelize-cli db:migrate
```

Next, run the following command to seed the data we just migrated in previous step:
```bash 
  npx dotenv sequelize-cli db:seed:all
```

### Deploying on Localhost

To run this app on our local machine, we want to open two (2) terminals.

In one terminal, we want to navigate to the backend directory. 
In the other terminal, we want to navigate to the frontend directory.

Once both terminals are open and we are in the correct directories, we want to run the following command in each:
```bash
  npm start
```

Now, we should be able to reach the app by navigating to http://localhost:3000/

## Feedback

If you have any feedback, please reach out to me at skassangana90@gmail.com
  
