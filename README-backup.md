## Init Project
npm init -y

## Install typescript
npm install -D typescript
npm install -D ts-node

### automatically restarting the node application when file changes
npm install -D nodemon 

## Install PostgreSQL package
npm install pg

## Install environemnt file
npm install dotenv

## Install encryption package
npm install bcrypt

## Create the required files
tsconfig.json
```
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "node",
        "baseUrl": "src",
        "outDir": "dist",
        "strict": true,
        "sourceMap": true,
        "noImplicitAny": true,
    },
    "include": [
        "src/**/*"
    ]
}
```

nodemon.json
```
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "exec": "ts-node ./src/index.ts"
}
```

## Install the required package
npm install express body-parser cookie-parser compression cors
npm install -D @types/node @types/express @types/body-parser @types/cookie-parser @types/compression @types/cors @types/knex @types/bcrypt

## Install migrations
npm install knex
npx knex init

### Edit knexfile.js to set up your PostgreSQL connection.
```
import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'todolist',
      password: 'todolist',
      database: 'todolist',
    },
    pool: {
      min: 2,
      max: 100
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations'
    }
  },

};

export default config;

```

### create migrations
npx knex migrate:make create_users_table

### run migrate
npx knex migrate:latest

### run seeds
npx knex seed:run

## Install Swagger
npm install swagger-jsdoc swagger-ui-express
npm install -D @types/swagger-jsdoc @types/swagger-ui-express

## Install Jest
npm install -D jest ts-jest @types/jest supertest @types/supertest

## Install Redis
npm install redis