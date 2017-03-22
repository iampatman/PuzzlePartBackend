/**
 * Created by NguyenTrung on 16/3/17.
 */
import {Router} from 'express';
import {UtilsTS} from "../Common/UtilsTS";
import {ReturnCode} from "../Common/ReturnCode";
import {TransactionController} from "../Controller/TransactionController";
const transaction = Router();
var transController = new TransactionController();


transaction.post('/get', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let user_id = parseInt(data.user_id);
    let sessionID = data.sessionID;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([user_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            transController.getTransactionsByUserId(data, function (err, result) {
                res.send(JSON.stringify(result))
            })
        }
    })
});


export default transaction;