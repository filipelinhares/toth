#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const path = require('path');
const toth = require('./index');

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

let destFolder = cli.flags.dir || 'toth';
let themeFolder = cli.flags.theme || path.resolve(__dirname, 'toth');
let userCommand = cli.input.shift();
let args = cli.input;

switch (userCommand) {
  case 'generate':
  case 'g':
    toth.generate(args, destFolder, themeFolder);
    break;
  case 'server':
  case 's':
    toth.serve({port: cli.flags.port, folder: destFolder});
    break;
  default:
    cli.showHelp();
}
