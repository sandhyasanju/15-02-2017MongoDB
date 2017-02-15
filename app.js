var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");

var url = "mongodb://localhost:27017/employee";
mongoClient.connect(url,function(error,db){
    // assert.equal(null, error);
    console.log("connected to server");
    // db.collection("test",function(error,collection){
      
    // })
    var data = db.collection("employee").find( );

    data.each(function(error,doc){
      // console.log(doc);
    });
    // db.close();
});

app.post("/register",function(request,response){
  var body = request.body;
  console.log(body);
  mongoClient.connect(url,function(error,db){
    db.collection("employee").insert({
    name: request.body.username,
    id: request.body.id,
    age: request.body.age,
    city: request.body.city
  })
  })
  response.end("registered successfully");
})

app.get("/details",function(request,response){
  console.log("hello world");
  // response.write()
  mongoClient.connect(url,function(error,db){
    var data = db.collection("employee").find( );
    data.each(function(error,docs){
      console.log(docs);
      // var str = "name " + docs.name + "\n" + "id" + docs.id + "\n" + "age" + docs.age + "\n" + "city" + docs.age;
      response.end("docs "+docs.name);
      // console.log(str);
    })
    })
})
app.listen(3030);

module.exports = app;
