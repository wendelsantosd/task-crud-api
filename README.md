<div>
<h1 align="center">
Task CRUD
</h1>
</div>

<div align="center">

<img src="https://img.shields.io/badge/NodeJS-18.17.1-green">

<img src="https://img.shields.io/badge/Nest.js-17.0.2-EA2845">

<img src="https://img.shields.io/badge/Typescript-5.1.3-blue">

</div>

# Overview

The "Task CRUD" is a platform that allows creating, editing, deleting, and reading data. It is the response to a challenge proposed by a company. It was built using Node.js with TypeScript and the Nest.js framework, utilizing a relational database called PostgreSQL, and Prisma.io was employed.

# Contribute

1. Clone the repository:

```shell
git clone https://github.com/wendelsantosd/task-crud-api.git
```

2. Enter the directory:

```shell
cd task-crud-api
```

3. Install dependencies:

```shell
yarn
```

4. Start development server:

```shell
yarn start:dev
```

# PostgreSQL with Docker

1. Execute:

```shell
docker compose -f docker-compose.local.yml up -d
```

2. Push DB:

```shell
yarn prisma db push
```

# Routes

1. Create a Task

```shell
POST
```

```shell
/task
```

```shell
body: {
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "priority": "Média",
    "completionDate": "2024-01-15T23:59:59.148Z"
}
```

2. Update a Task

```shell
PUT
```

```shell
/task/:id
```

```shell
body: {
    "title": "Tarefa 1 Edit",
    "description": "Descrição da tarefa 1 Edit",
    "priority": "Alta",
    "completionDate": "2024-01-15T23:59:59.148Z"
}
```

3. Change Task Status

```shell
PATCH
```

```shell
/task
```

```shell
body: {
  status: "Concluído"
}
```

4. List Tasks

```shell
GET
```

```shell
/task
```

5. Get a Task

```shell
GET
```

```shell
/task/:id
```

6. Delete a Task

```shell
DELETE
```

```shell
/task/:id
```

# Contact us

<p style="font-size: 18px;">
Wendel Santos, 2024.
</p>
<p style="font-size: 18px;">
wendelwcsantos@gmail.com
</p>
