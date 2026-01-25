import {
  isSamePath,
  parsePathHash,
  pathToUrl,
  readPathFromLocation,
} from '@/lib/router/helpers';

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

describe('readPathFromLocation', () => {
  test('only path name', () => {
    expect(
      readPathFromLocation({
        pathname: 'htp://example.com',
        search: '',
        hash: '',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: '',
      hash: '',
    });
  });

  test('with search', () => {
    expect(
      readPathFromLocation({
        pathname: 'htp://example.com',
        search: '?name=foo',
        hash: '',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: '?name=foo',
      hash: '',
    });
  });

  test('with hash', () => {
    expect(
      readPathFromLocation({
        pathname: 'htp://example.com',
        search: '?name=foo',
        hash: '#bar',
      })
    ).toStrictEqual({
      pathname: 'htp://example.com',
      search: '?name=foo',
      hash: '#bar',
    });
  });
});

describe('parsePathHash', () => {
  test('only #', () => {
    expect(parsePathHash('#')).toStrictEqual({
      resources: [],
      params: {},
    });
  });

  test('resources has one element', () => {
    expect(parsePathHash('#foo')).toStrictEqual({
      resources: ['foo'],
      params: {},
    });
  });

  test('only resources, has more then one elements', () => {
    expect(parsePathHash('#foo#bar#baz')).toStrictEqual({
      resources: ['foo', 'bar', 'baz'],
      params: {},
    });
  });

  test('only params, has one pair ', () => {
    expect(parsePathHash('#a=1')).toStrictEqual({
      resources: [],
      params: { a: '1' },
    });
  });

  test('only params, more than one pairs ', () => {
    expect(parsePathHash('#a=1;b=null;c=true')).toStrictEqual({
      resources: [],
      params: { a: '1', b: 'null', c: 'true' },
    });
  });

  test('both resources and params', () => {
    expect(parsePathHash('#foo#bar#baz#a=1;b=null;c=true')).toStrictEqual({
      resources: ['foo', 'bar', 'baz'],
      params: { a: '1', b: 'null', c: 'true' },
    });
  });
});
