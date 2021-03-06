var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()
var index = require('./routes/index')(app)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/site-redesign/', express.static(path.join(__dirname, '/../src/site-redesign')))
app.use('/assets/', express.static(path.join(__dirname, '/../src/library/assets')))

app.use(function (req, res, next) {
  res.die = function (message, code) {
    res.send(message, code || 500)
  }
  next()
})

app.use('/', index)

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
