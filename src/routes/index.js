"use strict";
const express_1 = require('express');
const User_1 = require("../model/User");
const UserController_1 = require('../Controller/UserController');
const SubscriptionController_1 = require('../Controller/SubscriptionController');
const Transaction_1 = require("../model/Transaction");
const UtilsTS_1 = require("../Common/UtilsTS");
const ReturnCode_1 = require("../Common/ReturnCode");
const TransactionController_1 = require("../Controller/TransactionController");
const index = express_1.Router();
var userController = new UserController_1.UserController();
var subController = new SubscriptionController_1.SubscriptionController();
var transController = new TransactionController_1.TransactionController();
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
    let mobilePhone = data.mobilePhone;
    let password = data.password;
    let name = data.name;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([mobilePhone, password, name], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            let user = new User_1.User(mobilePhone);
            user.password = password;
            user.name = name;
            userController.registerUser(user, function (result) {
                res.send(JSON.stringify({
                    'returnCode': result
                }));
            });
        }
    });
});
index.post('/user/login', function (req, res, next) {
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
                if (err == null) {
                    res.send(JSON.stringify(result));
                }
            });
        }
    });
});
index.post('/subscription/getlist', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let username = data.username;
    let sessionID = data.sessionID;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([username, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            subController.getSubscriptionItemList(data, function (error, result) {
                if (error == null) {
                    res.send(JSON.stringify(result));
                }
                else {
                    res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.EXCEPTION }));
                }
            });
        }
    });
});
index.post('/subscription/getdetailbyid', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let username = data.username;
    let sessionID = data.sessionID;
    let subscription_id = data.subscription_id;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([username, sessionID, subscription_id], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            subController.getSubscriptionItemDetails(data, function (error, result) {
                if (error == null) {
                    res.send(JSON.stringify(result));
                }
                else {
                    res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.EXCEPTION }));
                }
            });
        }
    });
});
index.post('/subscription/subscribe', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let transaction = new Transaction_1.Transaction();
    transaction.user_id = parseInt(data.user_id);
    transaction.pricing_id = parseInt(data.pricing_id);
    transaction.subscription_id = parseInt(data.subscription_id);
    let sessionID = data.sessionID;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([transaction.user_id, transaction.pricing_id, transaction.subscription_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            subController.subscribe(transaction, function (result, data) {
                res.send(JSON.stringify({ returnCode: result, transaction: data }));
            });
        }
    });
});
index.post('/transaction/get', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let user_id = parseInt(data.user_id);
    let sessionID = data.sessionID;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([user_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            transController.getTransactionsByUserId(user_id, function (err, result) {
                res.send(JSON.stringify(result));
            });
        }
    });
});
index.get('/pricing', function (req, res, next) {
    let id = parseInt(req.query.id);
    subController.getPricingDetails(id, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result));
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
//# sourceMappingURL=index.js.map