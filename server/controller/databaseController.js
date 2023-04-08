const db = require('../models/databaseModels');

const databaseController = {};

databaseController.getAllRecipe = (req, res, next) => {
  const allRecipeQuery = `SELECT * FROM recipe`;
  db.query(allRecipeQuery)
    .then((data) => {
      res.locals.recipes = data.rows;
      return next();
    })
    .catch((error) =>
      next({
        log: `Error encountered in databaseController.getAllRecipe, ${error}`,
        message: 'Error encountered when querying the database.',
      })
    );
};

module.exports = databaseController;
