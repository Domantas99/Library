This project requires [Docker](https://docs.docker.com/docker-for-windows/), latest [Node.js](https://nodejs.org/en/) and [.NET Core SDK 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1) (Installs with visual studio 2019 when selecting web application on install)

## To Start Data Base

In the project directory run command:

### `docker-compose up --build -d`

This will create docker container containing MS SQL database
This command is only going to be run first time. On consecutive runs use this command to start container:

### `docker-compose start`

And to stop it: 

### `docker-compose stop`

To access database use Microsoft SQL server management studio and connect to localhost using these credentials:

```
User: RootUser
Password: Root2019
```

## To Start back end

For building you can use Visual Studio or Command CLI

Open solution with VS and build as normal OR Inside ``Project Root\book-library-api\book-library-api`` directory run this command:

### `dotnet build`

To start API inside ``Project Root\book-library-api\book-library-api`` directory run this command:

### `dotnet watch run`

This will start Web API on [http://localhost:5000](http://localhost:5000)

**At this point yuo can code and build your code as usual the app will hot reload the changes after each build**

## Database Migrations

We will use code first migration model. This means that after we change our model in code we will need to generate migrations.
More on that [here.](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)

First time database will be empty and ypu will need to run migrations.

Make sure that docker container is up and running.

For that run this command in CMD:

### `docker ps`

You should see and entry that has this in COMMAND column: ``./entrypoint.sh``
##

#### Using Visual Studio:

Open package manager console

Select default project as `BookLibrary.DataBase`

Make sure that `BookLibrary.API` project is set as startup

Run this command inside package manager console:

### `Update-Database`
##

#### Using Command CLI

install CLI Tools using this command:

### `dotnet tool install --global dotnet-ef`

Inside ``Project Root\book-library-api\book-library-api`` run this command to update database:

### `dotnet ef database update`

##

At this point database should have initial structure. To add migrations after model was changed you need to add migrations and update database.

To do this in VS run this command inside package manager console:

### `Add-Migration SomeMigrationName`

and after that

### `Update-database`

For CLI Tools use this command to add migration:

### `dotnet ef migrations add SomeMigrationName`

and after that

### `dotnet ef database update`

#

## To Start Front-End

In the project directory open book-library folder and run these commands:

### `npm install`
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />