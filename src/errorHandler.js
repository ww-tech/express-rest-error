const defaultHandler = (err) => ({
  message: err.message,
  details: err.details
});

export default ({ debug = false, onError = defaultHandler } = {}) => (err, req, res, next) => {
  const statusCode = err.httpStatus || 500
  const error = onError(err)
  
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
