import { isSamePath, pathToUrl } from '@/lib/router/helpers';

describe('pathToUrl', () => {
  test('hash is undefined', () => {
    expect(pathToUrl({ pathname: '/' })).toBe('/');
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
