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

    async getTransactionsByUserId(data, callback) {
        let userId = data.userId
        let sessionID = data.sessionID
        let mobilePhone = data.mobilePhone

        let sessionValid = <number> (await SessionManager.getInstance().checkSessionID(sessionID, mobilePhone))
        if (sessionValid != ReturnCode.SUCCEEDED) {
            callback(null, {returnCode: sessionValid})
        } else {
            this.transactionDAO.getTransactionsByUserId(userId)
                .then((items) => {
                    callback(null, {returnCode: ReturnCode.SUCCEEDED, list: items})
                }).catch((err) => {
                callback(err, {returnCode: ReturnCode.EXCEPTION})
            });
        }
    }
}
