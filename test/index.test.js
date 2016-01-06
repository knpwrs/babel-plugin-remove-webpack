import { test } from 'tape';
import { transform } from 'babel-core';
import plugin from '../src';

function clean([code]) {
  return code.replace(/\n\s+/g, '\n');
}

function run(code) {
  return clean([transform(code, {
    plugins: [plugin],
  }).code]);
}

test('keep require.ensure when arguments do not match', t => {
  const input = clean`require.ensure(function (require) {
    /* foo */
  });`;
  const output = run(input);
  t.equal(output, input);
  t.end();
});

test('keep require.ensure with name when arguments do not match', t => {
  const input = clean`require.ensure(function foo(require) {
    /* foo */
  });`;
  const output = run(input);
  t.equal(output, input);
  t.end();
});

test('remove require.ensure with empty array', t => {
  const input = clean`require.ensure([], function (require) {
    /* foo */
  });`;
  const output = run(input);
  const expected = clean`(function () {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with empty array and name', t => {
  const input = clean`require.ensure([], function foo(require) {
    /* foo */
  });`;
  const output = run(input);
  const expected = clean`(function foo() {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with non-empty array', t => {
  const input = clean`require.ensure(['a', 'b', 'c'], function (require) {
    /* foo */
  });`;
  const output = run(input);
  const expected = clean`(function () {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with non-empty array and name', t => {
  const input = clean`require.ensure(['a', 'b', 'c'], function foo(require) {
    /* foo */
  });`;
  const output = run(input);
  const expected = clean`(function foo() {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with empty array and chunk', t => {
  const input = clean`require.ensure([], function (require) {
    /* foo */
  }, 'foo');`;
  const output = run(input);
  const expected = clean`(function () {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with empty array and name and chunk', t => {
  const input = clean`require.ensure([], function foo(require) {
    /* foo */
  }, 'foo');`;
  const output = run(input);
  const expected = clean`(function foo() {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with non-empty array and chunk', t => {
  const input = clean`require.ensure(['a', 'b', 'c'], function (require) {
    /* foo */
  }, 'foo');`;
  const output = run(input);
  const expected = clean`(function () {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.ensure with non-empty array and name and chunk', t => {
  const input = clean`require.ensure(['a', 'b', 'c'], function foo(require) {
    /* foo */
  }, 'foo');`;
  const output = run(input);
  const expected = clean`(function foo() {
    /* foo */
  })();`;
  t.equal(output, expected);
  t.end();
});

test('remove require.include', t => {
  const input = clean`require.include('a')`;
  const output = run(input);
  const expected = '';
  t.equal(output, expected);
  t.end();
});
