const Pages = require('./controllers/pages');
const Authentication = require('./controllers/authentication')

exports.endpoints = [
  { method: 'GET',  path: '/',          config: Pages.index             },
  { method: 'GET',  path: '/login',     config: Pages.login             },
  { method: 'POST', path: '/login',     config: Authentication.login    },
//  { method: 'GET',  path: '/logout',    config: Authentication.logout   },
  { method: 'POST', path: '/register',  config: Authentication.register },
  { method: 'GET',  path: '/src/styles/{path*}', handler: { directory: { path: './src/styles', listing: false, index: false } } },
  { method: 'GET',  path: '/police/{path*}',     handler: { directory: { path: './police',     listing: false, index: false } } },
  { method: 'GET',  path: '/img/{path*}',        handler: { directory: { path: './img',        listing: false, index: false } } },
  { method: 'GET',  path: '/src/scripts/{path*}', handler: { directory: { path: './src/scripts', listing: false, index: false } } },
];
