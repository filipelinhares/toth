'use strict';

const fs    = require('fs');
const chalk = require('chalk');

const dirExist = (boof) => {
  let dir;

  try {
    dir = fs.statSync(boof);
  } catch (e) {
    if (e.code === 'ENOENT') {
      warnMessage(`${boof} no exist!`);
      process.exit(1);
    } else {
      console.error(e);
      process.exit(1);
    }
  }

  return true;
};

// =====================================================
// Messages
// =====================================================

const info     = chalk.cyan;
const infoBold = chalk.bold.cyan;

const warn     = chalk.red;
const warnBold = chalk.bold.red;

const infoMessage = (message) => {
  console.log(infoBold('=======> ✓'), info(message));
}

const warnMessage = (message) => {
  console.error(warnBold('=======> ✖'), warn(message));
}

var helpMessage = [
'Example:',
'  $ toth command [params] [flags]',
'  $ toth new scss/*.scss --dir myFolder',
'  $ toth serve --dir myFolder',
'Commands:',
'  ⇢ new   - Generates a styleguide at toth dir.',
'  ⇢ serve - Up a server from toth folder at port 8080.',
'Flags:',
'  ⇢ --dir  - Change the directory.',
'  ⇢ --port - Change the port of the server.',
].join('\n');

module.exports = {
  dirExist: dirExist,
  warnMessage: warnMessage,
  infoMessage: infoMessage,
  help: helpMessage
}
