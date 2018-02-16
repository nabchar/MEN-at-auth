import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import mongoose = from('mongoose');

let app = express();

//connect to MongoDB
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


app.use(express.static(__dirname + '/template'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});

app.listen(9000, function () {
    console.log('Express app listening on port 9000')
});
