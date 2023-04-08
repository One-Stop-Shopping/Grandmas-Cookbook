// Node-PostgreSQL package for connecting node server with PostgreSQL database
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  // Secret PostgreSQL database URI stored in local .env
  connectionString: process.env.DB_URI,
});

/*
 TO-DO: Add notes about the database (schema, etc.)
  CREATE TABLE recipe (
    url VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    ingredientList JSON,
    directions JSON,
    image BYTEA
  )

  CREATE TABLE user (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
  )
 */

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query: ', text);

    // Simplified version query (no need to connect or release in pool), but cannot be used for transaction(https://node-postgres.com/features/transactions).
    return pool.query(text, params, callback);
  },
};
