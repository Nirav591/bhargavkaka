var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello Nirav!');
});
app.listen(6340, function () {
  console.log('Example app listening on port 6340!');
});