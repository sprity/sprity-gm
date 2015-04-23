'use strict';

var fs = require('fs');
var should = require('chai').should();

require('mocha');

var gmProc = require('../index');

var tiles = [{
  height: 128,
  width: 128,
  x: 0,
  y: 0,
  type: 'png',
  offset: 4,
  contents: fs.readFileSync('test/fixtures/png.png'),
  path: 'test/fixtures/png.png'
}, {
  height: 128,
  width: 128,
  x: 0,
  y: 136,
  type: 'png',
  offset: 4,
  contents: fs.readFileSync('test/fixtures/png.png'),
  path: 'test/fixtures/png.png'
}];

var log = {
  log: console.log,
  warn: console.warn,
  debug: console.log,
  error: console.error,
  success: console.log
};

describe('sprity-gm', function () {
  it('should return a png image buffer', function (done) {
    gmProc.create(tiles, {
      width: 136,
      height: 268,
      bgColor: [0, 0, 0, 0],
      type: 'png',
      log: log,
      options: {}
    }).then(function (image) {
      image.should.have.property('width', 132);
      image.should.have.property('height', 268);
      image.should.have.property('contents');
      image.contents.toString().should.equal(fs.readFileSync('test/expected/image.png').toString());
      done();
    });
  });

  it('should return a jpg image', function (done) {
    gmProc.create(tiles, {
      width: 136,
      height: 268,
      bgColor: [255, 255, 255, 100],
      type: 'jpg',
      log: log,
      options: {}
    }).then(function (image) {
      image.should.have.property('width', 132);
      image.should.have.property('height', 268);
      image.should.have.property('contents');
      image.contents.toString().should.equal(fs.readFileSync('test/expected/image.jpg').toString());
      done();
    });
  });

  it('should return a resized png image', function (done) {
    gmProc.scale({
      contents: fs.readFileSync('test/expected/image.png'),
      width: 136,
      height: 268
    }, {
      scale: 0.5,
      width: 136 / 2,
      height: 264 / 2,
      type: 'png',
      log: log,
      options: {}
    }).then(function (image) {
      image.should.have.property('width', 65);
      image.should.have.property('height', 132);
      image.should.have.property('contents');
      image.contents.toString().should.equal(fs.readFileSync('test/expected/image-scaled.png').toString());
      done();
    });
  });

});
