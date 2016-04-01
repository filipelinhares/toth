'use strict';

const fs = require('fs');
const message = require('./message');
const abbrev = require('abbrev');

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

const timeStamp = () => {
  let now = new Date();
  let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  let suffix = (time[0] < 12) ? 'AM' : 'PM';

  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;

  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = '0' + time[i];
    }
  }

  return `${time.join(':')} ${suffix}`;
};

const abbreviation = (options, commands) => {
  const alias = abbrev(Object.keys(commands));

  if (alias.hasOwnProperty(options.userCommand)) {
    return alias[options.userCommand];
  }
  return options.cli.showHelp();
};

module.exports = {
  dirExist: dirExist,
  timeStamp: timeStamp,
  abbreviation: abbreviation
};
