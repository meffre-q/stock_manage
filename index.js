'use strict';

const Hapi = require('hapi');
const Routes = require('./routes');
const Config = require('./config')
const User = require('./models/user').User;

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register([require('hapi-auth-jwt'), require('inert')], (err) => {
    server.auth.strategy('jwt', 'jwt', {
        key: Config.server.key,
        verifyOptions: { algorithms: ['HS256']}
    });
    if (err) {
        throw err;
    }
    server.route(Routes.endpoints);
});
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
