# babel-plugin-remove-webpack

[![Dependency Status](https://david-dm.org/knpwrs/babel-plugin-remove-webpack.svg)](https://david-dm.org/knpwrs/babel-plugin-remove-webpack) [![devDependency Status](https://david-dm.org/knpwrs/babel-plugin-remove-webpack/dev-status.svg)](https://david-dm.org/knpwrs/babel-plugin-remove-webpack#info=devDependencies) [![Build Status](https://travis-ci.org/knpwrs/babel-plugin-remove-webpack.svg)](https://travis-ci.org/knpwrs/babel-plugin-remove-webpack)

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
solution is to use synchronous polyfills. In order for [webpack] code splitting
to work properly these polyfills have to be defined in each file where they are
used.

This plugin makes it possible to run code which uses [webpack]-specific
functions without having to manually polyfill those functions.

## License

MIT

[webpack]: http://webpack.github.io/ "webpack"
[cs]: https://webpack.github.io/docs/code-splitting.html "Code Splitting"
[`require.ensure`]: https://webpack.github.io/docs/code-splitting.html#require-ensure "`require.ensure`"
[`require.include`]: https://webpack.github.io/docs/code-splitting.html#require-include "`require.include`"
