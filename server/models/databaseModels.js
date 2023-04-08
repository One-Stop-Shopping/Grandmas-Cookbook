// Node-PostgreSQL package for connecting node server with PostgreSQL database
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  // Secret PostgreSQL database URI stored in local .env
  connectionString: process.env.DB_URI,
});

/*
It is a good practice to have id in the table, to provide a stable reference point (won't change if any data of the row is updated) for other tables.  

  CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    url VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    ingredientList JSON,
    directions JSON,
    image_path VARCHAR(255),
  )
  
  Store the image in file system and store the path to image file in the image_path column of recipes table.
    OR
  Store the recipe's image (binary data itself) in separate table to keep the recipes table lean and efficient pg_read_binary_file('/path-to-image/')

  CREATE TABLE recipeImages (
    id SERIAL PRIMARY KEY,
    image BYTEA,
    recipe_id VARCHAR(255) REFERENCES recipes (id),
  )

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
  )
  
  Join table for the many to many relation between recipes and users 
  CREATE TABLE users_recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    recipe_id INTEGER REFERENCES recipes (id),
  )
 */

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query: ', text);

    // Simplified version query (no need to connect or release in pool), but cannot be used for transaction(https://node-postgres.com/features/transactions).
    return pool.query(text, params, callback);
  },
};
