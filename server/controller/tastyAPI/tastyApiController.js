const fetch = require('node-fetch')
const tastyTypes = require('./tastyQueryTypes')

const url = 'https://tasty.p.rapidapi.com/';

const tastyApiController = {};

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8403d18d56msh5d278e6cc8c7ebfp19889cjsne960dfd44ed5',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
}

tastyApiController.tastyAutoCompleteQuery = (req, res, next) => {
    const query = req.body.query;
    const type = tastyTypes.recipes.AUTO_COMPLETE;

    fetch(`${url}recipes/${type}?prefix=${query}`, options)
        .then(result => result.json())
        .then(dataJson => {
            const resultArray = dataJson.results;
            const searchVals = [];
            resultArray.forEach((el) => {
                searchVals.push(el.search_value);
            })
            res.locals.queryData = searchVals;
            next();
        })
        .catch((err) => {
            next({
                log: `Error encountered in tastyApiController/tastyAutoCompleteQuery function. ${err}`,
                message: 'Could not query the data',
            })
        });  
}

tastyApiController.tastyList = (req, res, next) => {
    const start = req.body.start;
    const size = req.body.size;
    const tags = req.body.tags;
    const q = req.body.q;
    const type = tastyTypes.recipes.LIST;

    for (let i = 0; i < tags.length; i++) {
        if (i === 0) continue;
        else {
            tags[i] = `%20${tags[i]}`
        }
    }

    tags.join(',');

    for (let i = 0; i < q.length; i++) {
        if (i === 0) continue;
        else {
            q[i] = `%20${q[i]}`
        }
    }

    q.join(',');

    fetch(`${url}recipes/${type}?from=${start}&size=${size}${tags.length > 0 ? `&tags=${tags}`: ''}${q.length > 0 ? `&q=${q}`: ''}`, options)
        .then(result => result.json())
        .then(json => {
            const resultArray = json.results;
            let dishes = [];
            for (let i = 0; i < resultArray.length; i++) {
                if (resultArray[i] === undefined || resultArray[i] === null) continue;
                let el = resultArray[i];
                const preparations = [];
                const recipeTags = [];
                const ingredients = [];

                if (el.instructions !== undefined && el.instructions !== null) {
                    for (let j = 0; j < el.instructions.length; j++) {
                        const instruction = el.instructions[j];
                        if (instruction === undefined || instruction === null) continue;
                        preparations.push(instruction.display_text);
                    }
                }

                if (el.tags !== undefined && el.tags !== null) {
                    for (let a = 0; a < el.tags.length; a++) {
                        const tag = el.tags[a];
                        if (tag === undefined || tag === 0 || tag === null) continue;
                        recipeTags.push(tag.name);
                    }
                }

                if (el.sections !== undefined && el.sections !== null) {
                    if (el.sections[0] !== undefined && el.sections[0] !== null) {
                        for (let b = 0; b < el.sections[0].components.length; b++) {
                            const ingredient = el.sections[0].components[b];
                            if (ingredient === undefined || ingredient === null) continue;
                            ingredients.push(ingredient.raw_text);
                        }
                    }
                }

                dishes.push({
                    tasty_id: el.id,
                    title: el.name,
                    description: `${(el.total_time_tier !== undefined) ? el.total_time_tier : ''} - ${el.description}`,
                    directions: preparations,
                    ingredients,
                    tags: recipeTags,
                    imageUrl: el.thumbnail_url
                })                
            }
            dishes = dishes.filter(el => 
                el.directions.length !== 0 && el.ingredients.length !== 0
            );
            res.locals.tastyList = dishes;
            next();
        })
        .catch((err) => {
            next({
                log: `Error encountered in tastyApiController/tastyList function. ${err}`,
                message: 'Could not query the data',
            })
        });  
}

// tastyList({body:{start: 0, size: 20, tags: ['under_30_minutes'], q:['pasta']}});

tastyApiController.tastyGetTags = (req, res, next) => {
    const type = tastyTypes.tags.LIST;

    fetch(`${url}tags/${type}`, options)
	.then(result => result.json())
    .then(json => {
        const tastyTags = json.results;
        const tags = [];

        tastyTags.forEach((tag) => (
            tags.push(tag.name)
        ))

        res.locals.tags = tags;
        next();
    })
    .catch((err) => {
        next({
            log: `Error encountered in tastyApiController/tastyGetTags function. ${err}`,
            message: 'Could not query the data',
        })
    });   
}

// tastyGetTags();

// TODO: implement finding similar recipe as an extension

tastyApiController.tastyFindSimilarRecipeByID = (req, res, next) => {
    const id = req.body.id;
    const type = tastyTypes.recipes.LIST_SIMILARITIES;

    fetch(`${url}recipes/${type}?recipe_id=${id}`, options)
        .then(result => result.json())
        .then(json => {
            res.locals.similarRecipe = json;
            next();
        })
        .catch((err) => {
            next({
                log: `Error encountered in tastyApiController/tastyFindSimilarRecipeByID function. ${err}`,
                message: 'Could not query the data',
            })
        });
}

// tastyFindSimilarRecipeByID({body:{id: 8138}});

// TODO: POSSIBLY REMOVE AS THIS ENDPOINT IS REDUNDANT

tastyApiController.tastyGetMoreInfo = (req, res, next) => {
    const id = req.body.id;
    const type = tastyTypes.recipes.GET_MORE_INFO;

    fetch(`${url}recipes/${type}?id=${id}`, options)
        .then(result => result.json())
        .then(json => {
            res.locals.recipeData = json;
            next();
        })
        .catch((err) => {
            next({
                log: `Error encountered in tastyApiController/tastyGetMoreInfo function. ${err}`,
                message: 'Could not query the data',
            })
        });   
}

// tastyGetMoreInfo({body:{id: 8138}});

// TODO: implement parsing of tips/reviews as an extension

tastyApiController.tastyGetTipsForID = (req, res, next) => {
    const start = req.body.start;
    const size = req.body.size;
    const id = req.body.id;
    const type = tastyTypes.tips.TIPS;

    fetch(`${url}${type}/list?id=${id}&from=${start}&size=${size}`, options)
        .then(result => result.json())
        .then(json => {    
            res.locals.tips = json;
            next();
        })
        .catch((err) => {
            next({
                log: `Error encountered in tastyApiController/tastyGetTipsForID function. ${err}`,
                message: 'Could not query the data',
            })
        });   
}

// tastyGetTipsForID({body:{id: 8138}});

// TODO: implement parsing of feed as an extension

tastyApiController.tastyGetFeed = (req, res, next) => {
    const type = tastyTypes.feeds.LIST;
    const start = req.body.start;
    const size = req.body.size;
    const timezone = '%2B0700';
    const isVegetarian = req.body.isVegetarian;


    fetch(`${url}feeds/${type}?size=${size}&timezone=${timezone}&vegetarian${isVegetarian}&from=${start}`, options)
	.then(result => result.json())
    .then(json => {
        res.locals.feed = json;
        next();
    })
    .catch((err) => {
        next({
            log: `Error encountered in tastyApiController/tastyGetFeed function. ${err}`,
            message: 'Could not query the data',
        })
    });   
}

// tastyGetFeed({body:{start: 0, size: 20, isVegetarian: false}});

module.exports = tastyApiController;