
var express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require("fs");

var rawdata = fs.readFileSync("web-api/json.json");
var json = JSON.parse(rawdata);
// console.log(json)

var port = process.env.PORT || 8080;
app.listen(port, () => {
    // console.log(`API is listenig on port ${port}!`);
});

app.get('/read', (req, res) => {
    res.status(200).send(json);
});

app.get('/write', (req, res) => {
    let data = req.query
    fs.writeFileSync("web-api/json.json" , JSON.stringify(data))
    res.status(200).send("Success")
    
});