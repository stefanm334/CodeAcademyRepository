var express = require('express');
const actions = require('./actions');
var routes = express.Router();


routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPost);
routes.post('/', actions.createPost);
routes.put('/:id', );
routes.patch('/:id', );
routes.delete('/:id', );
module.exports = routes;