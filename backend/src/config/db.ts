import Knex from 'knex';
import knexConfig from '../../knexfile';
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

// Initialize Knex
const knex = Knex(config);

knex.raw('SELECT 1')
.then(() => {
    console.log('Database connection established successfully');
})
.catch((err) => {
    console.error('Failed to establish database connection:', err);
});


export default knex;
