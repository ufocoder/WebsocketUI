var context = require.context('./tests', true, /\.jsx$/);
context.keys().forEach(context);
