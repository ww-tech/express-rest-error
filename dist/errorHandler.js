"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug;

  return function (err, req, res, next) {
    var statusCode = 500;

    if (err.validationError) {
      statusCode = 400;
    }

    if (err.authRequired) {
      statusCode = 401;
    }

    if (err.accessDenied) {
      statusCode = 403;
    }

    if (err.notFound) {
      statusCode = 404;
    }

    var error = {
      message: err.message
    };
    var stack;

    if (err.stack) {
      stack = err.stack.split('\n');
      stack.shift();
      stack = stack.filter(function (line) {
        return line.indexOf('node_modules') === -1;
      }).map(function (line) {
        return line.trim();
      });
    }

    if (debug) {
      error.debug = {
        stack: stack,
        request: {
          method: req.method,
          uri: req.originalUrl,
          body: req.body
        },
        statusCode: statusCode
      };
    } // body-parser error


    if (err.body) {
      error.message = 'Could not parse JSON body.';
    }

    res.status(statusCode).json(error);
  };
};

exports["default"] = _default;