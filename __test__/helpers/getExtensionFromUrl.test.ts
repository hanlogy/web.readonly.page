import { getExtensionFromUrl } from '@/helpers/getExtensionFromUrl';

describe('getExtensionFromUrl', () => {
  test('simple', () => {
    expect(getExtensionFromUrl('http://example.com/a.md')).toBe('md');
  });

  test('with query', () => {
    expect(getExtensionFromUrl('http://example.com/a.md?name=foo')).toBe('md');
  });

  test('with hashtag', () => {
    expect(getExtensionFromUrl('http://example.com/a.md#name=foo')).toBe('md');
  });

  test('empty', () => {
    expect(getExtensionFromUrl('http://example.com/a')).toBe(null);
  });

  test('not a url', () => {
    expect(getExtensionFromUrl('something/a.log')).toBe('log');
  });
});
