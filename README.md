## Express Notes Backend

### Project Setup

### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Database Config Setup
Create new database (let's say I'm going to use mysql and my database name is **express-sequelize-api**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=express-sequelize-api   # database name
DB_DIALECT=mysql                # database dialect
DB_PORT=3306                    # database port
```
some other inportant parameters/keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=3000           # application port
SECRET=secret           # secret key for encrypt/decrypt JWT token
```


### Migration and Seeders run
After creating database and updating .env file run below commands
```
> node_modules/.bin/sequelize db:migrate
> node_modules/.bin/sequelize db:seed:all
```
Migration will create table users and seed some default users
* **users** - this is normal user table with some required fields like (firstName, lastName, email, password, and isAdmin)
Seeders will create one new client entry in application and 2 users entry one admin and one normal user.

`npm start` to run your project 
>Everythig is setup and you are good to go now. Happy Coding :)

## Middlewares
```
> ApiAuth this will check user access token that we have return in login response.
> AdminAuth this will check admin auth and it's access.
```

## Routing files
> Currently we have added 3 routing files 
```
> pub.js   # public routing access everyone can access this APIs
> api.js   # only logged in user/ with vaild token user can access this routes
> admin.js # only admin can access with valid token
```