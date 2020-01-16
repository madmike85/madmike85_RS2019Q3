/* eslint-disable no-undef */
import { shortcuts } from './shortcuts';

test('shortcuts shoul contatin eraser element', () => {
  const element = {
    element: 'eraser',
    key: 'KeyE',
    type: 'tool',
  };
  expect(shortcuts).toContainEqual(element);
});
