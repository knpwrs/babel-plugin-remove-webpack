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
## Motivation

`require.ensure` is great for code-splitting but can cause issues when writing
universal JavaScript. The typical solution is to use a synchronous
`require.ensure` polyfill. In order for [webpack] code splitting to work properly
this polyfill has to be defined in each file where `require.ensure` is used.

This plugin makes it possible to run code which uses [webpack]-specific
functions without having to manually polyfill those functions.

## License

MIT

[webpack]: http://webpack.github.io/ "webpack"
