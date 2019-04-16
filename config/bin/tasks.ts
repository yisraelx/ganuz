#!/usr/bin/env node -r ts-node/register/transpile-only
/* tslint:disable:no-console */

import chalk from 'chalk';
import yargs, { Arguments, Argv } from 'yargs';
import * as TASKS from '../tasks';

const TASK_NAMES: string[] = Object.keys(TASKS).filter((taskName: string) => typeof TASKS[taskName] === 'function');

let {argv} = yargs
  .scriptName('tasks')
  .command({
    command: '$0 [tasks..]',
    describe: 'Run tasks...',
    builder(yarg: Argv) {
      return yarg
        .positional('tasks', {
          desc: 'Tasks to run.',
          choices: TASK_NAMES
        } as any)
        .demandOption('tasks')
        .option('parallel', {
          desc: 'Run the tasks in parallel, by default it will run in series.',
          alias: ['p'],
          type: 'boolean',
          default: false
        });
    },
    handler(args: Arguments<any>) {
      let startTime: number = Date.now();
      let tasksList: string[] = args.tasks.slice(0);

      log(`Running in ${ args.parallel ? 'parallel' : 'series' } ${ tasksList.map((task) => `'${ chalk.cyan(task) }'`).join(' ') }`);

      let result: Promise<any> = args.parallel ? Promise.all(tasksList.map((taskName: string) => {
        return runTask(taskName);
      })) : tasksList.reduce(async (prev: Promise<any>, taskName: string) => {
        await prev;
        return runTask(taskName);
      }, Promise.resolve());

      result
        .then(() => {
          let runSeconds: string = `${ Math.round((Date.now() - startTime) / 1000) }s`;
          log(`Finished after ${ chalk.magenta(runSeconds) }`);
        })
        .catch((error: any) => {
          log(`${ chalk.red(`Error occurred:`) }\n${ chalk.yellow(error.stack || error) }`);
          process.exit(1);
        });
    }
  })
  .help();

async function runTask(taskName: string) {
  let task: Function = TASKS[taskName];
  let startTime: number = Date.now();
  log(`Starting '${ chalk.cyan(taskName) }'`);
  try {
    await task();
  } catch (error) {
    log(`${ chalk.red(`Error occurred in '${ chalk.cyan(taskName) }':`) }\n${ chalk.yellow(error.stack || error) }`);
    process.exit(1);
  }

  let runSeconds: string = `${ Math.round((Date.now() - startTime) / 1000) }s`;
  log(`Finished '${ chalk.cyan(taskName) }' after ${ chalk.magenta(runSeconds) }`);
}

function log(...args: string[]) {
  let time: string = (new Date).toTimeString().slice(0, 8);
  let pos: string = process.env.LERNA_PACKAGE_NAME || process.cwd();
  console.log(`[${ chalk.gray(time) }] [${ chalk.yellow(pos) }]`, ...args);
}
