import {Router} from 'express';
import {User} from "../model/User";
import {UserController} from '../Controller/UserController';
import {SubscriptionController} from '../Controller/SubscriptionController';
import {Transaction} from "../model/Transaction";
import {UtilsTS} from "../Common/UtilsTS";
import {ReturnCode} from "../Common/ReturnCode";
import {TransactionController} from "../Controller/TransactionController";


const index = Router();
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








index.get('/pricing', function (req, res, next) {
    let id = parseInt(req.query.id)
    subController.getPricingDetails(id, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result))
    })
});
export default index;
