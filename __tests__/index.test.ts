/**
 * Unit tests for the action's entrypoint, src/index.js
 */

import { run } from '../src/main';

// Mock the action's entrypoint
jest.mock('../src/main', () => {
  return {
    run: jest.fn(),
  };
});

describe('index', () => {
  it('calls run when imported', async () => {
    // eslint-disable-next-line global-require
    require('../src/index');

    expect(run).toHaveBeenCalled();
  });
});
