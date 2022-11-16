#!/usr/bin/env node
const program = require('commander')
program.version(require('../package').version)
program.command('create <name>')
  .description('init project')
  .action(require('../bin/create'))
program.parse(process.argv)


