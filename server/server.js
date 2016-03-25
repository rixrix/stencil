var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var http = require('http');
var path = require('path');

/******************************************************************************
 * server configs
 ******************************************************************************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('port', 9001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.set("layout extractScripts", true);

/******************************************************************************
 * start server
 ******************************************************************************/
var server = app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/******************************************************************************
 * routes
 ******************************************************************************/
 
 // main
app.get('/', function(req, res) {
   res.render('pages/main', { layout: 'layout'});
});

// catch invalid URL
app.get('*', function(req, res) {
    res.redirect('/');
});