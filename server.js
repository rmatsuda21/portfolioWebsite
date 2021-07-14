const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    console.log('GOT PINGED!');
    return res.json('test');
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening to port ' + port + '!');