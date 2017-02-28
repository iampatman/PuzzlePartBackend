"use strict";
const express_1 = require('express');
const User_1 = require("../model/User");
const UserController_1 = require('../Controller/UserController');
const SubscriptionController_1 = require('../Controller/SubscriptionController');
const Transaction_1 = require("../model/Transaction");
const UtilsTS_1 = require("../Common/UtilsTS");
const ReturnCode_1 = require("../Common/ReturnCode");
const index = express_1.Router();
var userController = new UserController_1.UserController();
var subController = new SubscriptionController_1.SubscriptionController();
/* GET home page. */
// index.get('/', function (req, res, next) {
//     res.render('index', {title: 'Visual Studio Code!'});
// });
// /* GET Quick Start. */
// index.get('/quickstart', function (req, res, next) {
//     res.render('quickstart');
// });
index.post('/user/register', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let username = data.username;
    let password = data.password;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([username, password], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            let user = new User_1.User(username);
            user.password = password;
            userController.registerUser(user, function (result) {
                res.send(JSON.stringify({
                    'result': result
                }));
            });
        }
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
index.post('/transaction/get', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let user_id = parseInt(data.user_id);
    subController.getTransactionsByUserId(user_id, function (err, result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result));
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