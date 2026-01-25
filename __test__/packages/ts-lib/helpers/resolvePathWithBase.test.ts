import { resolvePathWithBase } from '@/packages/ts-lib/helpers/resolvePathWithBase';

describe('resolvePathWithBase', () => {
  test('path specific', () => {
    expect(
      resolvePathWithBase({
        base: '/p/a/t/h',
        path: '//abc',
      })
    ).toBe('//abc');

    expect(
      resolvePathWithBase({
        base: '/p/a/t/h',
        path: 'https://abc',
      })
    ).toBe('https://abc');
  });

  test('simple path', () => {
    expect(
      resolvePathWithBase({
        base: '/var/log',
        path: 'app.log',
      })
    ).toBe('/var/log/app.log');
  });

  test('current directory "."', () => {
    expect(
      resolvePathWithBase({
        base: '/var/log',
        path: './app.log',
      })
    ).toBe('/var/log/app.log');
  });

  test('single ".."', () => {
    expect(
      resolvePathWithBase({
        base: '/var/log/users',
        path: '../website.txt',
      })
    ).toBe('/var/log/website.txt');
  });

  test('multiple ".."', () => {
    expect(
      resolvePathWithBase({
        base: '/var/log/users',
        path: '../../website.txt',
      })
    ).toBe('/var/website.txt');
  });

  test('go beyond root', () => {
    expect(
      resolvePathWithBase({
        base: '/',
        path: '../website.txt',
      })
    ).toBe('/website.txt');
  });

  test('normalizes extra slashes', () => {
    expect(
      resolvePathWithBase({
        base: '/var//log///',
        path: 'app.log',
      })
    ).toBe('/var/log/app.log');
  });

  describe('empty path', () => {
    test('base has leading /, no trailing', () => {
      expect(
        resolvePathWithBase({
          base: '/var/log',
          path: '',
        })
      ).toBe('/var/log');
    });

    test('base has no leading, has trailing', () => {
      expect(
        resolvePathWithBase({
          base: 'var/log/',
          path: '',
        })
      ).toBe('var/log/');
    });

    test('base has no leading, no trailing', () => {
      expect(
        resolvePathWithBase({
          base: 'var/log',
          path: '',
        })
      ).toBe('var/log');
    });
  });

  describe('do not care', () => {
    test('strange absolute path', () => {
      expect(
        resolvePathWithBase({
          base: '/var/log/',
          path: '///users/app.log',
        })
      ).toBe('///users/app.log');
    });

    test('invalid relative path', () => {
      expect(
        resolvePathWithBase({
          base: '/var/log/',
          path: '.../.../users/app.log',
        })
      ).toBe('/var/log/.../.../users/app.log');
    });
  });
});
