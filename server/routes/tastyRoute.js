const router = require('express').Router();
const tastyController = require('../controller/tastyAPI/tastyApiController');

router.get('/search', tastyController.tastyAutoCompleteQuery, (req, res, next) => {
    res.status(200).send(res.locals.queryData);
  });

router.get('/tagQuery', tastyController.tastyList, (req, res, next) => {
    res.status(200).send(res.locals.tastyList);
});

router.get('/findSimilarRecipe', tastyController.tastyFindSimilarRecipeByID, (req, res, next) => {
    res.status(200).send(res.locals.similarRecipe);
});

router.get('/getMoreInfo', tastyController.tastyGetMoreInfo, (req, res, next) => {
    res.status(200).send(res.locals.recipeData);
});

router.get('/getTipsForID', tastyController.tastyGetTipsForID, (req, res, next) => {
    res.status(200).send(res.locals.tips);
});

router.get('/tags', tastyController.tastyGetTags, (req, res, next) => {
    res.status(200).send(res.locals.tags);
});

router.get('/feed', tastyController.tastyGetFeed, (req, res, next) => {
    res.status(200).send(res.locals.feed);
});

module.exports = router;