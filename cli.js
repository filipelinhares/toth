#!/usr/bin/env node
'use strict';

const meow = require('meow');
const path = require('path');
const util = require('./lib/util');
const toth = require('./index');

const cli = meow(util.help);

let destFolder = cli.flags.dir || 'toth';
let tothFolder = path.resolve(__dirname, 'toth');
let templateFolder = path.resolve(__dirname, 'template');
let userCommand = cli.input.shift();
let args = cli.input;

switch (userCommand) {
  case 'new':
    toth.new(args, templateFolder);
    toth.compile({
      originFile: path.resolve(templateFolder, 'index.hbs'),
      context: path.resolve(templateFolder, 'index.json'),
      dest: path.resolve(tothFolder, 'index.html')
    });
    toth.generate(tothFolder, destFolder);
    break;
  case 'serve':
    toth.serve({port: cli.flags.port, folder: destFolder});
    break;
  default:
    cli.showHelp();
}
