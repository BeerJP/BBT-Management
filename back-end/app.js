const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "rsw_management"
});


app.listen(5000, () => {
    console.log("Yey, your server is running on port 3001");
});
// app.get('/', (req, res) => {
//     res.send("Hello World !");
// });

// app.use(express.static(__dirname + "/public"));

// app.listen(5000, () => {
//     console.log('Server started successfully');
// });