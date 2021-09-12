const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

const FONT_NAME = 'Glory';
registerFont(path.join(__dirname, '../fonts/CormorantGaramond-Bold.ttf'), {family: FONT_NAME});
const BACKGROUND_COLOR = '#000000';
const FONT_COLOR = '#ffffff';
const TEXT_ALIGN = 'center';
const TEXT_BASELINE = 'middle';
const SHADOW_COLOR = 'black';
const SHADOW_BLUR = 6;
const SHADOW_OFFSETX = 4;
const SHADOW_OFFSETY = 4;
const FONT_SIZE = 80;
const LINE_HEIGHT = FONT_SIZE + 10;
const HORIZONTAL_MARGIN = 60;
const IMAGE_MIME_TYPE = 'image/jpeg';

const initTime = Date.now(); console.log('init:', 0);

const getRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

const getFitLines = (text, ctx, maxTextWidth) => {
  const lines = text.split('\n');
  const fitLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const words = line.split(' ');
    let fitLine = words[0];
    for (let j = 1; j < words.length; j++) {
      const word = words[j];
      if(ctx.measureText(fitLine + ' ' + word).width <= maxTextWidth) {
        fitLine += ' ' + word;
      } else {
        fitLines.push(fitLine);
        fitLine = word;
      }
      if(j + 1 === words.length) {
        fitLines.push(fitLine);
      }
    }
  }

  return fitLines;
}

const getImageDataUrl = async data => {
  const tweet = getRandomValue(data.tweets); console.log('getRandomTweet:', Date.now() - initTime);

  const imageName = getRandomValue(data.images);
  const image = await loadImage(path.join(__dirname, '../img', data.name, `${imageName}.jpg`));
  const maxTextWidth = image.width - HORIZONTAL_MARGIN;

  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  // ctx.drawImage(image, 0, 0, imageWidth, imageHeight * image.height / image.width);
  ctx.drawImage(image, 0, 0, image.width, image.height);

  ctx.font = `${FONT_SIZE}px '${FONT_NAME}'`;
  ctx.fillStyle = FONT_COLOR;
  ctx.textAlign = TEXT_ALIGN;
  ctx.textBaseline = TEXT_BASELINE;

  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowBlur = SHADOW_BLUR;
  ctx.shadowOffsetX = SHADOW_OFFSETX;
  ctx.shadowOffsetY = SHADOW_OFFSETY;

  const lines = getFitLines(tweet, ctx, maxTextWidth); console.log('getFitLines:', Date.now() - initTime);
  console.log('fit lines:', lines);
  let positionY = canvas.height / 2 - (lines.length - 1) * LINE_HEIGHT / 2;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.fillText(line, canvas.width / 2, positionY);
    positionY += LINE_HEIGHT;
  } console.log('fill texts:', Date.now() - initTime);

  const url = canvas.toDataURL(IMAGE_MIME_TYPE); console.log('toDataUrl:', Date.now() - initTime);

  return url;
};

const getB64Image = url => {
  const b64image = url.replace(`data:${IMAGE_MIME_TYPE};base64,`, '');console.log('replace b64:', Date.now() - initTime);
  return b64image;
};

const postTweet = async (data, Twit) => {
  const url = await getImageDataUrl(data);

  // const b64image = getB64Image(url);
  // const imageResult = await Twit.post('media/upload', { media_data: b64image });console.log('media/upload:', Date.now() - initTime);
  // const mediaId = imageResult.data.media_id_string;
  // const meta = {
  //   media_id: mediaId,
  //   alt_text: { text: tweet },
  // };
  // await Twit.post('media/metadata/create', meta);console.log('media/metadata/create:', Date.now() - initTime);
  // const tweetResult = await Twit.post('statuses/update', { media_ids: [mediaId] });console.log('statuses/update:', Date.now() - initTime);
  
  // res.status(200).send(`Post ok: ${tweetResult.data.text}`);
  // const response = `Post ok: ${tweetResult.data.text}`;

  // res.status(200).send(`<html><head></head><body style="margin: 0"><img src="${url}" /></body></html>`);
  const response = `<html><head></head><body style="margin: 0"><img src="${url}" /></body></html>`;
  
  return response;
};

module.exports = {
  postTweet,
  getImageDataUrl,
  getFitLines,
  getRandomValue,
  getB64Image,
}