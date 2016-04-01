'use strict';

const icon = require('figures');
const chalk = require('chalk');

const info = chalk.cyan;
const warn = chalk.red;

const infoMessage = message => {
  console.log(info(`=-=${icon.tick} ${message}`));
};

const warnMessage = message => {
  console.error(warn(`=-=${icon.cross} ${message}`));
  process.exit(1);
};

module.exports = {
  warn: warnMessage,
  info: infoMessage
};
