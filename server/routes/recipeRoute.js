const router = require('express').Router();
const scrapingController = require('../controller/scrapingController');
const databaseController = require('../controller/databaseController');

// Scrape info for a specific URL provided
router.get('/scrapeurl', scrapingController, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Get all recipes stored in the database
router.get('/all', databaseController.getAllRecipes, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Add a new recipe to the database
router.post('/add', databaseController.addRecipe, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Update a recipe with a specific id in the database
router.put('/update/:id', databaseController.updateRecipe, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Delete the recipe with a specific id in the database
router.delete(
  '/delete/:id',
  databaseController.deleteRecipe,
  (req, res, next) => {
    res.status(200).json('The recipe has been successfully deleted.');
  }
);

module.exports = router;
