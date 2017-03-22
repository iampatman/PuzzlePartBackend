"use strict";
const express_1 = require('express');
const SubscriptionController_1 = require('../Controller/SubscriptionController');
const TransactionController_1 = require("../Controller/TransactionController");
const index = express_1.Router();
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