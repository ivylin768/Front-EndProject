let express = require('express');
let app = express(); //create an Express app object

// ------ Setup Mapping Rules ------
app.all('/', function (req, res){
   res.sendFile(__dirname + '/static/home.html');
});

app.all('/home*', function (req, res){
   res.sendFile(__dirname + '/static/home.html');
});

app.all('/listing*', function (req, res){
   res.sendFile(__dirname + '/static/listing.html');
});

// ------ map other paths to files in the sub-folder "static"
app.use(express.static("static"));

// ------ Deploy the App(i.e. the server) ------
// set the web server to listen to port 8080
app.listen(8080);
