"use strict";
var express_1 = require('express');
var User_1 = require("../model/User");
var UserController_1 = require('../Controller/UserController');
var SubscriptionController_1 = require('../Controller/SubscriptionController');
var Transaction_1 = require("../model/Transaction");
var index = express_1.Router();
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
    var user = new User_1.User("nguyentrung0904");
    console.log(user.username);
    var json = JSON.stringify(user);
    res.setHeader("content-type", "application/json");
    res.send(user);
});
index.post('/user/register', function (req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body));
    var user = new User_1.User(data.username);
    user.password = data.password;
    userController.registerUser(user, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'result': result
        }));
    });
});
index.post('/user/login', function (req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body));
    var username = data.username;
    var password = data.password;
    userController.login(username, password, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'result': result
        }));
    });
});
index.get('/subscription/get', function (req, res, next) {
    // let data = JSON.parse(JSON.stringify(req.body))
    // let username = data.username;
    // let password = data.password;
    subController.getSubscriptionItemList(function (list) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'list': list
        }));
    });
});
index.post('/subscription/subscribe', function (req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body));
    var transaction = new Transaction_1.Transaction();
    transaction.user_id = parseInt(data.user_id);
    transaction.pricing_id = parseInt(data.pricing_id);
    transaction.subscription_id = parseInt(data.subscription_id);
    subController.subscribe(transaction, function (result, data) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result));
    });
});
index.get('/pricing', function (req, res, next) {
    var id = parseInt(req.query.id);
    var data = JSON.parse(JSON.stringify(req.body));
    subController.getPricingDetails(id, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result));
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
//# sourceMappingURL=index.js.map