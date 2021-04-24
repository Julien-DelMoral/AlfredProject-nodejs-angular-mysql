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
# Front
cd frontend-angular
npm start

# Api
cd api
npm run build
npm run dev
```

Then access Frontend  with `http://localhost:4200`, Api with `http://localhost:3000`.

### MySQL

In the folder `mysql/sql`, there is a SQL file called `inital.sql`, which will become initial database table/rows. MySQL
port is mapped to 3306.

## Features

- Frontend - Angular

  - User registration
  - Confirm user email address
  - Reset user password
  - User login/logout

## Todo
- [ ] Docker
- [ ] CI/CD
- [ ] Unit tests
- [ ] E2E tests
