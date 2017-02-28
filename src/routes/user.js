"use strict";
const express_1 = require('express');
const users = express_1.Router();
/* GET users listing. */
users.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
users.get('/user', function (req, res, next) {
    res.render('index', { title: 'Visual Studio Code!' });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = users;
//# sourceMappingURL=user.js.map