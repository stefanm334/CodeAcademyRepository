
var express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require("fs");

var rawdata = fs.readFileSync("web-api/json.json");
var json = JSON.parse(rawdata);
// console.log(json)



app.get('/read', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'web-api/data.json'));
    let student = JSON.parse(rawdata);
    res.status(200).send(student);
});

app.get('/write', (req, res) => {
    let newStudent = {
        name: req.query.name
    };

    let data = JSON.stringify(newStudent);
    fs.writeFileSync(path.join(__dirname, 'web-api/data.json'), data);
    res.status(201).send(newStudent);
});

app.get('/users', (req, res) => {
    // res.status(200).send("Get All users");
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    // res.status(200).send("Get user with id = " + req.params.id);
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    let currentUser = users.filter(x => x.id == req.params.id)
    res.status(200).send(currentUser[0]);
});

app.post('/users', (req, res) => {
    // res.send("Create user");
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    users.push(req.body);

    let data = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);

    res.status(201).send("User has been created!");
});


app.put('/users/:id', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    // console.log(users)
    let currentUser = users.filter(x => x.id == req.params.id)
    // console.log(currentUser)
    let updatedUser = {
        id: currentUser[0].id,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        age: req.body.age,
        isActive: req.body.isActive
    }
    // console.log(updatedUser)

    users.splice(currentUser[0].id - 1, 1, updatedUser);
    let data = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send(users[currentUser[0].id - 1])

});

app.patch('/users/:id', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    // console.log(users)
    let currentUser = users.filter(x => x.id == req.params.id);
    // console.log(currentUser[0].name)
    if (req.body.name != undefined) {
        currentUser[0].name = req.body.name
    }
    if (req.body.email != undefined) {
        currentUser[0].email = req.body.email
    }
    if (req.body.surname != undefined) {
        currentUser[0].surname = req.body.surname
    }
    if (req.body.age != undefined) {
        currentUser[0].age = req.body.age
    }
    if (req.body.isActive != undefined) {
        currentUser[0].isActive = req.body.isActive
    }

    
    users.splice(currentUser[0].id-1,1,currentUser[0]);
    let data = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send(users[currentUser[0].id-1])
});


app.delete('/users/:id', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    
    let currentUser = users.filter(x => x.id == req.params.id);

    users.splice(currentUser[0].id-1,1);
    let data = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send("Deleted User")

});








var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});
