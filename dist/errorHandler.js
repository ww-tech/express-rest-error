"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var defaultTransformer = function defaultTransformer(_ref) {
  var err = _ref.err,
      req = _ref.req,
      res = _ref.res,
      responseBody = _ref.responseBody;
  return responseBody;
};

var _default = function _default() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$debug = _ref2.debug,
      debug = _ref2$debug === void 0 ? false : _ref2$debug,
      _ref2$transform = _ref2.transform,
      transform = _ref2$transform === void 0 ? defaultTransformer : _ref2$transform;

  return function (err, req, res, next) {
    var responseBody = {
      message: err.message,
      details: err.details
    }; // body-parser error

    if (err.body) {
      responseBody.message = 'Could not parse JSON body.';
    }

    responseBody = transform({
      err: err,
      req: req,
      res: res,
      responseBody: responseBody
    });
    var statusCode = err.httpStatus || 500;

    if (err.stack && debug) {
      var stack = err.stack.split('\n');
      stack.shift();
      stack = stack.filter(function (line) {
        return line.indexOf('node_modules') === -1;
      }).map(function (line) {
        return line.trim();
      });
      responseBody.debug = {
        stack: stack,
        request: {
          method: req.method,
          uri: req.originalUrl,
          body: req.body
        },
        statusCode: statusCode
      };
    }

    res.status(statusCode).json(responseBody);
  };
};

exports["default"] = _default;