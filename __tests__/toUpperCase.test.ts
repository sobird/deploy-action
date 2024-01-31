import { toUpperCase } from '../src/up';

test('字符转为大写', () => {
  expect(toUpperCase('hello')).toBe('HELLO');
});
