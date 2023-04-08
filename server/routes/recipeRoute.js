const router = require('express').Router();
const scrapingController = require('../controller/scrapingController');

router.get('/scrapeurl', scrapingController, (req, res, next) => {
  res.status(200).json(res.locals);
});

module.exports = router;
