"use strict";
/**
 * Created by NguyenTrung on 16/3/17.
 */
const express_1 = require('express');
const UtilsTS_1 = require("../Common/UtilsTS");
const ReturnCode_1 = require("../Common/ReturnCode");
const TransactionController_1 = require("../Controller/TransactionController");
const transaction = express_1.Router();
var transController = new TransactionController_1.TransactionController();
transaction.post('/get', function (req, res, next) {
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
            transController.getTransactionsByUserId(data, function (err, result) {
                res.send(JSON.stringify(result));
            });
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transaction;
//# sourceMappingURL=transaction.js.map