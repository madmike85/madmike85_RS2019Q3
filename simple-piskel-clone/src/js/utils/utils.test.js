/* eslint-disable no-undef */
import { hexToRGB, rgbToFullHEX, colorsMatch } from './utils';

test('Should return an array or r,g,b chanels from hex color', () => {
  expect(hexToRGB('#28a745')).toEqual([40, 167, 69]);
});

test('Should return hex color from color chanels array', () => {
  expect(rgbToFullHEX(...[40, 167, 69])).toEqual('#28a745');
});

test('Should return that two rbga colors are equal', () => {
  const a = [40, 167, 69, 255];
  const b = [40, 167, 69, 255];
  expect(colorsMatch(a, b, 1)).toBeTruthy();
});

test('Should return that two rgba colors are not equal', () => {
  const a = [45, 167, 69, 255];
  const b = [40, 160, 69, 200];
  expect(colorsMatch(a, b, 1)).toBeFalsy();
});
