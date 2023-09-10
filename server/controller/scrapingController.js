const cheerio = require('cheerio');
const fetch = require('node-fetch');

// Fetch from www.epicurious.com
const scrapeEpicurious = (req, res, next) =>
  fetch(res.locals.url)
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const title = $('h1[data-testid="ContentHeaderHed"]').text();
      const ingredientListNodes = $(
        'div[data-testid="IngredientList"]'
      ).children('div');
      const directionNodes = $('div[data-testid="InstructionsWrapper"] p');

      const ingredientList = [];
      const directions = [];

      ingredientListNodes.children().each((i, el) => {
        ingredientList.push($(el).text().trim());
      });

      directionNodes.each((i, el) => {
        directions.push($(el).text().trim());
      });

      res.locals.title = title;
      res.locals.ingredientList = ingredientList;
      res.locals.directions = directions;

      next();
    })
    .catch((err) =>
      next({
        log: `Error encountered in scrapingController/scrapeEpicurious function. ${err}`,
        message: 'Cannot connect to the provided URL. Please verify the URL.',
      })
    );

// Fetch from www.foodnetwork.com
const scrapeFoodnetwork = (req, res, next) =>
  fetch(res.locals.url)
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const title = $('.o-AssetTitle__a-HeadlineText').first().text();
      const ingredientListNodes = $(
        '.o-Ingredients__a-Ingredient--CheckboxLabel'
      );
      const directionsNodes = $('.o-Method__m-Step');

      const ingredientList = [];
      const directions = [];

      ingredientListNodes.each((i, el) => {
        if (i) {
          ingredientList.push($(el).text().trim());
        }
      });

      directionsNodes.each((i, el) => {
        directions.push($(el).text().trim());
      });

      res.locals.title = title;
      res.locals.ingredientList = ingredientList;
      res.locals.directions = directions;

      next();
    })
    .catch((err) =>
      next({
        log: `Error encountered in scrapingController/scrapeFoodnetwork function. ${err}`,
        message: 'Cannot connect to the provided URL. Please verify the URL.',
      })
    );

module.exports = async (req, res, next) => {
  const { url } = req.query;

  res.locals.url = url;

  if (url.includes('epicurious')) {
    await scrapeEpicurious(req, res, next);
  } else if (url.includes('foodnetwork')) {
    await scrapeFoodnetwork(req, res, next);
  } else {
    next({
      log: 'Error encountered in scrapingController. Requested URL is not supported by this app.',
      status: 406,
      message: 'Requested URL is not supported by this app.',
    });
  }
};
