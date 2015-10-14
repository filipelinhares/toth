#!/usr/bin/env node
'use strict';

const meow   = require('meow');
const Doki   = require('doki');
const server = require('node-static');
const ncp    = require('ncp').ncp
const util   = require('./util/util');
const path   = require('path');

const cli    = meow(util.help);

let destFolder     = cli.flags.dir || 'toth';
let templateFolder = path.resolve(__dirname, 'toth-template');
let userCommand    = cli.input.shift();
let args           = cli.input;

const tothNew = () => {
  if (!args.length) return util.warnMessage('You need to specify a file!')
  util.dirExist(args[0]);

  let doki = new Doki(args);
  doki.parser('id', (i, line, block) => line );
  doki.parser('cssurl', (i, line, block) => line );
  doki.parser('jsurl', (i, line, block) => line );
  doki.parse(templateFolder + '/index.json');

  ncp(templateFolder, destFolder, (err) => {
    if (err) return console.error(err);
    util.infoMessage(`Generated at ${destFolder}!`);
  });
};

const tothServe = () => {
  let port = cli.flags.port || 8080;
  util.dirExist(destFolder)
  let file = new server.Server(destFolder);
  require('http').createServer((request, response) => {
      request.addListener('end',() => {
          file.serve(request, response);
      }).resume();
  }).listen(port);
  util.infoMessage(`Server now running at port ${port}`);
};

switch(userCommand) {
  case 'new':
    tothNew();
    break;
  case 'serve':
    tothServe();
    break;
  default:
    cli.showHelp();
}
