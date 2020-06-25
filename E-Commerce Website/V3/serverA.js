let express = require('express');
let app = express();
const itemData = require('./js/itemData');

app.get('/favicon.ico', (req, res) => { res.status(204).end(); });

app.get('/getItems', function(req, res) {
  res.json(itemData); // Return the data as JSON encoded data
});

// Match all unmatched URLs to the files in "static" subfolder.
app.use(express.static('static'));


app.listen(8080);
