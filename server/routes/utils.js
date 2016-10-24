exports.style = {
  method: 'GET',
  path: '/src/styles/{path*}',
  handler: {
    directory: {
      path: './client/src/styles',
      listing: false,
      index: false
    }
  }
};

exports.police = {
  method: 'GET',
  path: '/static/police/{path*}',
  handler: {
    directory: {
      path: './client/static/police',
      listing: false,
      index: false
    }
  }
};

exports.img = {
  method: 'GET',
  path: '/img/{path*}',
  handler: {
    directory: {
      path: './client/static/img',
      listing: false,
      index: false
    }
  }
};

exports.scripts = {
  method: 'GET',
  path: '/src/login/{path*}',
  handler: {
    directory: {
      path: './client/src/login',
      listing: false,
      index: false
    }
  }
};
