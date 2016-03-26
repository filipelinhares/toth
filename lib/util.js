'use strict';

const fs = require('fs');
const message = require('./message');

const dirExist = boof => {
  try {
    fs.statSync(boof);
  } catch (e) {
    if (e.code === 'ENOENT') {
      message.warn(`${boof} doesn't exist!`);
      process.exit(1);
    } else {
      console.error(e);
      process.exit(1);
    }
  }

  return true;
};

module.exports = {
  dirExist: dirExist
};
