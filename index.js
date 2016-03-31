'use strict';

const message = require('./lib/message');
const path = require('path');
const util = require('./lib/util');
const Handlebars = require('handlebars');
const http = require('http');
const nodeStatic = require('node-static');
const Doki = require('doki');
const ncp = require('ncp').ncp;
const fs = require('fs');
const kebabCase = require('lodash.kebabcase');
const globWatch = require('glob-watcher');
const chalk = require('chalk');

Handlebars.registerHelper('likableName', section => {
  let result = kebabCase(section);
  return new Handlebars.SafeString(result);
});

const dokiGenerate = args => {
  let doki = new Doki(args);
  doki.parser('cssurl', (i, line) => line);
  doki.parser('jsurl', (i, line) => line);
  doki.parser('colors', (i, line) => {
    let state = line.split(' - ');
    return {
      name: (state[0]) ? state[0].trim() : '',
      variable: (state[1]) ? state[1].trim() : ''
    };
  });

  return doki.out();
};

const generate = (args, destFolder, theme) => {
  if (!args.length) {
    message.warn('You need to specify a file!');
    process.exit(1);
  }
  util.dirExist(args[0]);

  const themeRequired = require.resolve(theme);
  const themeRequiredDir = path.dirname(themeRequired);

  // Compile template
  let markup = fs.readFileSync(path.resolve(themeRequiredDir, 'index.hbs'), 'utf-8');
  let template = Handlebars.compile(markup);
  let contentOutput = template(dokiGenerate(args));

  ncp(themeRequiredDir, destFolder, err => {
    if (err) {
      return console.error(err);
    }

    fs.writeFileSync(path.resolve(destFolder, 'index.html'), contentOutput);
    fs.unlink(path.resolve(destFolder, 'index.hbs'));
    message.info(`Generated at ${destFolder}`);
  });
};

const server = (port, destFolder) => {
  port = port || 8080;
  let file = new nodeStatic.Server(destFolder);
  http.createServer((request, response) => {
    request.addListener('end', () => {
      file.serve(request, response);
    }).resume();
  }).listen(port);
  message.info(`Server now running at http://localhost:${port}`);
};

const watch = (args, destFolder, port, theme) => {
  server(port, destFolder);
  util.dirExist(args[0]);
  generate(args, destFolder, theme);

  const watcher = globWatch(args);

  watcher.on('change', evt => {
    message.info(chalk.italic(`[${evt.type}: ${path.relative(process.cwd(), evt.path)}] 🕐 ${util.timeStamp()}`));
    generate(args, destFolder, theme);
  });
};

module.exports = {
  generate: generate,
  server: server,
  watch: watch
};
