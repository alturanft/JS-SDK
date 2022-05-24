import { Altura } from '../index';

const altura = new Altura('123456789');

test('My Altura', () => {
  expect(altura.ping()).toBe('123456789');
  expect(altura.getUsers()).toBe('getUsers');
});
