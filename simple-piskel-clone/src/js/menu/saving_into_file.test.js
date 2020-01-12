/* eslint-disable no-undef */
import { saveAsAPNG, saveAsGIF } from './saving_into_file';

test('saveAsAPNG should be defined', () => {
  expect(saveAsAPNG).toBeDefined();
});

test('saveAsGIF should be defined', () => {
  expect(saveAsGIF).toBeDefined();
});
