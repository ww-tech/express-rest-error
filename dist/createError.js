"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.accessDenied = exports.authRequired = exports.validationError = void 0;

// 400
var validationError = function validationError(message) {
  var err = new Error(message || 'Validation error.');
  err.validationError = true;
  return err;
}; // 401


exports.validationError = validationError;

var authRequired = function authRequired(message) {
  var err = new Error(message || 'Authentication required.');
  err.authRequired = true;
  return err;
}; // 403


exports.authRequired = authRequired;

var accessDenied = function accessDenied(message) {
  var err = new Error(message || 'Access denied.');
  err.accessDenied = true;
  return err;
}; // 404


exports.accessDenied = accessDenied;

var notFound = function notFound(message) {
  var err = new Error(message || 'Not found.');
  err.notFound = true;
  return err;
};

exports.notFound = notFound;