const router = require('express').Router();
const tastyController = require('../controller/tastyAPI/tastyApiController');

router.get('/search/:searchTerm', tastyController.tastyAutoCompleteQuery, (req, res, next) => {
    res.status(200).send(res.locals.queryData);
  });

//   http://localhost:3000/tasty/tagQuery/?from=0&size=50&tags=[]&q=${keywords}'

router.get('/tagQuery/:start/:size/:tags/:q', tastyController.tastyList, (req, res, next) => {
    res.status(200).send(res.locals.tastyList);
});

router.get('/findSimilarRecipe/:id', tastyController.tastyFindSimilarRecipeByID, (req, res, next) => {
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