const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs/promises');
const path = require('path');

const configuration = new Configuration({
  apiKey: process.env.DALLE_KEY,
});

const openai = new OpenAIApi(configuration);

const convertStrToFileName = (str) =>
  `${str.toLowerCase().replace(/\s/gi, '-')}.jpg`;

const dalleImageController = {};

dalleImageController.generateImage = async (req, res, next) => {
  const { imagePath } = req.body;
  if (!imagePath) {
    try {
      const { title } = req.body;
      const response = await openai.createImage({
        prompt: title,
        n: 1,
        size: '256x256',
      });

      const imageUrl = response.data.data[0].url;
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const imageFileName = convertStrToFileName(title);

      await fs.writeFile(
        path.join(__dirname, '../../public/images/', imageFileName),
        buffer
      );

      res.locals.imageFileName = imageFileName;

      return next();
    } catch (error) {
      return next({
        log: `Error encountered in dalleImageController.generateImage, ${error}`,
        message: 'Error encountered when generating image via the DallE AI.',
      });
    }
  } else {
    return next();
  }
};

module.exports = dalleImageController;
