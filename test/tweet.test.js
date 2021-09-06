const expect = require('chai').expect;
const path = require('path');
const { createCanvas, registerFont } = require('canvas');
const { getFitLines } = require('../src/tweet');

describe('Tweet test', () => {
  it('Should return lines that fit in canvas', () => {
    const width = 1080;
    const height = 1440;
    const horizontalMargin = 60;
    const maxTextWidth = width - horizontalMargin;
    const fontSize = 80;
    registerFont(path.join(__dirname, '../src/fonts/CormorantGaramond-Bold.ttf'), {family: 'Glory'});
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px 'Glory'`;
    ctx.textAlign = 'center';
    const tweet = 'Show me all the things that I shouldn\'t know\nAnd there\'s a blue moon on the rise';
    const linesMock = [
      'Show me all the things that I',
      'shouldn\'t know',
      'And there\'s a blue moon on the',
      'rise',
    ];

    const lines = getFitLines(tweet, ctx, maxTextWidth);

    expect(lines).to.eql(linesMock);
  });
});