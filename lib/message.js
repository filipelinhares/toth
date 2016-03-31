'use strict';

const chalk = require('chalk');

const info = chalk.cyan;
const warn = chalk.red;

const infoMessage = message => {
  console.log(info(`=======> ✓ ${message}`));
};

const warnMessage = message => {
  console.error(warn(`=======> ✖ ${message}`));
};

module.exports = {
  warn: warnMessage,
  info: infoMessage
};
