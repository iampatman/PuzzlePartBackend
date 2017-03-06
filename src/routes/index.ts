import {Router} from 'express';
import {User} from "../model/User";
import {UserController} from '../Controller/UserController';
import {SubscriptionController} from '../Controller/SubscriptionController';
import {Transaction} from "../model/Transaction";
import {UtilsTS} from "../Common/UtilsTS";
import {ReturnCode} from "../Common/ReturnCode";
import {TransactionController} from "../Controller/TransactionController";


const index = Router();
var userController = new UserController();
var subController = new SubscriptionController();
var transController = new TransactionController();

/* GET home page. */
// index.get('/', function (req, res, next) {
//     res.render('index', {title: 'Visual Studio Code!'});
// });

// /* GET Quick Start. */
// index.get('/quickstart', function (req, res, next) {
//     res.render('quickstart');
// });

index.post('/user/register', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let mobilePhone = data.mobilePhone;
    let password = data.password;
    let name = data.name;
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([mobilePhone, password, name], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            let user = new User(mobilePhone);
            user.password = password
            user.name = name
            userController.registerUser(user, function (result) {
                res.send(JSON.stringify({
                    'returnCode': result
                }))
            });
        }
    })
});


index.post('/user/login', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let mobilePhone = data.mobilePhone;
    let password = data.password;
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([mobilePhone, password], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            userController.login(mobilePhone, password, function (err, result) {
                if (err == null) {
                    res.send(JSON.stringify(result))
                }
            });
        }
    })
});

index.post('/subscription/getlist', function (req, res, next) {
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
                }
            })
        }
    });
});

index.post('/subscription/subscribe', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let transaction = new Transaction()
    transaction.user_id = parseInt(data.user_id);
    transaction.pricing_id = parseInt(data.pricing_id);
    transaction.subscription_id = parseInt(data.subscription_id);
    let sessionID = data.sessionID
    let sig = data.sig
    UtilsTS.validateChecksum([transaction.user_id, transaction.pricing_id, transaction.subscription_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            subController.subscribe(transaction, function (result, data) {
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify({returnCode: result, transaction: data}))
            })
        }
    });
});


index.post('/transaction/get', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let user_id = parseInt(data.user_id);
    let sessionID = data.sessionID;
    let sig = data.sig;
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([user_id, sessionID], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            transController.getTransactionsByUserId(user_id, function (err, result) {
                res.send(JSON.stringify(result))
            })
        }
    })
});

index.get('/pricing', function (req, res, next) {
    let id = parseInt(req.query.id)
    subController.getPricingDetails(id, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result))
    })
});
export default index;
