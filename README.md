# express-rest-error

Clean error throwing/handling for Express REST apps using the [Service layer pattern](https://en.wikipedia.org/wiki/Service_layer_pattern)

## Install

```
npm i -S express-rest-error
```

## Example

```js
import { validationError, errorHandler } from '@ww-tech/express-rest-error'
import express from 'express'

const app = express()

async function helloService(name) {
  if (!name) throw validationError('Must specify name.')
  return `Hello ${name}!`
}

app.get('/hello', async (req, res, next) => {
  const result = await helloService(req.query.name).catch(next)
  res.json({ result })
})

app.use(errorHandler({ debug: true }))
```

## Throwing Errors

You may throw any of the following types of errors with an optional error `message`.

### `throw validationError( message )`

- Appropriate for missing required fields or invalid input.
- Sets the response status code to `400`. 

### `throw authRequired( message )`

- Appropriate when token or authentication is missing.
- Sets the response status code to `401`. 

### `throw accessDenied( message )` 

- Appropriate when the user making the request does not have permission to the resource.
- Sets the response status code to `403`. 

### `throw notFound( message )`

- Appropriate when the requested resource does not exist.
- Sets the response status code to `404`. 

## Handling Errors

This error handler will detect which type of error was thrown and set the status code accordingly.

Note: You should define the error handler last, after all other middleware.

```js
app.use(errorHandler({ debug: true }))
```

### Error Handler Options

`debug` {Boolean} - returns debug output (stack trace, request data)