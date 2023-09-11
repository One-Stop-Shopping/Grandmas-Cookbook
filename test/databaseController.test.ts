import databaseController from '../server/controller/databaseController';
import { Pool } from 'pg';
import Dotenv from 'dotenv';

describe('Test databaseController middlewares', () => {
  Dotenv.config();

  const pool = new Pool({
    connectionString: process.env.DB_URI_TEST,
  });

  beforeAll(async () => {
    await pool.query(`CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);

    await pool.query(`CREATE TABLE recipes (
      id SERIAL PRIMARY KEY, 
      url VARCHAR(255),
      title VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR (255),
      ingredientList JSON,
      directions JSON,
      tastyId INTEGER,
      imagePath VARCHAR(255),
      userId INTEGER REFERENCES users (id)
    )`);
  });

  afterAll(async () => {
    await pool.query(`DROP TABLE users, recipes`);
    await pool.end();
  });

  it('databaseController.addRecipe should add a new recipe to database', async () => {
    const req = {
      body: {
        url: 'mockUrl',
        title: 'mockTitle',
        description: 'mockDescription',
        ingredientList: ['mockIngredient1', 'mockIngredient2'],
        directions: ['mockDirection1', 'mockDirection2'],
        tastyId: 1,
        imagePath: 'mockImagePath',
      },
    };
    const res = { locals: {} };
    const next = jest.fn();

    await databaseController.addRecipe(req, res, next);
    const dbEntry = await pool.query(`SELECT * FROM recipes`);

    expect(dbEntry.rows).toBeInstanceOf(Array);
    expect(dbEntry.rows.length).toEqual(1);
    expect(dbEntry.rows[0]).toEqual({
      id: 1,
      url: 'mockUrl',
      title: 'mockTitle',
      description: 'mockDescription',
      ingredientlist: ['mockIngredient1', 'mockIngredient2'],
      directions: ['mockDirection1', 'mockDirection2'],
      tastyid: 1,
      imagepath: 'mockImagePath',
      userid: null,
    });
    expect(res.locals).toEqual({
      id: 1,
      url: 'mockUrl',
      title: 'mockTitle',
      description: 'mockDescription',
      directions: ['mockDirection1', 'mockDirection2'],
      ingredientList: ['mockIngredient1', 'mockIngredient2'],
      tastyId: 1,
      imagePath: 'mockImagePath',
      userId: null,
    });
  });
});
