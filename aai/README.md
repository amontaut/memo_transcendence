# Instructions

API with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).


## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- Database type-safe access w/ [Prisma](https://www.prisma.io/)
- JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- REST API docs w/ [Swagger](https://swagger.io/)

## Overview

Sorry, all instruction need to be changed becuase of dockerisation.

In the nutsheell:
1. run docker-compose up --build
2. inside the working api container run the shell inside
```
docker exec -it #of_the_container sh

```
3. run inside the container
```
npx prisma generate

```
4. exit from the container
5. apollo server for Graphql http://localhost:4000/graphql 
6. fake client instance      http://localhost:3000
7. simple back answer        http://localhost:4000
8. adminer from DB           http://localhost:8080


The read.me will be finished later.




## Prisma Setup

### 1. Install Dependencies

Install [Nestjs CLI](https://docs.nestjs.com/cli/usages) to start and [generate CRUD resources](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute)

```bash
npm i -g @nestjs/cli
```

Install the dependencies for the Nest application:

```bash
npm install
```

### 2. PostgreSQL with Docker

Setup a development PostgreSQL with Docker. Copy [.env.example](./.env.example) and rename to `.env` - `cp .env.example .env` - which sets the required environments for PostgreSQL such as `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`. Update the variables as you wish and select a strong password.

Start the PostgreSQL database

```bash
docker-compose -f docker-compose.db.yml up -d
# or
npm run docker:db
```

### 3. Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the PostgreSQL database. Prisma reads the `DATABASE_URL` from the root [.env](./.env) file.

Use Prisma Migrate in your [development environment](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#evolving-the-schema-in-development) to

1. Creates `migration.sql` file
2. Updates Database Schema
3. Generates Prisma Client

```bash
npx prisma migrate dev
# or
npm run migrate:dev
```

### 4. Prisma: Prisma Client JS

[Prisma Client JS](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api) is a type-safe database client auto-generated based on the data model.

Generate Prisma Client JS by running

> **Note**: Every time you update [schema.prisma](prisma/schema.prisma) re-generate Prisma Client JS

```bash
npx prisma generate
# or
npm run prisma:generate
```

### 5. Seed the database data with this script

Execute the script with this command:

```bash
npm run seed
```

### 6. Start NestJS Server

Run Nest Server in Development mode:

```bash
npm run start

# watch mode
npm run start:dev
```

GraphQL Playground for the NestJS Server is available here: http://localhost:3000/graphql

**[⬆ back to top](#overview)**

## GraphQL Playground

Open up the [example GraphQL queries](graphql/auth.graphql) and copy them to the GraphQL Playground. Some queries and mutations are secured by an auth guard. You have to acquire a JWT token from `signup` or `login`. Add the `accessToken`as followed to **HTTP HEADERS** in the playground and replace `YOURTOKEN` here:

```json
{
  "Authorization": "Bearer YOURTOKEN"
}
```

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.


## Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
npx prisma generate
# or in watch mode
npx prisma generate --watch
# or
npm run prisma:generate
npm run prisma:generate:watch
```

**[⬆ back to top](#overview)**

## NestJS - Api Schema

The [schema.graphql](./src/schema.graphql) is generated with [code first approach](https://docs.nestjs.com/graphql/quick-start#code-first) from the models, resolvers and input classes.

You can use [class-validator](https://docs.nestjs.com/techniques/validation) to validate your inputs and arguments.


## GraphQL Client

A GraphQL client is necessary to consume the GraphQL api provided by the NestJS Server.

Checkout [Apollo](https://www.apollographql.com/) a popular GraphQL client which offers several clients for React, Angular, Vue.js, Native iOS, Native Android and more.

**[⬆ back to top](#overview)**
