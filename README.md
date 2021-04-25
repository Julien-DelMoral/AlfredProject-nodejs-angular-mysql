# Node.js (REST API) + Angular + MySQL

This is a boilerplate project. The project contains Node.js REST API and frontend developed by Angular.

- API
  - Node.js, Express, JWT, Promise MySQL, Node Mailer Nodemon
- Frontend - Angular
  - Material ui, Toastr

## Demo

| Service            | Endpoint                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| API                | [https://alfred.jdelm.com/api/](https://alfred.jdelm.com/api/)                                           |
| Frontend - Angular | [https://alfred.jdelm.com/](https://alfred.jdelm.com/)                                                   |


## How to start in your local environment

```bash
# Docker mysql and fake smtp
$ docker-compose up -d
```

```bash
# Front
cd frontend-angular
npm start
```

```bash
# Api
cd api
npm run build
npm run dev
```
Then you can access services with below URL.

| Service            | Endpoint                                                         |
| ------------------ | ---------------------------------------------------------------- |
| API                | [http://localhost:3000](http://localhost:3000)                   |
| Frontend           | [http://localhost:4200](http://localhost:4200)                   |
| Mail               | [http://localhost:8025](http://localhost:8025)                   |
| MySQL              | localhost:3307                                                   |

There are two user in the database initially. You can use them to login Frontend.

| Username | Email              | Password |
| -------- | ------------------ | -------- |
| admin    | admin@alfred.local | 123456   |
| user     | user@alfred.local  | 123456   |


### MySQL

In the folder `mysql/sql`, there is a SQL file called `inital.sql`, which will become initial database table/rows. MySQL
port is mapped to 3307.

## Features

- Frontend - Angular

  - User registration
  - Confirm user email address
  - Reset user password
  - User login/logout

## Todo
- [x] Docker
- [ ] CI/CD
- [ ] Unit tests
- [ ] E2E tests
