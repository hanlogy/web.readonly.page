import { ensureUrlProtocol } from '@/helpers/ensureUrlProtocol';

describe('ensureUrlProtocol', () => {
  test('http', () => {
    expect(ensureUrlProtocol('http://example.com/')).toBe(
      'http://example.com/'
    );
  });

  test('https', () => {
    expect(ensureUrlProtocol('https://example.com/')).toBe(
      'https://example.com/'
    );
  });

  test('scheme relative', () => {
    expect(ensureUrlProtocol('//example.com/')).toBe('//example.com/');
  });

  test('scheme missing', () => {
    expect(ensureUrlProtocol('example.com/')).toBe('//example.com/');
  });
});
