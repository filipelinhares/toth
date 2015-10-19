'use strict';

var chalk = require('chalk');

const info = chalk.cyan;
const infoBold = chalk.bold.cyan;

const warn = chalk.red;
const warnBold = chalk.bold.red;

const infoMessage = message => {
  console.log(infoBold('=======> ✓'), info(message));
};

const warnMessage = message => {
  console.error(warnBold('=======> ✖'), warn(message));
};

module.exports = {
  warn: warnMessage,
  info: infoMessage
};
