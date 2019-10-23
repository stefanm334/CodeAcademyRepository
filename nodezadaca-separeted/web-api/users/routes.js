var express = require('express');
const actions = require('./actions');
const { is18OrOlder } = require('../helper');
const { emailValidator } = require('../helper');
var routes = express.Router();

routes.get('/', actions.getAllUsers);
routes.get('/:id', actions.getSpecificUser);
routes.post('/', is18OrOlder, emailValidator, actions.createUser);
routes.put('/:id', actions.updateUser);
routes.patch('/:id', actions.patchUser);
routes.delete('/:id', actions.deleteUser);

module.exports = routes;