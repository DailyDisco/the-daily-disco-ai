// eslint-disable-next-line import/no-import-module-exports
import bufferToDataUrl from 'buffer-to-data-url';

const { PNG } = require('pngjs');
const dataUriToBuffer = require('./data-uri-to-buffer');

// Take a PNG image as a data URL, add a white background, and return a new PNG as a data URL.

// This is a hack, and it's synchronous. Not so good.
// Ideally this should be done client-side when first
// generating the PNG
module.exports = function addBackgroundToPNG(dataUrl) {
  const options = {
    colorType: 2,
    bgColor: {
      red: 255,
      green: 255,
      blue: 255,
    },
  };

  const png = PNG.sync.read(dataUriToBuffer(dataUrl));
  const buffer = PNG.sync.write(png, options);

  // save to a file on disk for testing
  // const fs = require("fs");
  // const path = require("path");
  // const filename = dataUrl.substring(dataUrl.length - 10) + ".png";
  // fs.writeFileSync(path.join(__dirname, filename), buffer);
  // console.log(path.join(__dirname, filename));

  return bufferToDataUrl('image/png', buffer);
};
