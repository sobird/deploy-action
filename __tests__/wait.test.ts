/**
 * Unit tests for src/wait.js
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';
import { wait } from '../src/wait';

describe('wait.js', () => {
  it('throws an invalid number', async () => {
    const input = parseInt('foo', 10);
    expect(Number.isNaN(input)).toBe(true);

    await expect(wait(input)).rejects.toThrow('milliseconds not a number');
  });

  it('waits with a valid number', async () => {
    const start = new Date();
    await wait(500);
    const end = new Date();

    const delta = Math.abs(end.getTime() - start.getTime());

    expect(delta).toBeGreaterThan(450);
  });
});
