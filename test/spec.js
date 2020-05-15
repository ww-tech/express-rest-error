const {
  validationError,
  accessDenied,
  authRequired,
  notFound,
  customError,
  errorHandler
} = require('..')

const express = require('express')
const supertest = require('supertest')

const app = express()
const currentTime = Date.now();
const teapotError = () =>
  customError("I'm a teapot", null, 418);
const tooEarlyError = () =>
  customError("It is too early for errors", {
    time: currentTime
  }, 425);

app.get('/:test', (req, res, next) => {
  try {
    switch (req.params.test) {
      case 'invalid': throw validationError()
      case 'invalidCustom': throw validationError('Custom error message')
      case '401': throw authRequired()
      case '403': throw accessDenied()
      case '404': throw notFound()
      case '418': throw teapotError()
      case '425': throw tooEarlyError()
    }
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler())

const server = app.listen(3333, () => {})

afterAll(done => {
  server.close(done)
})

test('GET /200', done => {
  supertest(app)
    .get('/200')
    .expect(200, { success: true })
    .end(done)
})

test('GET /invalid', done => {
  supertest(app)
    .get('/invalid', { message: 'Validation error.' })
    .expect(400)
    .end(done)
})

test('GET /invalidCustom', done => {
  supertest(app)
    .get('/invalidCustom')
    .expect(400)
    .expect(res => {
      if (res.body.message !== 'Custom error message') throw new Error('wrong error message')
    })
    .end(done)
})

test('GET /401', done => {
  supertest(app)
    .get('/401')
    .expect(401)
    .end(done)
})

test('GET /403', done => {
  supertest(app)
    .get('/403')
    .expect(403)
    .end(done)
})

test('GET /404', done => {
  supertest(app)
    .get('/404')
    .expect(404)
    .expect(res => {
      if (res.body.debug) throw new Error('debug should not be visible')
    })
    .end(done)
})

test('GET /418', done => {
  supertest(app)
    .get('/418')
    .expect(418)
    .end(done)
})


test('GET error with details', done => {
  supertest(app)
    .get('/425')
    .expect(425)
    .expect(res => {
      if (res.body.details.time !== currentTime)
        throw new Error('the error.details were not provided')
    })
    .end(done)
})
