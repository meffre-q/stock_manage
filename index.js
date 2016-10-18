'use strict';

const Hapi = require('hapi');
const Routes = require('./routes');
const Config = require('./config')
const User = require('./models/user').User;

const server = new Hapi.Server();
const redirect = {
    "401": {
        "redirect": "/login"
    }
};

server.connection({ port: 8080 });

const validate = (decoded, request, callback) => {
    if (!User.findOne({ 'token': decoded.id })) {
        return callback(null, false);
    }
    else {
        return callback(null, true);
    }
};

//server.register([{ register: require('hapi-error'), options: redirect }, require('hapi-auth-jwt2'), require('inert')], (err) => {
server.register([require('hapi-auth-jwt2'), require('inert')], (err) => {
    server.auth.strategy('jwt', 'jwt',
    {   key: Config.server.key,
        validateFunc: validate,
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
