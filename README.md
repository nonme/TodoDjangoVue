# Django/Vue Todo List

## Getting started

RUN: Development mode (enables hot-reloading, separate databases, debug mode for django):

    docker-compose --env-file .env.development -f docker-compose.dev.yml up

In both cases you will be able to access Vue front-end on http://localhost:8080/.
You can send requests directly to back-end on http://localhost:8000/.

## Routes:

POST: /api-token-auth/
with body: {username, password} returns {token}

For all below, you must set headers Authorization: Token {your_token} and Content-Type: application/json (for POST methods).

GET: /tasks/
returns a list of tasks

POST: /tasks/
with body {caption, description} will create a new task

Database used: PostgresSQL 13

On the first launch it will pollute the db with sample tasks and user johndoe (creds to login are filled by default in frontend). It is done in init_db.py for general simplicity and only once.
There are basic test in tasks app.
.env files comitted so you can launch everything.

gunicorn could be used as a server in production, however it would require configuring nginx for vue which is beyound the scope of test task, i think.
