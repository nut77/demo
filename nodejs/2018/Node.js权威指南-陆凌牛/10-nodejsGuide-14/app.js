const express = require('express');
const app = express();

app.get('/index.html', (req, res) => {

    res.send('你好~~');
});

app.get('/index.html/:name', (req, res) => {

    res.send(`${req.params.name}你好~~`);
});

app.get('/index.html/:id(\\d+)', (req, res) => {

    res.send(`${req.params.name}你好~~`);
});

app.listen( '8080', 'localhost');