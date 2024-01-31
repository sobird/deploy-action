import core from '@actions/core';
import github from '@actions/github';
import { wait } from './wait';
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
// eslint-disable-next-line import/prefer-default-export
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

    // const host = core.getInput('host')
    // const port = core.getInput('port')
    // const username = core.getInput('username')
    // const password = core.getInput('password')
    // const source = core.getInput('source')
    // const target = core.getInput('target')

    // Output the payload for debugging
    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`,
    );
  } catch (error: any) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message);
  }
}
