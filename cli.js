#!/usr/bin/env node
'use strict';

const meow = require('meow');
const path = require('path');
const util = require('./lib/util');
const toth = require('./index');

const cli = meow(util.help);

let destFolder = cli.flags.dir || 'toth';
let themeFolder = cli.flags.theme || path.resolve(__dirname, 'toth');
let userCommand = cli.input.shift();
let args = cli.input;

switch (userCommand) {
  case 'generate':
    toth.compile(args, destFolder, themeFolder);
    break;
  case 'serve':
    toth.serve({port: cli.flags.port, folder: destFolder});
    break;
  default:
    cli.showHelp();
}
