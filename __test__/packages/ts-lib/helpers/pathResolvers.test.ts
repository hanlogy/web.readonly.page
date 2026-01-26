import {
  resolveWithBasePath,
  resolveWithBaseUrl,
} from '@/packages/ts-lib/helpers/pathResolvers';

describe('resolveWithBasePath', () => {
  test('path specific', () => {
    expect(
      resolveWithBasePath({
        base: '/p/a/t/h',
        path: '//abc',
      })
    ).toBe('//abc');

    expect(
      resolveWithBasePath({
        base: '/p/a/t/h',
        path: 'https://abc',
      })
    ).toBe('https://abc');
  });

  test('simple path', () => {
    expect(
      resolveWithBasePath({
        base: '/var/log',
        path: 'app.log',
      })
    ).toBe('/var/log/app.log');
  });

  test('current directory "."', () => {
    expect(
      resolveWithBasePath({
        base: '/var/log',
        path: './app.log',
      })
    ).toBe('/var/log/app.log');
  });

  test('single ".."', () => {
    expect(
      resolveWithBasePath({
        base: '/var/log/users',
        path: '../website.txt',
      })
    ).toBe('/var/log/website.txt');
  });

  test('multiple ".."', () => {
    expect(
      resolveWithBasePath({
        base: '/var/log/users',
        path: '../../website.txt',
      })
    ).toBe('/var/website.txt');
  });

  test('go beyond root, base is root', () => {
    expect(
      resolveWithBasePath({
        base: '/',
        path: '../website.txt',
      })
    ).toBe('/website.txt');
  });

  test('go beyond root, base is not root', () => {
    expect(
      resolveWithBasePath({
        base: '/1/2/3',
        path: '../../../../a/b/c',
      })
    ).toBe('/a/b/c');
  });

  test('normalizes extra slashes', () => {
    expect(
      resolveWithBasePath({
        base: '/var//log///',
        path: 'app.log',
      })
    ).toBe('/var/log/app.log');
  });

  describe('empty path', () => {
    test('base has leading /, no trailing', () => {
      expect(
        resolveWithBasePath({
          base: '/var/log',
          path: '',
        })
      ).toBe('/var/log');
    });

    test('base has no leading, has trailing', () => {
      expect(
        resolveWithBasePath({
          base: 'var/log/',
          path: '',
        })
      ).toBe('var/log/');
    });

    test('base has no leading, no trailing', () => {
      expect(
        resolveWithBasePath({
          base: 'var/log',
          path: '',
        })
      ).toBe('var/log');
    });
  });

  describe('do not care', () => {
    test('strange base path', () => {
      expect(
        resolveWithBasePath({
          base: '///var/log/',
          path: './users/app.log',
        })
      ).toBe('///var/log/users/app.log');
    });

    test('strange absolute path', () => {
      expect(
        resolveWithBasePath({
          base: '/var/log/',
          path: '///users/app.log',
        })
      ).toBe('///users/app.log');
    });

    test('invalid relative path', () => {
      expect(
        resolveWithBasePath({
          base: '/var/log/',
          path: '.../.../users/app.log',
        })
      ).toBe('/var/log/.../.../users/app.log');
    });
  });
});

describe('resolveWithBaseUrl', () => {
  test('relative path', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/c',
        href: 'd',
      })
    ).toBe('https://abc.com/a/b/c/d');
  });

  test('relative path, base has ending slash', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/c/',
        href: 'd',
      })
    ).toBe('https://abc.com/a/b/c/d');
  });

  test('one dot', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/c/',
        href: './d',
      })
    ).toBe('https://abc.com/a/b/c/d');
  });

  test('one up', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/c/',
        href: '../d',
      })
    ).toBe('https://abc.com/a/b/d');
  });

  test('double up', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/c/',
        href: '../../d',
      })
    ).toBe('https://abc.com/a/d');
  });

  test('base from root', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com',
        href: 'd',
      })
    ).toBe('https://abc.com/d');
  });

  test('base is not http', () => {
    expect(
      resolveWithBaseUrl({
        base: 'file:///a/b',
        href: 'd',
      })
    ).toBe('d');
  });

  test('absolute url', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/',
        href: 'https://x.com/y',
      })
    ).toBe('https://x.com/y');
  });

  test('absolute path', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/',
        href: '/x',
      })
    ).toBe('https://abc.com/x');
  });

  test('up beyond root', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/',
        href: '../../../../1/2/3.log',
      })
    ).toBe('https://abc.com/1/2/3.log');
  });

  test('scheme relative', () => {
    expect(
      resolveWithBaseUrl({
        base: 'https://abc.com/a/b/',
        href: '//x.com/y',
      })
    ).toBe('//x.com/y');
  });
});
