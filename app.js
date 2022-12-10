const express = require('express');
const path = require('path');
const http = require('http');
const pug = require('pug'), fs = require('fs')
const handlebars = require('handlebars');


const app = express();
app.set('appName', 'hello-advanced');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.all('*', (req, res) => {
  res.render('index')
})

app.listen(app.get('port'), (req, res) => {
  console.log(process.argv);

})

