# babel-plugin-remove-webpack

Removes [webpack]-specific functions from JavaScript code.

## `require.ensure`

`require.ensure` is replaced with self-executing anonymous functions.

```js
// Before
require.ensure(['a', 'b', 'c'], function () {
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

## `require.include`

`require.include` is removed entirely.

```js
// Before
require.include('a');

// After

```

## Motivation

`require.ensure` and `require.include` are great for code-splitting; however,
they can cause issues when writing universal JavaScript. The typical solution is
to use synchronous polyfills. In order for [webpack] code splitting to work
properly these polyfills have to be defined in each file where they are used.

This plugin makes it possible to run code which uses [webpack]-specific
functions without having to manually polyfill those functions.

## License

MIT

[webpack]: http://webpack.github.io/ "webpack"
