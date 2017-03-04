/**
 * Created by NguyenTrung on 28/2/17.
 */


import {SubscriptionDAO} from "../DAO/SubscriptionDAO";
import {PricingDAO} from "../DAO/PricingDAO";
import {TransactionDAO} from "../DAO/TransactionDAO";
import {Transaction} from "../model/Transaction";
import {ReturnCode} from "../Common/ReturnCode";
import {} from "../Common/UtilsTS"
import {UtilsTS} from "../Common/UtilsTS";
import {SessionManager} from "../Common/SessionManager";


/**
 * Created by NguyenTrung on 24/2/17.
 */


export class TransactionController {
    subDAO: SubscriptionDAO;
    pricingDAO: PricingDAO;
    transactionDAO: TransactionDAO;

    constructor() {
        this.subDAO = new SubscriptionDAO();
        this.pricingDAO = new PricingDAO();
        this.transactionDAO = new TransactionDAO();

    }
    getTransactionsByUserId(userId, callback) {
        this.transactionDAO.getTransactionsByUserId(userId, (err, result) => {
            if (err != null) {
                callback(err, {returnCode: ReturnCode.EXCEPTION})
            } else {
                callback(err, {returnCode: ReturnCode.SUCCEEDED, list: result})
            }
        })

    }
}
