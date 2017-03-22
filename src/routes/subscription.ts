/**
 * Created by NguyenTrung on 16/3/17.
 */
import {Router} from 'express';
import {SubscriptionController} from "../Controller/SubscriptionController";
import {ReturnCode} from "../Common/ReturnCode";
import {UtilsTS} from "../Common/UtilsTS";
import {Transaction} from "../model/Transaction";


const subscription = Router();
var subController = new SubscriptionController();


subscription.post('/getlist', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let username = data.username;
    let sessionID = data.sessionID;
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([username, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            subController.getSubscriptionItemList(data, function (error, result) {
                if (error == null) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send(JSON.stringify({returnCode: ReturnCode.EXCEPTION}))
                }
            })
        }
    });
});

subscription.post('/getdetailbyid', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let username = data.username;
    let sessionID = data.sessionID;
    let subscription_id = data.subscription_id;
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([username, sessionID, subscription_id], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            subController.getSubscriptionItemDetails(data, function (error, result) {
                if (error == null) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send(JSON.stringify({returnCode: ReturnCode.EXCEPTION}))
                }
            })
        }
    });
});


subscription.post('/purchase', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let transaction = new Transaction()
    transaction.user_id = parseInt(data.user_id);
    transaction.pricing_id = parseInt(data.pricing_id);
    transaction.subscription_id = parseInt(data.subscription_id);
    transaction.discount_id = parseInt(data.discount_id);
    let sessionID = data.sessionID
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([transaction.user_id, transaction.pricing_id, transaction.subscription_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            subController.subscribe(data, function (result, data) {
                res.send(JSON.stringify({returnCode: result, transaction: data}))
            })
        }
    });
});

export default subscription;
