const cheerio = require('cheerio');
const fetch = require('node-fetch');

// Fetch from www.epicurious.com
const basicMuffins =
  'https://www.epicurious.com/recipes/food/views/basic-muffins-40037';
const coconutMuffins =
  'https://www.epicurious.com/recipes/food/views/gluten-free-orange-almond-coconut-muffins-56389508';

// fetch(basicMuffins)
//   .then((res) => res.text())
//   .then((html) => {
//     const $ = cheerio.load(html);
//     const title = $('h1[data-testid="ContentHeaderHed"]').text();
//     const ingredientList = $('div[data-testid="IngredientList"]').children(
//       'div'
//     );
//     const directions = $('div[data-testid="InstructionsWrapper"] p');

//     console.log(`${title} \n`);

//     ingredientList.children().each((i, el) => {
//       console.log($(el).text().trim());
//     });
//     console.log('\n');

//     directions.each((i, el) => {
//       console.log($(el).text().trim());
//     });
//   });

// Fetch from www.foodnetwork.com
const shrimpScampi =
  'https://www.foodnetwork.com/recipes/ree-drummond/shrimp-scampi-2580746';
const potatoNest =
  'https://www.foodnetwork.com/recipes/food-network-kitchen/potato-nests-with-peas-ham-and-cream-cheese-3558333';

fetch(shrimpScampi)
  .then((res) => res.text())
  .then((html) => {
    const $ = cheerio.load(html);
    const title = $('.o-AssetTitle__a-HeadlineText').first().text();
    const ingredientList = $('.o-Ingredients__a-Ingredient--CheckboxLabel');
    const directions = $('.o-Method__m-Step');

    console.log(`${title} \n`);

    ingredientList.each((i, el) => {
      if (i) {
        console.log($(el).text().trim());
      }
    });
    console.log('\n');

    directions.each((i, el) => {
      console.log($(el).text().trim());
    });
  });
