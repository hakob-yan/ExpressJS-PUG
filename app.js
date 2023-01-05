require('dotenv').config();
const path = require('path');
const http = require('http')

const express = require('express');
const expressSession = require('express-session')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const routes = require('./routes');
const middleware = require('./middleware')
const pug = require('pug');

const dbUrl = process.env.DB_URL
const PORT = process.env.PORT
const VIEWS = path.join(__dirname, 'views')

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl).then(() => console.log('Connected!'));

const app = express();
app.set('appName', 'hello-advanced');
app.set('port', PORT);
app.set('views', VIEWS);
app.set('view engine', 'pug');
app.use(express.static('public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({ secret: '2C44774A-D649-4D44-9535-46E296EF984F', saveUninitialized: true, resave: false }))

app.get('/', middleware.authenticate, routes.home)
app.get('/login', routes.login)
app.get('/logout', routes.logout)
app.get('/register', routes.register)
app.post('/register', routes.createUser)
app.get('/post', middleware.authenticate, middleware.authorize, routes.post)
app.post('/create/post', middleware.authorize, routes.createPost)
app.get('/admin', middleware.authorize, routes.admin)
app.post('/article/publish/:id', routes.articlePublish)
app.post('/article/delete/:id', routes.articleDelete)
app.post('/login', routes.authenticate)
app.get('/article/:id', routes.article)

const server = http.createServer(app)
const boot = function () {
  server.listen(app.get('port'), function () {
    console.info(`Express server listening on port${app.get('port')}`)
  })
}
const shutdown = function () {
  server.close(process.exit)
}
if (require.main === module) {
  boot()
} else {
  console.info('Running app as a module')
  exports.boot = boot
  exports.shutdown = shutdown
  exports.port = app.get('port')
}