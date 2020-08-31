This is a coding test for Backend Developer job made to CodeLeap.

* Used techologies: Django, Django REST Framework, PostgreSQL, React, TypeScript, Styled Components, ESLint, Prittier, Context API.
* Unittest with pytest for backend and jest for frontend will be added later

# Usage instructions
1. Clone project to a directory of your preference

## Backend

### Setting up database (only work with PostgreSQL)
#### With Docker
1. Run `(sudo) docker-compose up db`
2. Create a **.env** file on backend project directory **/network/network**
3. Fill with:
```sql
POSTGRESQL_DB=network
POSTGRESQL_HOST=localhost
POSTGRESQL_PORT=5432
POSTGRESQL_USER=postgres
POSTGRESQL_PASS=postgres
```
#### Without Docker
1. Create a new database named **network** on your PostgreSQL connection
2. Create a **.env** file on backend project directory **/network/network**
3. Fill the database variables **POSTGRESQL_DB, POSTGRESQL_HOST, POSTGRESQL_PORT, POSTGRESQL_USER and POSTGRESQL_PASS** on .env file with your database settings

4. **(with or without docker)** On the same directory level that manage.py run `python manage.py migrate`

* There is also two optional keys that you can add to the .env file: **SECRET_KEY** and **DEBUG** (default is false)
* There is a **.env.example** with all keys if you get lost somehow

### Setting up and running API
1. Run `pip install requirements.txt` 
2. On the same directory level that manage.py run `python manage.py runserver`

### API Methods - endpoint (there will be a swagger later)
#### User
1. **POST - /user/api/v1/create/** - Create a user
```
body: {
*username: string
*password: string
*email: string
}
```
2. **POST - /user/api/v1/login/** - Log in a user
```
body: {
*username: string
*password: string
}
```
#### Post
1. **GET - /post/api/v1/post/** - Get list of posts (no authentication needed)
2. **GET - /post/api/v1/post/{post_id}** - Retrieve post (no authentication needed)
3. **POST - /post/api/v1/post/** - Create post (authentication needed)
```
body: {
*title: string
*content: string
}
header: {
*Authorization: Token **token from logged user** (eg: Authorization: Token 6d26e00d06019d175776c8a662160c0282e1c906)
}
```
4. **PUT - /post/api/v1/post/{post_id}** - Update post (authentication and ownership needed)
```
body: {
*title: string
*content: string
}
header: {
*Authorization: Token **token from logged user** (eg: Authorization: Token 6d26e00d06019d175776c8a662160c0282e1c906)
}
```
5. **PATCH - /post/api/v1/post/{post_id}** - Partial update post (authentication and ownership needed)
```
body: {
title: string
content: string
}
header: {
*Authorization: Token **token from logged user** (eg: Authorization: Token 6d26e00d06019d175776c8a662160c0282e1c906)
}
```
6. **DELETE - /post/api/v1/post/{post_id}** - Delete post (authentication and ownership needed)
```
header: {
*Authorization: Token **token from logged user** (eg: Authorization: Token 6d26e00d06019d175776c8a662160c0282e1c906)
}
```
## Frontend
### Setting up modules
#### With npm
1. Run `npm install` on same directory level of packege.json

#### With yarn
1. Run `yarn` on same directory level of packege.json

### Running Frontend
1. Run `npm start` or `yarn start`
