export const customError = (message, details, httpStatus) => {
  const err = new Error(message);
  err.details = details;
  err.httpStatus = httpStatus;
  return err;
}

export const validationError = (message = 'Validation error.',  details) => 
  customError(message, details, 400)

export const authRequired = (message = 'Authentication required.', details) => 
  customError(message, details, 401)

export const accessDenied = (message = 'Access denied.', details) => 
  customError(message, details, 403);

export const notFound = (message = 'Not found.', details) => 
  customError(message, details, 404);
