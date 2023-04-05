const cheerio = require('cheerio');
const fetch = require('node-fetch');

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
    ingredientList.children().each((i, el) => {
      console.log($(el).text());
    });
  });
