export const customError = (message, details) => {
  const err = new Error(message);
  err.details = details;
  return err;
}

export const validationError = (message = 'Validation error.',  details) => {
  const err = customError(message, details);
  err.httpStatus = 400;
  return err;
}

export const authRequired = (message = 'Authentication required.', details) => {
  const err = customError(message, details)
  err.httpStatus = 401;
  return err;
}

export const accessDenied = (message = 'Access denied.', details) => {
  const err = customError(message, details);
  err.httpStatus = 403;
  return err;
}

export const notFound = (message = 'Not found.', details) => {
  const err = customError(message, details);
  err.httpStatus = 404;
  return err
}
