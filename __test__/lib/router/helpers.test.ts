import { isSameLocation, locationToUrl } from '@/lib/router/helpers';

describe('locationToUrl', () => {
  test('hash is undefined', () => {
    expect(locationToUrl({ pathname: '/' })).toBe('/');
  });

  test('hash is #', () => {
    expect(locationToUrl({ pathname: '/', hash: '#' })).toBe('/');
  });

  test('multiple #', () => {
    expect(locationToUrl({ pathname: '/###', hash: '####foo' })).toBe('/#foo');
  });
});

describe('isSameLocation', () => {
  test('same', () => {
    expect(
      isSameLocation(
        { pathname: '/', hash: 'foo' },
        { pathname: '/', hash: 'foo' }
      )
    ).toBe(true);
  });

  test('not same', () => {
    expect(
      isSameLocation(
        { pathname: '/', hash: 'foo' },
        { pathname: '/', hash: 'bar' }
      )
    ).toBe(false);
  });
});
