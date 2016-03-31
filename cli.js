#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const path = require('path');
const toth = require('./index');
const util = require('./lib/util');

const cli = meow(`
    ${chalk.italic('Examples')}:
      $ toth command [params] [flags]
      $ toth generate scss/*.scss --dir myFolder
      $ toth server --dir myFolder

    ${chalk.italic('Commands')}:
      ⇢ g, generate - Generates a styleguide at toth dir.
      ⇢ s, server   - Up a server from toth folder at port 8080.

    ${chalk.italic('Flags')}:
      ⇢ -h, --help  - Show this message.
      ⇢ -d, --dir   - Change the directory.
      ⇢ -p, --port  - Change the port of the server.
      ⇢ -t, --theme - Change the theme folder.
  `,
  {
    alias: {
      d: 'dir',
      p: 'port',
      t: 'theme'
    }
  });

const destFolder = cli.flags.dir || 'toth';
const theme = cli.flags.theme || path.resolve(__dirname, 'toth');
const userCommand = cli.input.shift();
const args = cli.input;

util.dirExist(destFolder);
util.dirExist(theme);

const run = option => {
  if (option === 'generate' || option === 'g') {
    toth.generate(args, destFolder, theme);
  }

  if (option === 'server' || option === 's') {
    toth.serve(cli.flags.port, destFolder);
  }

  if (option === undefined || !(/\b(generate|server|s|g)\b/ig.test(option))) {
    cli.showHelp();
  }
}

run(userCommand);
