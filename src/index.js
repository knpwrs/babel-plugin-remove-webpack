/**
 * Determines if a given node represents a call to prop on object.
 * @param  {Object} node The ast node.
 * @param  {string} obj  The object identity.
 * @param  {string} prop The property identity.
 * @return {Boolean} `true` if node represents `obj[prop]()`. `false` otherwise.
 */
function isMemberCall({ callee }, obj, prop) {
  return callee.type === 'MemberExpression'
    && callee.object.name === obj
    && callee.property.name === prop;
}

/**
 * Babel plugin which replaces `require.ensure` calls with self-executing anonymous functions.
 * @param {Object} babel The current babel object
 * @param {Object} babel.types babel-types
 * @return {Object} Babel visitor.
 */
export default function ({ types: t }) {
  return {
    visitor: {
      /**
       * CallExpression visitor.
       * @param {Object} path The path object from Babel.
       */
      CallExpression(path) {
        const { node } = path;
        const { arguments: args } = node;
        
        // Is this a require.include call?
        if (isMemberCall(node, 'require', 'include')) {
          // Do we have exactly one argument?
          if (args.length !== 1) {
            return;
          }
          // Is that argument a string?
          if (!t.isStringLiteral(args[0])) {
            return;
          }
          // TRANSFORM!
          // Remove require.include call.
          path.remove();
          return;
        }
        
        // Is this a require.ensure call?
        if (isMemberCall(node, 'require', 'ensure')) {
          // Do we have at least two arguments?
          if (args.length < 2) {
            return;
          }
          // Are the first two arguments the expected type?
          const [arr, fn] = args;
          if (!(t.isArrayExpression(arr) && t.isFunctionExpression(fn))) {
            return;
          }
          // TRANSFORM!
          // Remove require.ensure wrapper.
          fn.params = [];
          path.replaceWith(t.callExpression(fn, []));
        }
      },
    },
  };
}
