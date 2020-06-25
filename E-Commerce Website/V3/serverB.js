let express = require('express');
let app = express();
let cors = require('cors'); //Server B is of different origin, need to enable CORS support at server B

//only script originated from server A(http://localhost:8080) can send request to server B
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['content-type','x-custom-header']
}));

const avails = [1,3,5,7,9,20,21,22,23,24,25,26,27,28,29,30];

app.get('/favicon.ico', (req, res) => { res.status(204).end(); });

let bodyPaerser = require('body-parser');
//apply JSON parser to POST request for /a3 only
app.post('/a3', bodyPaerser.json());
app.post('/a3', function(req,res){
    let selected = req.body;
    console.log(selected);
    console.log(typeof(selected));//object
    let inavails = [];

    for (let id of selected) {
        console.log(id);
        if (avails.includes(Number(id))) {
            inavails.push(id);
        }
    }

    res.send(inavails);
});

app.listen(8081);
