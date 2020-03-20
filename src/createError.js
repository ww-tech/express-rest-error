// 400
export const validationError = (message) => {
  const err = new Error(message || 'Validation error.')
  err.validationError = true
  return err
}

// 401
export const authRequired = (message) => {
  const err = new Error(message || 'Authentication required.')
  err.authRequired = true
  return err
}

// 403
export const accessDenied = (message) => {
  const err = new Error(message || 'Access denied.')
  err.accessDenied = true
  return err
}

// 404
export const notFound = (message) => {
  const err = new Error(message || 'Not found.')
  err.notFound = true
  return err
}