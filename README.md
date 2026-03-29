# BLOG API (WIP)

## Technologies
* Node.js v22.14
* PostgreSql 17.6
* pg 8.16
* @prisma/client 7.6
* @prisma/config 7.7
* express.js 5.2
* bcrypt.js v3.0
* dotenv 17.3
* jsonwebtoken v9.0
* prisma 7.6
* uuid 13.0

## Installation and Setup
### Install dependencies
```
    git clone github.com/IGrewal08/Blog-API
```
```
npm install
```

### Create database in Postgres
* Setup DATABASE_URL in .env file then run:
```
    npx prisma migrate dev --name init
```
```
    npx prisma generate
```

### Run Project
Use PORT=3000 for backend (in backend directory)
```
    npm start
```
For admin and client frontend run:
```
    npm run dev
```
