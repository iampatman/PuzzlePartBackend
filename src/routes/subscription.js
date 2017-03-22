"use strict";
/**
 * Created by NguyenTrung on 16/3/17.
 */
const express_1 = require('express');
const SubscriptionController_1 = require("../Controller/SubscriptionController");
const ReturnCode_1 = require("../Common/ReturnCode");
const UtilsTS_1 = require("../Common/UtilsTS");
const Transaction_1 = require("../model/Transaction");
const subscription = express_1.Router();
var subController = new SubscriptionController_1.SubscriptionController();
subscription.post('/getlist', function (req, res, next) {
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
subscription.post('/getdetailbyid', function (req, res, next) {
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
subscription.post('/purchase', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    let transaction = new Transaction_1.Transaction();
    transaction.user_id = parseInt(data.user_id);
    transaction.pricing_id = parseInt(data.pricing_id);
    transaction.subscription_id = parseInt(data.subscription_id);
    transaction.discount_id = parseInt(data.discount_id);
    let sessionID = data.sessionID;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS_1.UtilsTS.validateChecksum([transaction.user_id, transaction.pricing_id, transaction.subscription_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({ returnCode: ReturnCode_1.ReturnCode.CHECKSUM_INCORRECT }));
        }
        else {
            subController.subscribe(data, function (result, data) {
                res.send(JSON.stringify({ returnCode: result, transaction: data }));
            });
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = subscription;
//# sourceMappingURL=subscription.js.map