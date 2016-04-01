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

const generate = settings => {
  if (!settings.args.length) {
    message.warn('You need to specify a file!');
    process.exit(1);
  }
  util.dirExist(settings.args[0]);

  const themeRequired = require.resolve(settings.theme);
  const themeRequiredDir = path.dirname(themeRequired);

  // Compile template
  let markup = fs.readFileSync(themeRequired, 'utf-8');
  let template = Handlebars.compile(markup);
  let contentOutput = template(dokiGenerate(settings.args));

  ncp(themeRequiredDir, settings.destFolder, err => {
    if (err) {
      return console.error(err);
    }
    fs.writeFileSync(path.resolve(settings.destFolder, 'index.html'), contentOutput);
    fs.unlink(path.resolve(settings.destFolder, 'index.hbs'));
    message.info(`Generated at ${settings.destFolder}`);
  });
};

const server = settings => {
  let file = new nodeStatic.Server(settings.destFolder);
  http.createServer((request, response) => {
    request.addListener('end', () => {
      file.serve(request, response);
    }).resume();
  }).listen(settings.port);
  message.info(`Server now running at http://localhost:${settings.port}`);
};

const watch = settings => {
  util.dirExist(settings.args[0]);
  server(settings);
  generate(settings);
  const watcher = globWatch(settings.args);
  watcher.on('change', evt => {
    message.info(chalk.italic(`[${evt.type}: ${path.relative(process.cwd(), evt.path)}] 🕐 ${util.timeStamp()}`));
    generate(settings);
  });
};

module.exports = {
  generate: generate,
  server: server,
  watch: watch
};
