//adds express to file
var express = require('express');
var app = express();
var http = require('http');
var exphbs  = require('express-handlebars');
var giphy = require('giphy-api')();


//sets up handlebars engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//access public file that is the link to the css
app.use(express.static('public'));


//listens(checks for url), returns response(image)
app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
});

/* queryString works when passed in to giphy search,
   but req.query.term doesn't when its passed in. */
app.get('/', function (req, res) {
    var queryString = req.query.term;

    //have to check for when the term is undefined
    if (req.query.term == undefined) {
        queryString = 'puppies';
    }
  giphy.search(queryString, function (err, response) {
    res.render('home', {gifs: response.data});
  });
});
// app.get('/', function (req, res) {
//     console.log(req.query.term);
//     var queryString = req.query.term;
//     var term = encodeURIComponent(queryString);
//     var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'
//
//     http.get(url, function(response){
//         response.setEncoding('utf8');
//
//         var body = '';
//
//         response.on('data', function(d) {
//             body+= d;
//         });
//
//          response.on('end', function(){
//              var parsed = JSON.parse(body);
//              res.render('home', {gifs: parsed.data})
//          });
//     });
// });

//starts web server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
