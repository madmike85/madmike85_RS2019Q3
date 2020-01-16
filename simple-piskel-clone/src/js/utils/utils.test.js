/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import {
  hexToRGB,
  rgbToFullHEX,
  colorsMatch,
  getAdjustedCoordinates,
  rgbToHEX,
  getPixel,
  setPixel,
} from './utils';

test('Should return an array or r,g,b chanels from hex color', () => {
  expect(hexToRGB('#28a745')).toEqual([40, 167, 69]);
});

test('Should return hex color from color channels array', () => {
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

test('getAdjustedCoordinates should be defined', () => {
  expect(getAdjustedCoordinates).toBeDefined();
});

test('should return hex value from rgb channel', () => {
  expect(rgbToHEX(167)).toEqual('a7');
});

test('getPixel should be defined', () => {
  expect(getPixel).toBeDefined();
});

test('setPixel should be defined', () => {
  expect(setPixel).toBeDefined();
});
