const { response } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const fetch = require("node-fetch");

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    console.log('GOT PINGED!');
    return res.json('test');
});

app.get('/grades', function(req, res) {
    var data;
    fetch('https://h4nk1vdycb.execute-api.us-east-2.amazonaws.com/prod?course=121')
        .then(res => res.json())
        .then(res => {data = res})
        .then(() => {
            res.json(data);
        })
        .catch(err => console.log(err));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening to port ' + port + '!');