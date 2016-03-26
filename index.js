'use strict';

const message = require('./lib/message');
const path = require('path');
const util = require('./lib/util');
const Handlebars = require('handlebars');
const http = require('http');
const server = require('node-static');
const Doki = require('doki');
const ncp = require('ncp').ncp;
const fs = require('fs');
const kebabCase = require('lodash.kebabcase');

Handlebars.registerHelper('likableName', section => {
  let result = kebabCase(section);
  return new Handlebars.SafeString(result);
});

function dokiGenerate(args) {
  let doki = new Doki(args);
  doki.parser('cssurl', (i, line) => line);
  doki.parser('jsurl', (i, line) => line);
  doki.parser('colors', (i, line) => {
    var state = line.split(' - ');
    return {
      name: (state[0]) ? state[0].trim() : '',
      variable: (state[1]) ? state[1].trim() : ''
    };
  });

  return doki.out();
}

exports.generate = (args, destDir, themeDir) => {
  if (!args.length) {
    return message.warn('You need to specify a file!');
  }
  util.dirExist(args[0]);
  util.dirExist(themeDir);

  // Compile template
  let markup = fs.readFileSync(path.resolve(themeDir, 'index.hbs'), 'utf-8');
  let template = Handlebars.compile(markup);
  let contentOutput = template(dokiGenerate(args));

  ncp(themeDir, destDir, err => {
    if (err) {
      return console.error(err);
    }

    fs.writeFileSync(path.resolve(destDir, 'index.html'), contentOutput);
    fs.unlink(path.resolve(destDir, 'index.hbs'));
    message.info(`Generated at ${destDir}!`);
  });
};

exports.serve = options => {
  let port = options.port || 8080;
  util.dirExist(options.folder);
  let file = new server.Server(options.folder);
  http.createServer((request, response) => {
    request.addListener('end', () => {
      file.serve(request, response);
    }).resume();
  }).listen(port);
  message.info(`Server now running at port ${port}`);
};
