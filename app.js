require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const routes = require('./routes');
const pug = require('pug');
const handlebars = require('handlebars');

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

app.get('/',routes.home)
app.get('/post',routes.post)
app.post('/create/post',routes.createPost)
app.get('/admin',routes.admin)
app.post('/article/publish/:id',routes.articlePublish)
app.post('/article/delete/:id',routes.articleDelete)
app.get('/article/:id',routes.article)


app.listen(app.get('port'), (req, res) => {
  console.log('App is listening to 3000');

})

