# express-rest-error

Clean error throwing/handling for Express REST apps using the [Service layer pattern](https://en.wikipedia.org/wiki/Service_layer_pattern)

## Install

```
npm i -S express-rest-error
```

## Example

```js
import { validationError, errorHandler } from 'express-rest-error'
import express from 'express'

const app = express()

async function helloService(name) {
  if (!name) throw validationError('Must specify name.')
  return `Hello ${name}!`
}

app.get('/hello', async (req, res, next) => {
  try {
    const result = await helloService(req.query.name)
    res.json({ result })
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler({ debug: true }))
```

## Throwing Errors

You may throw any of the following types of errors with an optional error `message`.

### `throw validationError( message, details )`

- Appropriate for missing required fields or invalid input.
- Sets the response status code to `400`.

### `throw authRequired( message, details )`

- Appropriate when token or authentication is missing.
- Sets the response status code to `401`.

### `throw accessDenied( message, details )`

- Appropriate when the user making the request does not have permission to the resource.
- Sets the response status code to `403`.

### `throw notFound( message, details )`

- Appropriate when the requested resource does not exist.
- Sets the response status code to `404`.


### `throw customError( message, details, httpStatus )`

- Appropriate for when custom errors are necessary

## Handling Errors

This error handler will detect which type of error was thrown and set the status code accordingly.

Note: You should define the error handler last, after all other middleware.

```js
app.use(errorHandler({ debug: true }))
```

### Error Handler Options

- `debug` {Boolean} - (optional) returns debug output (stack trace, request data)
- `transform` {Function} - (optional) intercept error before sending to client


```js
app.use(errorHandler({
  debug: true,
  transform: ({ err, req, res, responseBody }) => {
    res.setHeader('X-Warning', 'Stop sending bad requests.')
    return responseBody;
  }
}))
```
