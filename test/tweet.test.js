const expect = require('chai').expect;
const path = require('path');
const { createCanvas, registerFont } = require('canvas');
const { getFitLines, getImageDataUrl, postTweet } = require('../src/tweet');

describe('Tweet test', () => {
  const width = 1080;
  const height = 1440;
  const horizontalMargin = 60;
  const maxTextWidth = width - horizontalMargin;
  const fontSize = 80;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px 'Glory'`;
  ctx.textAlign = 'center';

  before(() => {
    registerFont(path.join(__dirname, '../src/fonts/CormorantGaramond-Bold.ttf'), {family: 'Glory'});
  });

  it('Should return lines that fit in canvas', () => {
    const oneShortLineText = 'Thanks for asking';
    const oneLargeLineText = 'I\'ve been looking for my own protection to save';
    const twoShortLinesText = 'But everything looks better\nWhen the sun goes down';
    const twoLargeLinesText = 'Show me all the things that I shouldn\'t know\nAnd there\'s a blue moon on the rise';
    
    const oneShortLineMock = [
      'Thanks for asking',
    ];
    const oneLargeLineMock = [
      'I\'ve been looking for my own',
      'protection to save',
    ];
    const twoShortLinesMock = [
      'But everything looks better',
      'When the sun goes down',
    ];
    const twoLargeLinesMock = [
      'Show me all the things that I',
      'shouldn\'t know',
      'And there\'s a blue moon on the',
      'rise',
    ];

    const oneShortLineFit = getFitLines(oneShortLineText, ctx, maxTextWidth);
    const oneLargeLineFit = getFitLines(oneLargeLineText, ctx, maxTextWidth);
    const twoShortLinesFit = getFitLines(twoShortLinesText, ctx, maxTextWidth);
    const twoLargeLinesFit = getFitLines(twoLargeLinesText, ctx, maxTextWidth);

    expect(oneShortLineFit).to.be.eql(oneShortLineMock);
    expect(oneLargeLineFit).to.be.eql(oneLargeLineMock);
    expect(twoShortLinesFit).to.be.eql(twoShortLinesMock);
    expect(twoLargeLinesFit).to.be.eql(twoLargeLinesMock);
  });

  it('Should post the tweet', async () => {
    const data = {
      name: 'tpr',
      tweets: [
        'Somebody mixed my medicine',
        'Well, you hurt where you sleep and you sleep where you lie',
        'And now you\'re in deep and now you\'re gonna cry',
        'You start to sweat so hold me tight',
      ],
      images: [
        'taylor1',
        'taylor2',
      ]
    };
    
    const response = await postTweet(data, null);

    expect(response).to.be.a('string');
  });

  it('Should return the url of generated image', async () => {
    const data = {
      name: 'tpr',
      tweets: [
        'Somebody mixed my medicine',
        'Well, you hurt where you sleep and you sleep where you lie',
        'And now you\'re in deep and now you\'re gonna cry',
        'You start to sweat so hold me tight',
      ],
      images: [
        'taylor1',
        'taylor2',
      ]
    };

    const url = await getImageDataUrl(data);

    expect(url).to.satisfy(image => image.startsWith('data:image/jpeg;base64,'));
  });
});