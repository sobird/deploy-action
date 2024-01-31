import * as core from '@actions/core';
import * as github from '@actions/github';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Client } from 'ssh2';
import { wait } from './wait';

export async function run() {
  try {
    // The `who-to-greet` input is defined in action metadata file
    const whoToGreet = core.getInput('who-to-greet', { required: true });
    core.info(`Hello, ${whoToGreet}!`);

    // The `milliseconds` input is defined in action metadata file
    const ms = core.getInput('milliseconds', { required: true });

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`);

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    // Get the current time and set as an output
    const time = new Date().toTimeString();
    core.setOutput('time', time);

    const host = core.getInput('host');
    const port = parseInt(core.getInput('port'), 10);
    const username = core.getInput('username');
    const password = core.getInput('password');
    const privateKey = core.getInput('privateKey');
    const source = core.getInput('source');
    const target = core.getInput('target');

    const conn = new Client();
    conn.on('ready', () => {
      console.log('Client :: ready');
      conn.exec('uptime', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
          conn.end();
        }).on('data', (data) => {
          console.log(`STDOUT: ${data}`);
        }).stderr.on('data', (data) => {
          console.log(`STDERR: ${data}`);
        });
      });
    }).connect({
      host,
      port,
      username,
      password,
      privateKey,
    });

    // Output the payload for debugging
    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`,
    );
  } catch (error: any) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message);
  }
}
