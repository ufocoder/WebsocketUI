import 'babel-polyfill'

var context = require.context('./tests', true, /\.(js|jsx)$/);
context.keys().forEach(context);
