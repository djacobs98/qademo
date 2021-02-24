# qademo
Demo of e2e CI tests of a javascript app

## Description:
The application iteslf is based on a tutorial on integrating a REACT frontend with a backend using MySQL and Sequelize.

https://bezkoder.com/react-node-express-mysql/#Run_React_CRUD_App

or on GIT:

https://github.com/bezkoder/react-express-mysql

## Prerequisites:
* NodeJS
* MySQL
* Use MySQL to create a database called testdb, and a user named tester with no password. (see KNOWN ISSUES)

## Installation:
* Clone the repository
* in qademo/nodejs-express-sequelize-mysql:
```
> npm install
```

* in qademo/react-crud:
```
npm install
```

## Running the application in local mode (default):
* in qademo/nodejs-express-sequelize-mysql:
```
> npm run start
```

* in qademo/react-crud:
```
npm run start
```

Application is now running on localhost, port 8080 for the API, and 8081 for the frontend.

## To run the application in remote mode:
NOTE: Remote mode is only used if the application is running on a remote server, but you want to use your local browser to view and use it.
The test scripts will NOT work in remote mode.

Before running the applications, make the following changes:
* qademo/nodejs-expres-sequelize-mysql/server.js
> change localhost to the IP address of the Ubuntu server.
* qademo/react-crud/src/http-common.js
> change localhost to the IP address of the Ubuntu server.
* qademo/react-crud/package.json change:
```
"scripts": {
    "start": "react-scripts start",
```
to
```
"scripts": {
    "start": "HOST=MY_IP_ADDRESS react-scripts start",
```
where MY_IP_ADDRESS is the IP address of your server.

## To run the tests:
* Start the application in local mode
* in qademo/react-crud
```
npm run test
```

## Known Issues:
* The tutorial is spread among 4 separate articles, and has some inconsistencies when it comes to names. Fortunately the error messages are pretty clear.  Some of the source files are also different between the articles. When in doubt, always use the main article's files, and make your modifications from there.

* The tutorial was written with the assumption you are running the application and your web browser on the same physical machine. As a result, everything runs as localhost.
This causes problems if, like me, you wanted to develop and serve the app from a separate server, and then access it with your laptop's web browser.

* I was unable to run the create_mysql_db_user.sh script since sudo always asks for my password. The quickest workaround was to manually execute the commands.  Once the user and database are created, there are no further issues.
