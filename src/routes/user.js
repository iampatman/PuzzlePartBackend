"use strict";
const express_1 = require('express');
const UserController_1 = require("../Controller/UserController");
const User_1 = require("../model/User");
const UtilsTS_1 = require("../Common/UtilsTS");
const ReturnCode_1 = require("../Common/ReturnCode");
const user = express_1.Router();
var userController = new UserController_1.UserController();
/* GET users listing. */
// users.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// users.get('/user', function(req, res, next) {
//   res.render('index', { title: 'Visual Studio Code!' });
// });
user.post('/register', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let mobilePhone = data.mobilePhone;
    let user = new User_1.User(mobilePhone);
    user.password = data.password;
    user.name = data.name;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([mobilePhone, user.password, user.name], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            userController.registerUser(user, function (err, result) {
                res.send(result);
            });
        }
    });
});
user.post('/login', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let mobilePhone = data.mobilePhone;
    let password = data.password;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([mobilePhone, password], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            userController.login(mobilePhone, password, function (err, result) {
                res.send(result);
            });
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = user;
//# sourceMappingURL=user.js.map