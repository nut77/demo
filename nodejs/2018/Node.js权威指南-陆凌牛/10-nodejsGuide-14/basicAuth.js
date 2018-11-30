const express = require('express');
const app = express();

app.use(express.basicAuth('user1', 'az123456'));
app.get('/', (req, res) => {

   res.send('hello~');
});
app.listen(2000, 'localhost');