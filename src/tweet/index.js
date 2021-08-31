const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

registerFont(path.join(__dirname, '../fonts/CormorantGaramond-Bold.ttf'), {family: 'Glory'});
const fontSize = 80;
const lineHeight = fontSize + 10;
const horizontalMargin = 60;

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

module.exports = async (data, name, Twit, res) => {
  try {
    const initTime = Date.now(); console.log('init:', 0);
    const key = getRandomValue(Object.keys(data));console.log('getRandomKey:', Date.now() - initTime);
    const tweet = getRandomValue(data[key].tweets);console.log('getRandomTweet:', Date.now() - initTime);
    
    const imageName = getRandomValue(data[key].images);
    const image = await loadImage(path.join(__dirname, '../img', name, key, `${imageName}.jpg`));
    const maxTextWidth = image.width - horizontalMargin;
    
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // ctx.drawImage(image, 0, 0, imageWidth, imageHeight * image.height / image.width);
    ctx.drawImage(image, 0, 0, image.width, image.height);

    ctx.font = `${fontSize}px 'Glory'`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = 'black';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    const lines = getFitLines(tweet, ctx, maxTextWidth);console.log('getFitLines:', Date.now() - initTime);
    console.log('fit lines:', lines);
    let positionY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ctx.fillText(line, canvas.width / 2, positionY);
      positionY += lineHeight;
    }console.log('fill texts:', Date.now() - initTime);

    positionY = 200;

    const url = canvas.toDataURL('image/jpeg');console.log('toDataUrl:', Date.now() - initTime);

    // const b64image = url.replace('data:image/jpeg;base64,', '');console.log('replace b64:', Date.now() - initTime);

    // const imageResult = await Twit.post('media/upload', { media_data: b64image });console.log('media/upload:', Date.now() - initTime);
    // const mediaId = imageResult.data.media_id_string;
    // const meta = {
    //   media_id: mediaId,
    //   alt_text: { text: tweet },
    // };
    // await Twit.post('media/metadata/create', meta);console.log('media/metadata/create:', Date.now() - initTime);
    // const tweetResult = await Twit.post('statuses/update', { media_ids: [mediaId] });console.log('statuses/update:', Date.now() - initTime);
    
    // res.status(200).send(`Post ok: ${tweetResult.data.text}`);

    res.status(200).send(`<html><head></head><body style="margin: 0"><img src="${url}" /></body></html>`);
  } catch(error) {
    res.status(500).send(`Error: ${error.message} (${error.code})`);
  }
};
