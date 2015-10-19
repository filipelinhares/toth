#!/usr/bin/env node
'use strict';

const meow = require('meow');
const Doki = require('doki');
const server = require('node-static');
const ncp = require('ncp').ncp;
const path = require('path');
const http = require('http');
const util = require('./lib/util');
const message = require('./lib/message');

const cli = meow(util.help);

let destFolder = cli.flags.dir || 'toth';
let templateFolder = path.resolve(__dirname, 'toth-template');
let userCommand = cli.input.shift();
let args = cli.input;

const tothNew = () => {
  if (!args.length) {
    return message.warn('You need to specify a file!');
  }
  util.dirExist(args[0]);

  let doki = new Doki(args);
  doki.parser('id', (i, line) => line);
  doki.parser('cssurl', (i, line) => line);
  doki.parser('jsurl', (i, line) => line);
  doki.parser('colors', (i, line) => {
    var state = line.split(' - ');
    return {
      name: (state[0]) ? state[0].trim() : '',
      variable: (state[1]) ? state[1].trim() : ''
    };
  });
  doki.parse(templateFolder + '/index.json');

  ncp(templateFolder, destFolder, err => {
    if (err) {
      return console.error(err);
    }
    message.info(`Generated at ${destFolder}!`);
  });
};

const tothServe = () => {
  let port = cli.flags.port || 8080;
  util.dirExist(destFolder);
  let file = new server.Server(destFolder);
  http.createServer((request, response) => {
    request.addListener('end', () => {
      file.serve(request, response);
    }).resume();
  }).listen(port);
  message.info(`Server now running at port ${port}`);
};

switch (userCommand) {
  case 'new':
    tothNew();
    break;
  case 'serve':
    tothServe();
    break;
  default:
    cli.showHelp();
}
