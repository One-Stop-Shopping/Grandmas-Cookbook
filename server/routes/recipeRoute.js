const router = require('express').Router();
const scrapingController = require('../controller/scrapingController');
const databaseController = require('../controller/databaseController');

router.get('/scrapeurl', scrapingController, (req, res, next) => {
  res.status(200).json(res.locals);
});

router.get('/all', databaseController.getAllRecipe, (req, res, next) => {
  res.status(200).json(res.locals);
});

module.exports = router;
