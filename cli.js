#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
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

const settings = {
  cli: cli,
  destFolder: cli.flags.dir || 'toth',
  theme: cli.flags.theme || 'toth-default-theme',
  port: cli.flags.port || 8080,
  args: cli.input,
  userCommand: cli.input.shift()
};

let alias = util.abbreviation(settings, toth);

toth[alias](settings);
