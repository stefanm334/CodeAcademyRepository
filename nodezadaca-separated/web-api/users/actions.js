const fs = require('fs');
const path = require('path');
const connection = require('../database');


getAllUsers = async(req, res) => {
    // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    // let users = JSON.parse(rawdata);
    // res.status(200).send(users);
    
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }

};

getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}


getSpecificUser = async(req, res, next) => {
    const userId = req.params.id;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }

    try {
        const user = await getSpecificUserQuery(userId);
        res.status(200).send(user[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

createUser = (req, res, next) => {

    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    users.push(req.body);

    let data = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);

    res.status(201).send("User has been created!");

};

updateUser = (req, res, next) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    let currentUser = users.filter(x => x.id == req.params.id)
    let updatedUser = {
        id: currentUser[0].id,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        age: req.body.age,
        isActive: req.body.isActive
    }
    users.splice(currentUser[0].id - 1, 1, updatedUser);
    let data = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send(users[currentUser[0].id - 1])
}

patchUser = (req, res) => {

    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    let currentUser = users.filter(x => x.id == req.params.id);
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

    users.splice(currentUser[0].id - 1, 1, currentUser[0]);
    let data = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send(users[currentUser[0].id - 1])
}

deleteUser = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    let currentUser = users.filter(x => x.id == req.params.id);

    users.splice(currentUser[0].id - 1, 1);
    let data = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    res.status(200).send("Deleted User")
}



module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser
}