const {
  validationError,
  errorHandler
} = require('..')

const express = require('express')
const supertest = require('supertest')

const app = express()

app.get('/', (req, res, next) => {
  try {
    throw validationError()
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler({ debug: true }))

const server = app.listen(3333, () => {})

afterAll(done => {
  server.close(done)
})

test('GET /', done => {
  supertest(app)
    .get('/')
    .expect(400)
    .expect(res => {
      if (res.body.debug.statusCode !== 400) throw new Error('wrong debug.statusCode')
    })
    .end(done)
})
