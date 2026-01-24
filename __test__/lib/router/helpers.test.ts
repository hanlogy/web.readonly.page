import { isSamePath, pathToUrl, readPath } from '@/lib/router/helpers';

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

describe('readPath', () => {
  test('only path name', () => {
    expect(
      readPath({
        pathname: 'htp://example.com',
        search: '',
        hash: '',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: '',
      hash: '',
      anchor: '',
    });
  });

  test('with search', () => {
    expect(
      readPath({
        pathname: 'htp://example.com',
        search: '?name=foo',
        hash: '',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: 'name=foo',
      hash: '',
      anchor: '',
    });
  });

  test('with hash', () => {
    expect(
      readPath({
        pathname: 'htp://example.com',
        search: '?name=foo',
        hash: '#bar',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: 'name=foo',
      hash: 'bar',
      anchor: '',
    });
  });

  test('with anchor', () => {
    expect(
      readPath({
        pathname: 'htp://example.com',
        search: '?name=foo',
        hash: '#bar#tar#baz',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: 'name=foo',
      hash: 'bar',
      anchor: 'tar#baz',
    });
  });
});
