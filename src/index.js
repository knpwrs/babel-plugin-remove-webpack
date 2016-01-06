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
        const { callee, arguments: args } = node;
        // Is this a require.ensure call?
        if (!(callee.type === 'MemberExpression'
        && callee.object.name === 'require'
        && callee.property.name === 'ensure')) {
          return;
        }
        // Do we have at least two arguments?
        if (args.length < 2) {
          return;
        }
        // Are the first two arguments the expected type?
        if (!(t.isArrayExpression(args[0]) && t.isFunctionExpression(args[1]))) {
          return;
        }
        // TRANSFORM!
        // Remove require.ensure wrapper
        path.replaceWith(t.callExpression(args[1], []));
      },
    },
  };
}
