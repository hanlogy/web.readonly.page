/* eslint-disable no-constant-binary-expression */
import { clsx } from '@/packages/react-dom-lib';

describe('strings', () => {
  test('single', () => {
    expect(clsx('')).toBe('');
    expect(clsx('foo')).toBe('foo');
    expect(clsx(true && 'foo')).toBe('foo');
    expect(clsx(false && 'foo')).toBe('');
  });

  test('variadic', () => {
    expect(clsx('', 'foo')).toBe('foo');
    expect(clsx('foo', 'bar')).toBe('foo bar');
    expect(clsx(true && 'foo', false && 'bar', 'baz')).toBe('foo baz');
    expect(clsx(false && 'foo', 'bar', 'baz', '')).toBe('bar baz');
  });
});

describe('numbers', () => {
  test('single', () => {
    expect(clsx(1)).toBe('1');
    expect(clsx(12)).toBe('12');
    expect(clsx(0.1)).toBe('0.1');
    expect(clsx(0)).toBe('');
    expect(clsx(Infinity)).toBe('Infinity');
    expect(clsx(NaN)).toBe('');
  });

  test('variadic', () => {
    expect(clsx(0, 1)).toBe('1');
    expect(clsx(1, 2)).toBe('1 2');
  });
});

describe('objects', () => {
  test('single', () => {
    expect(clsx({})).toBe('');
    expect(clsx({ foo: true })).toBe('foo');
    expect(clsx({ foo: true, bar: false })).toBe('foo');
    expect(clsx({ foo: 'hiya', bar: 1 })).toBe('foo bar');
    expect(clsx({ foo: 1, bar: 0, baz: 1 })).toBe('foo baz');
    expect(clsx({ '-foo': 1, '--bar': 1 })).toBe('-foo --bar');
  });

  test('variadic', () => {
    expect(clsx({}, {})).toBe('');
    expect(clsx({ foo: 1 }, { bar: 2 })).toBe('foo bar');
    expect(clsx({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe('foo baz');
    expect(
      clsx({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Infinity })
    ).toBe('foo bar bat');
  });
});

describe('arrays', () => {
  test('flat', () => {
    expect(clsx([])).toBe('');
    expect(clsx(['foo'])).toBe('foo');
    expect(clsx(['foo', 'bar'])).toBe('foo bar');
    expect(clsx(['foo', 0 && 'bar', 1 && 'baz'])).toBe('foo baz');
  });

  test('nested', () => {
    expect(clsx([[[]]])).toBe('');
    expect(clsx([[['foo']]])).toBe('foo');
    expect(clsx([true, [['foo']]])).toBe('foo');
    expect(clsx(['foo', ['bar', ['', [['baz']]]]])).toBe('foo bar baz');
  });

  test('variadic', () => {
    expect(clsx([], [])).toBe('');
    expect(clsx(['foo'], ['bar'])).toBe('foo bar');
    expect(clsx(['foo'], null, ['baz', ''], true, '', [])).toBe('foo baz');
  });
});

describe('edge cases', () => {
  test('no push escape', () => {
    expect(clsx({ push: 1 })).toBe('push');
    expect(clsx({ pop: true })).toBe('pop');
    expect(clsx({ push: true })).toBe('push');
    expect(clsx('hello', { world: 1, push: true })).toBe('hello world push');
  });
});
