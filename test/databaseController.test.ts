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

  it('databaseController.getAllRecipes should return all recipes in database', async () => {
    const addReq = {
      body: {
        url: 'mockUrl2',
        title: 'mockTitle2',
        description: 'mockDescription2',
        ingredientList: ['mockIngredient1', 'mockIngredient2'],
        directions: ['mockDirection1', 'mockDirection2'],
        tastyId: 1,
        imagePath: 'mockImagePath2',
      },
    };
    const addRes = { locals: {} };
    const addNext = jest.fn();
    await databaseController.addRecipe(addReq, addRes, addNext);

    const req = {};
    const res = { locals: [] };
    const next = jest.fn();
    await databaseController.getAllRecipes(req, res, next);

    expect(res.locals).toBeInstanceOf(Array);
    expect(res.locals.length).toEqual(2);
    expect(res.locals[0]).toEqual({
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
    expect(res.locals[1]).toEqual({
      id: 2,
      url: 'mockUrl2',
      title: 'mockTitle2',
      description: 'mockDescription2',
      directions: ['mockDirection1', 'mockDirection2'],
      ingredientList: ['mockIngredient1', 'mockIngredient2'],
      tastyId: 1,
      imagePath: 'mockImagePath2',
      userId: null,
    });
  });

  it('databaseController.updateRecipe should update the recipe in database', async () => {
    const req = {
      body: {
        url: 'mockUrl',
        title: 'mockTitle',
        description: 'updatedDescription',
        ingredientList: ['updatedIngredient1', 'mockIngredient2'],
        directions: ['updatedDirection1', 'mockDirection2'],
        tastyId: 1,
      },
      params: {
        id: '1',
      },
    };
    const res = { locals: {} };
    const next = jest.fn();

    await databaseController.updateRecipe(req, res, next);
    const dbEntry = await pool.query(`SELECT * FROM recipes
    WHERE id = 1`);

    expect(dbEntry.rows).toBeInstanceOf(Array);
    expect(dbEntry.rows.length).toEqual(1);
    expect(dbEntry.rows[0]).toEqual({
      id: 1,
      url: 'mockUrl',
      title: 'mockTitle',
      description: 'updatedDescription',
      ingredientlist: ['updatedIngredient1', 'mockIngredient2'],
      directions: ['updatedDirection1', 'mockDirection2'],
      tastyid: 1,
      imagepath: 'mockImagePath',
      userid: null,
    });
    expect(res.locals).toEqual({
      id: 1,
      url: 'mockUrl',
      title: 'mockTitle',
      description: 'updatedDescription',
      directions: ['updatedDirection1', 'mockDirection2'],
      ingredientList: ['updatedIngredient1', 'mockIngredient2'],
      tastyId: 1,
      imagePath: 'mockImagePath',
      userId: null,
    });
  });

  it('databaseController.deleteRecipe should delete the recipe from database', async () => {
    const req = {
      params: {
        id: '1',
      },
    };
    const res = { locals: {} };
    const next = jest.fn();

    await databaseController.deleteRecipe(req, res, next);
    const dbEntry = await pool.query(`SELECT * FROM recipes`);

    expect(dbEntry.rows).toBeInstanceOf(Array);
    expect(dbEntry.rows.length).toEqual(1);
    expect(dbEntry.rows[0]).toEqual({
      id: 2,
      url: 'mockUrl2',
      title: 'mockTitle2',
      description: 'mockDescription2',
      directions: ['mockDirection1', 'mockDirection2'],
      ingredientlist: ['mockIngredient1', 'mockIngredient2'],
      tastyid: 1,
      imagepath: 'mockImagePath2',
      userid: null,
    });
  });
});
