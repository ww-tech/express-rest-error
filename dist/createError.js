"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.accessDenied = exports.authRequired = exports.validationError = exports.customError = void 0;

var customError = function customError(message, details, httpStatus) {
  var err = new Error(message);
  err.details = details;
  err.httpStatus = httpStatus;
  return err;
};

exports.customError = customError;

var validationError = function validationError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Validation error.';
  var details = arguments.length > 1 ? arguments[1] : undefined;
  return customError(message, details, 400);
};

exports.validationError = validationError;

var authRequired = function authRequired() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Authentication required.';
  var details = arguments.length > 1 ? arguments[1] : undefined;
  return customError(message, details, 401);
};

exports.authRequired = authRequired;

var accessDenied = function accessDenied() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Access denied.';
  var details = arguments.length > 1 ? arguments[1] : undefined;
  return customError(message, details, 403);
};

exports.accessDenied = accessDenied;

var notFound = function notFound() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Not found.';
  var details = arguments.length > 1 ? arguments[1] : undefined;
  return customError(message, details, 404);
};

exports.notFound = notFound;