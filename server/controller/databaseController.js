/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
const db = require('../models/databaseModels');
const { deleteFileFromS3 } = require('../utils/awsS3Connection');

const databaseController = {};

/*
  Helper function to covert all keys to camel case, for consistant and easy access on Frontend.
*/
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

/*
  Middleware to get all recipes from database.
*/
databaseController.getAllRecipes = (req, res, next) => {
  const allRecipeQuery = `SELECT * FROM recipes`;
  return db
    .query(allRecipeQuery)
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

/*
  Middleware to add a new recipe to database.
*/
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
  // To also cover Tasty API entries where description can be long.
  const values = [
    url,
    title,
    !description || description.slice(0, 250),
    JSON.stringify(ingredientList),
    JSON.stringify(directions),
    tastyId,
    res.locals.awsimagePath || imagePath,
  ];

  return db
    .query(addRecipeQuery, values)
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

/*
  Middleware to update an existing recipe in database.
*/
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

  return db
    .query(updateRecipeQuery, values)
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

/*
  Middleware to update image of an existing recipe in database.
*/
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
  const values = [parseInt(id), res.locals.awsimagePath];

  return db
    .query(updateImageQuery, values)
    .then((data) => {
      res.locals = camelCaseTheKey(data.rows)[0];
      const oldImagePath = res.locals.oldimagepath;
      if (
        oldImagePath &&
        oldImagePath.includes(
          'https://grandmas-cookbook-scratch-project.s3.amazonaws.com/images'
        ) &&
        res.locals.imagePath !== oldImagePath
      ) {
        return deleteFileFromS3(oldImagePath);

        // Delete the image file on local disk. Not used.
        /*
        return fs.unlink(
          path.join(__dirname, '../../public/images/', res.locals.oldimagepath)
        );
        */
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

/*
  Middleware to delete an existing recipe from database.
*/
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

  return db
    .query(deleteRecipeQuery, values)
    .then((data) => {
      const imagePath = data.rows[0].imagepath;
      if (
        imagePath &&
        imagePath.includes(
          'https://grandmas-cookbook-scratch-project.s3.amazonaws.com/images'
        )
      ) {
        return deleteFileFromS3(imagePath);

        // Delete the image file on local disk. Not used.
        /*
        return fs.unlink(
          path.join(__dirname, '../../public/images/', imagePath)
        );
        */
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

/*
  Middleware to get recipe for a specific user from database.
*/
databaseController.getUserRecipe = (req, res, next) => {
  const { id } = req.params;

  const queryString = `
  SELECT recipes.url, recipes.title, recipes.ingredientlist, recipes.directions, recipes.tastyid, recipes.imagepath
  FROM recipes
  JOIN users
  ON recipes.userid = users.id
  WHERE users.id = $1;
  `;
  const values = [parseInt(id)];
  return db
    .query(queryString, values)
    .then((data) => {
      res.locals = camelCaseTheKey(data.rows);
      return next();
    })
    .then(() => next())
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.getUserRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

module.exports = databaseController;
