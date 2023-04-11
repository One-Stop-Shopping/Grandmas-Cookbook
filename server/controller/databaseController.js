/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
const fs = require('fs/promises');
const path = require('path');
const db = require('../models/databaseModels');

const databaseController = {};

const camelCaseTheKey = (databaseRowsArray) => {
  const camelCaseArray = databaseRowsArray.map((dbObj) => {
    const ccObj = {};
    Object.assign(
      ccObj,
      dbObj,
      { ingredientList: dbObj.ingredientlist },
      { tastyId: dbObj.tastyid },
      { imagePath: dbObj.imagepath },
      { userId: dbObj.userid }
    );
    delete ccObj.ingredientlist;
    delete ccObj.tastyid;
    delete ccObj.imagepath;
    delete ccObj.userid;
    return ccObj;
  });

  return camelCaseArray;
};

databaseController.getAllRecipes = (req, res, next) => {
  const allRecipeQuery = `SELECT * FROM recipes`;
  db.query(allRecipeQuery)
    .then((data) => {
      res.locals = camelCaseTheKey(data.rows);
      return next();
    })
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.getAllRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

databaseController.addRecipe = (req, res, next) => {
  const {
    url,
    title,
    description,
    ingredientList,
    directions,
    tastyId,
    imagePath,
  } = req.body;

  const addRecipeQuery = `INSERT INTO recipes (url, title, description, ingredientList, directions, tastyId, imagePath) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [
    url,
    title,
    description,
    JSON.stringify(ingredientList),
    JSON.stringify(directions),
    tastyId,
    res.locals.imageFileName || imagePath,
  ];

  db.query(addRecipeQuery, values)
    .then((data) => {
      res.locals = camelCaseTheKey(data.rows)[0];
      return next();
    })
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.addRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

databaseController.updateRecipe = (req, res, next) => {
  const { url, title, description, ingredientList, directions, tastyId } =
    req.body;
  const { id } = req.params;

  const updateRecipeQuery = `
    UPDATE recipes
    SET url = $1, title = $2, description = $3, ingredientList = $4, 
    directions = $5, tastyId = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [
    url,
    title,
    description,
    JSON.stringify(ingredientList),
    JSON.stringify(directions),
    tastyId,
    parseInt(id),
  ];

  db.query(updateRecipeQuery, values)
    .then((data) => {
      res.locals = camelCaseTheKey(data.rows)[0];
      return next();
    })
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.updateRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

databaseController.updateImage = (req, res, next) => {
  const { id } = req.params;

  const updateImageQuery = `
  UPDATE recipes
  SET imagePath = $2
  WHERE id = $1
  RETURNING id, imagePath, (
    SELECT imagePath FROM recipes WHERE id = $1
  ) as oldImagePath;
  `;
  const values = [parseInt(id), res.locals.imageFileName];

  db.query(updateImageQuery, values)
    .then((data) => {
      res.locals = camelCaseTheKey(data.rows)[0];
      if (
        res.locals.oldimagepath &&
        res.locals.imagePath !== res.locals.oldimagepath
      ) {
        return fs.unlink(
          path.join(__dirname, '../../public/images/', res.locals.oldimagepath)
        );
      }
      return null;
    })
    .then(() => next())
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.updateRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

databaseController.deleteRecipe = (req, res, next) => {
  const { id } = req.params;

  const deleteRecipeQuery = `
    DELETE FROM recipes
    WHERE id = $1
    RETURNING (
      SELECT imagePath FROM recipes WHERE id = $1
    ) as imagePath;
  `;
  const values = [parseInt(id)];

  db.query(deleteRecipeQuery, values)
    .then((data) => {
      const imagePath = data.rows[0].imagepath;
      if (imagePath) {
        return fs.unlink(
          path.join(__dirname, '../../public/images/', imagePath)
        );
      }
      return null;
    })
    .then(() => next())
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.deleteRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

module.exports = databaseController;
