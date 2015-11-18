'use strict';

var chalk = require('chalk');

const info = chalk.green;
const infoBold = chalk.bold.green;

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
