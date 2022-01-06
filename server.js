const { response } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const fetch = require("node-fetch");

// app.enable('trust proxy')
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    console.log('GOT PINGED!');
    return res.json('test');
});

app.get('/grades', function (req, res) {
    var data;
    // WIP feature :D
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/jlcc', function (req, res) {
    console.log('JLCC')
    res.sendFile(path.join(__dirname, 'build', 'jlcc.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening to port ' + port + '!');
