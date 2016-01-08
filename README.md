# babel-plugin-remove-webpack

[![Dependency Status](https://img.shields.io/david/knpwrs/babel-plugin-remove-webpack.svg)](https://david-dm.org/knpwrs/babel-plugin-remove-webpack)
[![devDependency Status](https://img.shields.io/david/dev/knpwrs/babel-plugin-remove-webpack.svg)](https://david-dm.org/knpwrs/babel-plugin-remove-webpack#info=devDependencies)
[![Build Status](https://img.shields.io/travis/knpwrs/babel-plugin-remove-webpack.svg)](https://travis-ci.org/knpwrs/babel-plugin-remove-webpack)
[![Npm Version](https://img.shields.io/npm/v/babel-plugin-remove-webpack.svg)](https://www.npmjs.com/package/babel-plugin-remove-webpack)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Badges](https://img.shields.io/badge/badges-6-orange.svg)](http://shields.io/)

Removes [webpack]-specific functions from JavaScript code.

## [`require.ensure`]

`require.ensure` is replaced with self-executing anonymous functions.

```js
// Before
require.ensure(['a', 'b', 'c'], function (require) {
  const a = require('a');
  const b = require('b');
  const c = require('c');
});

// After
(function () {
  const a = require('a');
  const b = require('b');
  const c = require('c');
})();
```

## [`require.include`]

`require.include` is removed entirely.

```js
// Before
require.include('a');

// After

```

## Motivation

[`require.ensure`] and [`require.include`] are great for [code splitting][cs];
however, they can cause issues when writing universal JavaScript. The typical
solution is to use synchronous shims. In order for [webpack] code splitting
to work properly these shims have to be defined in each file where they are
used.

This plugin makes it possible to universally run code which uses
[webpack]-specific functions without having to manually polyfill those
functions.

## Usage Notes

This plugin should not be used as a part of a build with [webpack], otherwise
code splitting will stop working. The intended usage is with the
[`babel-register`] package or some other build with babel that specifically
targets node. Usage as such will remove [`require.ensure`] and
[`require.include`] calls as shown above so you can run your client code on the
server without shims.

## License

MIT

[webpack]: http://webpack.github.io/ "webpack"
[cs]: https://webpack.github.io/docs/code-splitting.html "Code Splitting"
[`babel-register`]: https://www.npmjs.com/package/babel-register "`babel-register`"
[`require.ensure`]: https://webpack.github.io/docs/code-splitting.html#require-ensure "`require.ensure`"
[`require.include`]: https://webpack.github.io/docs/code-splitting.html#require-include "`require.include`"
