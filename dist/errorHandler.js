"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var defaultInterceptor = function defaultInterceptor(err) {
  return err;
};

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? defaultInterceptor : _ref$onError;

  return function (err, req, res, next) {
    var statusCode = err.httpStatus || 500;
    var error = {
      message: err.message,
      details: err.details
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

    error = onError(error, err);
    res.status(statusCode).json(error);
  };
};

exports["default"] = _default;