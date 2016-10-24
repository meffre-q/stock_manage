exports.index = {
  auth: 'jwt',
  handler(request, reply) {
    return reply('Index');
  }
};

exports.login = {
  handler(request, reply) {
    return reply.file('./client/src/login/login.html');
  }
};

exports.register = {
  handler(request, reply) {
    return reply.file('./client/src/login/register.html');
  }
};
