exports.index = {
  handler: function (request, reply) {
    reply('Index');
  }
}

exports.login = {
  handler(request, reply) {
    reply.file('./src/login.html');
  }
}
