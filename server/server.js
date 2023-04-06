const cheerio = require('cheerio');
const fetch = require('node-fetch');

// Fetch from www.epicurious.com
const basicMuffins =
  'https://www.epicurious.com/recipes/food/views/basic-muffins-40037';
const coconutMuffins =
  'https://www.epicurious.com/recipes/food/views/gluten-free-orange-almond-coconut-muffins-56389508';

fetch(coconutMuffins)
  .then((res) => res.text())
  .then((html) => {
    const $ = cheerio.load(html);
    const ingredientList = $('div[data-testid="IngredientList"]').children(
      'div'
    );
    console.log('Coconut Muffins \n');
    ingredientList.children().each((i, el) => {
      console.log($(el).text());
    });
    console.log('\n');
  });

// Fetch from www.foodnetwork.com
const shrimpScampi =
  'https://www.foodnetwork.com/recipes/ree-drummond/shrimp-scampi-2580746';

fetch(shrimpScampi)
  .then((res) => res.text())
  .then((html) => {
    const $ = cheerio.load(html);
    const ingredientList = $('.o-Ingredients__a-Ingredient--CheckboxLabel');
    console.log('Shrimp Scampi \n');
    ingredientList.each((i, el) => {
      if (i) {
        console.log($(el).text());
      }
    });
    console.log('\n');
  });

/*
 * To-Do: get the recipe name
 */
