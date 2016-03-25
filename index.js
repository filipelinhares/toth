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

exports.new = (args, dir) => {
  if (!args.length) {
    return message.warn('You need to specify a file!');
  }
  util.dirExist(args[0]);

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
  doki.parse(path.resolve(dir, 'index.json'));
};

exports.compile = options => {
  Handlebars.registerHelper("likableName", (section) => {
    let result = kebabCase(section);
    return new Handlebars.SafeString(result);
  });

  let markup = fs.readFileSync(options.originFile, 'utf-8');
  let context = fs.readFileSync(options.context, 'utf-8');
  let template = Handlebars.compile(markup);
  let content = template(JSON.parse(context));
  fs.writeFileSync(options.dest, content);
};

exports.generate = (templateDir, destDir) => {
  ncp(templateDir, destDir, err => {
    if (err) {
      return console.error(err);
    }
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
