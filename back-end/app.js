const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World !");
});

app.use(express.static(__dirname + "/public"));

app.listen(5000, () => {
    console.log('Server started successfully');
});