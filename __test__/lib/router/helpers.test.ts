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
  test('empty', () => {
    expect(parsePathHash('')).toStrictEqual({});
    expect(parsePathHash('#')).toStrictEqual({});
  });

  test('strip hash', () => {
    expect(parsePathHash('#a=1')).toStrictEqual({ a: '1' });
    expect(parsePathHash('a=1')).toStrictEqual({ a: '1' });
  });

  test('no valid param', () => {
    expect(parsePathHash('#foo')).toStrictEqual({});
    expect(parsePathHash('#~abc')).toStrictEqual({});
  });

  test('single param', () => {
    expect(parsePathHash('#foo=bar')).toStrictEqual({ foo: 'bar' });
  });

  test('multiple params', () => {
    expect(parsePathHash('#a=1~b=2~c=3')).toStrictEqual({
      a: '1',
      b: '2',
      c: '3',
    });
  });

  test('leading separator', () => {
    expect(parsePathHash('#~a=1~b=2')).toStrictEqual({});
  });

  test('remove empty value', () => {
    expect(parsePathHash('#a=')).toStrictEqual({});
    expect(parsePathHash('#a=~b=2')).toStrictEqual({ b: '2' });
  });

  test('decode', () => {
    expect(parsePathHash('#a=hello%20world')).toStrictEqual({
      a: 'hello world',
    });
    // %7E -> "~"
    expect(parsePathHash('#a=1%7Eb=2')).toStrictEqual({ a: '1', b: '2' });
  });

  test('decode failed', () => {
    expect(parsePathHash('#a=%E0%A4%A')).toStrictEqual({ a: '%E0%A4%A' });
  });

  test('has queries like pattern in values', () => {
    expect(
      parsePathHash('#base=foo&id=1~file=bar~extra=baz?name=foo&type=bar')
    ).toStrictEqual({
      base: 'foo&id=1',
      file: 'bar',
      extra: 'baz?name=foo&type=bar',
    });
  });

  test('duplicate key', () => {
    expect(parsePathHash('#a=1~a=2')).toEqual({ a: '2' });
  });

  test('tilde in value', () => {
    expect(parsePathHash('#a=hello~world')).toEqual({ a: 'hello~world' });
    expect(parsePathHash('#a=hello~1world~b=2')).toEqual({
      a: 'hello~1world',
      b: '2',
    });
  });
});
