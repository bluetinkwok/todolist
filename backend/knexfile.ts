import type { Knex } from 'knex';
require('dotenv').config();

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 500
    },
    migrations: {
      directory: './src/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'your_database_user',
  //     password: 'your_database_password',
  //     database: 'your_database_name',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 100
  //   },
  //   migrations: {
  //     directory: './migrations',
  //     tableName: 'migrations'
  //   }
  // },

  // production: {
  //   client: 'pg',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'your_database_user',
  //     password: 'your_database_password',
  //     database: 'your_database_name',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 100
  //   },
  //   migrations: {
  //     directory: './migrations',
  //     tableName: 'migrations'
  //   }
  // }

};

export default config;