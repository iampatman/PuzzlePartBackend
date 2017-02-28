"use strict";
const express_1 = require('express');
const User_1 = require("../model/User");
const UserController_1 = require('../Controller/UserController');
const SubscriptionController_1 = require('../Controller/SubscriptionController');
const Transaction_1 = require("../model/Transaction");
const index = express_1.Router();
var userController = new UserController_1.UserController();
var subController = new SubscriptionController_1.SubscriptionController();
/* GET home page. */
index.get('/', function (req, res, next) {
    res.render('index', { title: 'Visual Studio Code!' });
});
/* GET Quick Start. */
index.get('/quickstart', function (req, res, next) {
    res.render('quickstart');
});
index.get('/user/register', function (req, res, next) {
    let user = new User_1.User("nguyentrung0904");
    console.log(user.username);
    let json = JSON.stringify(user);
    res.setHeader("content-type", "application/json");
    res.send(user);
});
index.post('/user/register', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let user = new User_1.User(data.username);
    user.password = data.password;
    userController.registerUser(user, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'result': result
        }));
    });
});
index.post('/user/login', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let username = data.username;
    let password = data.password;
    userController.login(username, password, function (err, result) {
        if (err == null) {
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(result));
        }
    });
});
index.post('/subscription/get', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let username = data.username;
    let sessionID = data.sessionID;
    subController.getSubscriptionItemList(data, function (error, result) {
        if (error == null) {
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(result));
        }
    });
});
index.post('/subscription/subscribe', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let transaction = new Transaction_1.Transaction();
    transaction.user_id = parseInt(data.user_id);
    transaction.pricing_id = parseInt(data.pricing_id);
    transaction.subscription_id = parseInt(data.subscription_id);
    subController.subscribe(transaction, function (result, data) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({ returnCode: result, transaction: data }));
    });
});
index.get('/pricing', function (req, res, next) {
    let id = parseInt(req.query.id);
    let data = JSON.parse(JSON.stringify(req.body));
    subController.getPricingDetails(id, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result));
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
//# sourceMappingURL=index.js.map