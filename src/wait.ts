/**
 * Wait for a number of milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to wait.
 * @returns {Promise<string>} Resolves with 'done!' after the wait is over.
 */
export async function wait(milliseconds: number): Promise<string> {
  return new Promise((resolve) => {
    if (Number.isNaN(milliseconds)) {
      throw new Error('milliseconds not a number');
    }

    setTimeout(() => { return resolve('done!'); }, milliseconds);
  });
}
