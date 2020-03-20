export default ({ debug = false } = {}) => (err, req, res, next) => {
  let statusCode = 500
  if (err.validationError) {
    statusCode = 400
  }
  if (err.authRequired) {
    statusCode = 401
  }
  if (err.accessDenied) {
    statusCode = 403
  }
  if (err.notFound) {
    statusCode = 404
  }
  const error = {
    message: err.message
  }
  let stack
  if (err.stack) {
    stack = err.stack.split('\n')
    stack.shift()
    stack = stack
      .filter(line => line.indexOf('node_modules') === -1)
      .map(line => line.trim())
  }
  if (debug) {
    error.debug = {
      stack,
      request: {
        method: req.method,
        uri: req.originalUrl,
        body: req.body
      },
      statusCode
    }
  }
  // body-parser error
  if (err.body) {
    error.message = 'Could not parse JSON body.'
  }
  res.status(statusCode).json(error)
}
