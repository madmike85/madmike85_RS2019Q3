/* eslint-disable no-undef */
import { hexToRGB, rgbToFullHEX } from './utils';

test('Should return an array or r,g,b chanels from hex color', () => {
  expect(hexToRGB('#28a745')).toEqual([40, 167, 69]);
});

test('Should return hex color from color chanels array', () => {
  expect(rgbToFullHEX(...[40, 167, 69])).toEqual('#28a745');
});
