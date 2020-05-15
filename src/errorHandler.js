const defaultTransformer = ({ err, req, res, responseBody }) => responseBody;

export default ({ debug = false, transform = defaultTransformer } = {}) => (err, req, res, next) => {
  const statusCode = err.httpStatus || 500
  let responseBody = {
    message: err.message,
    details: err.details
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
    responseBody.debug = {
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
    responseBody.message = 'Could not parse JSON body.'
  }
  responseBody = transform({ err, req, res, responseBody });
  res.status(statusCode).json(responseBody)
}
