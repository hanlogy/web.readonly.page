import { buildReadUrl } from '@/helpers/buildReadUrl';

describe('buildReadUrl', () => {
  const extra = { protocol: 'https:' };

  describe('file resource', () => {
    test('with http protocol', () => {
      expect(
        buildReadUrl({ url: 'http://example.com/foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#url=http://example.com/foo.md',
        readUrl: '/read#url=http://example.com/foo.md',
      });
    });

    test('with https protocol', () => {
      expect(
        buildReadUrl({ url: 'https://example.com/foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#url=example.com/foo.md',
        readUrl: '/read#url=example.com/foo.md',
      });
    });

    test('with //', () => {
      expect(
        buildReadUrl({ url: '//example.com/foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#url=example.com/foo.md',
        readUrl: '/read#url=example.com/foo.md',
      });
    });

    test('no protocol', () => {
      expect(buildReadUrl({ url: 'example.com/foo.md' }, extra)).toStrictEqual({
        pathname: '/read',
        hash: '#url=example.com/foo.md',
        readUrl: '/read#url=example.com/foo.md',
      });
    });
  });

  describe('collection resource', () => {
    test('with http protocol', () => {
      expect(
        buildReadUrl({ base: 'http://example.com/', file: 'foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#base=http://example.com/~file=foo.md',
        readUrl: '/read#base=http://example.com/~file=foo.md',
      });
    });

    test('with https protocol', () => {
      expect(
        buildReadUrl({ base: 'https://example.com/', file: 'foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#base=example.com/~file=foo.md',
        readUrl: '/read#base=example.com/~file=foo.md',
      });
    });

    test('with //', () => {
      expect(
        buildReadUrl({ base: '//example.com/', file: 'foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#base=example.com/~file=foo.md',
        readUrl: '/read#base=example.com/~file=foo.md',
      });
    });

    test('no protocol', () => {
      expect(
        buildReadUrl({ base: 'example.com/', file: 'foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#base=example.com/~file=foo.md',
        readUrl: '/read#base=example.com/~file=foo.md',
      });
    });

    test('file start with ./', () => {
      expect(
        buildReadUrl({ base: 'example.com/', file: './foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#base=example.com/~file=foo.md',
        readUrl: '/read#base=example.com/~file=foo.md',
      });
    });

    test('file start with ../', () => {
      expect(
        buildReadUrl({ base: 'example.com/', file: '../foo.md' }, extra)
      ).toStrictEqual({
        pathname: '/read',
        hash: '#base=example.com/~file=../foo.md',
        readUrl: '/read#base=example.com/~file=../foo.md',
      });
    });
  });
});
