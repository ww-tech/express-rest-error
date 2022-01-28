const defaultTransformer = ({ err, req, res, responseBody }) => responseBody;

export default ({ debug = false, transform = defaultTransformer } = {}) => (err, req, res, next) => {
  let responseBody = {
    message: err.message,
    details: err.details
  }
  // body-parser error
  if (err.body) {
    responseBody.message = 'Could not parse JSON body.'
  }
  responseBody = transform({ err, req, res, responseBody });

  const statusCode = err.httpStatus || 500;

  if (err.stack && debug) {
    let stack = err.stack.split('\n');
    stack.shift();
    stack = stack
      .filter(line => line.indexOf('node_modules') === -1)
      .map(line => line.trim());

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

  res.status(statusCode).json(responseBody)
}
