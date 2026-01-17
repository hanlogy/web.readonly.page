import { isSamePath, pathToUrl } from '@/lib/router/helpers';

describe('pathToUrl', () => {
  test('hash is undefined', () => {
    expect(pathToUrl({ pathname: '/' })).toBe('/');
  });

  test('hash is #', () => {
    expect(pathToUrl({ pathname: '/', hash: '#' })).toBe('/');
  });

  test('multiple #', () => {
    expect(pathToUrl({ pathname: '/', hash: '####foo' })).toBe('/#foo');
  });
});

describe('isSamePath', () => {
  test('same', () => {
    expect(
      isSamePath(
        { pathname: '/', hash: '#foo' },
        { pathname: '/', hash: '#foo' }
      )
    ).toBe(true);
  });

  test('not same', () => {
    expect(
      isSamePath(
        { pathname: '/', hash: '#foo' },
        { pathname: '/', hash: '#bar' }
      )
    ).toBe(false);
  });
});
