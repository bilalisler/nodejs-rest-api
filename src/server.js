'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var bookService = require('./service/bookService');

var app = express();
app.set("port", process.env.PORT || 4000);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
}));

app.get('/api/books', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(bookService.list()));
})

app.get('/api/book/:id', function (req, res) {
   let response = bookService.checkBook(req.params.id)

   if(response === null){
      res.writeHead(404, {'Content-Type': 'application/json'});
      response = { "message" : "book with id:" + req.params.id + " was not found" };
   }else{
      res.writeHead(200, {'Content-Type': 'application/json'});
   }

   res.end(JSON.stringify(response));
})

app.put('/api/book/create', function (req, res) {
   let requestBook = req.body;

   let response = {error: [],book: {}};
   let errors = bookService.validate(requestBook);

   if(errors.length > 0){
      response.error = errors;
      res.writeHead(400, {'Content-Type': 'application/json'});
   }else{
      response.book = requestBook;
      // TODO: add book in books json

      res.writeHead(200, {'Content-Type': 'application/json'});
   }

   res.end(JSON.stringify(response));
})

app.post('/', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is POST method." }
   console.log(response);
   res.end(JSON.stringify(response));
})



app.delete('/', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is DELETE method." }
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(app.get("port"), function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Node.js API app listening at http://%s:%s", host, port)

})
