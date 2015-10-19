'use strict';

const fs = require('fs');
const message = require('./message');

const dirExist = boof => {
  try {
    fs.statSync(boof);
  } catch (e) {
    if (e.code === 'ENOENT') {
      message.warn(`${boof} no exist!`);
      process.exit(1);
    } else {
      console.error(e);
      process.exit(1);
    }
  }

  return true;
};

const helpMessage = [
  'Example:',
  '  $ toth command [params] [flags]',
  '  $ toth new scss/*.scss --dir myFolder',
  '  $ toth serve --dir myFolder',
  'Commands:',
  '  ⇢ new   - Generates a styleguide at toth dir.',
  '  ⇢ serve - Up a server from toth folder at port 8080.',
  'Flags:',
  '  ⇢ --dir  - Change the directory.',
  '  ⇢ --port - Change the port of the server.'
].join('\n');

module.exports = {
  dirExist: dirExist,
  help: helpMessage
};
