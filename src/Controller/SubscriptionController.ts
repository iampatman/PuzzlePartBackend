import {SubscriptionDAO} from "../DAO/SubscriptionDAO";
import {PricingDAO} from "../DAO/PricingDAO";
import {TransactionDAO} from "../DAO/TransactionDAO";
import {Transaction} from "../model/Transaction";
import {ReturnCode} from "../Common/ReturnCode";
import {} from "../Common/UtilsTS"
import {UtilsTS} from "../Common/UtilsTS";
import {SessionManager} from "./SessionManager";


/**
 * Created by NguyenTrung on 24/2/17.
 */


export class SubscriptionController {
    subDAO: SubscriptionDAO;
    pricingDAO: PricingDAO;
    transactionDAO: TransactionDAO;

    constructor() {
        this.subDAO = new SubscriptionDAO();
        this.pricingDAO = new PricingDAO();
        this.transactionDAO = new TransactionDAO();

    }


    async getSubscriptionItemList(data, callback) {
        let username = data.username;
        let sessionID = data.sessionID;
        let sessionValid = <Boolean> (await SessionManager.getInstance().checkSessionID(sessionID, username))

        if (sessionValid == false) {
            callback(null, {returnCode: ReturnCode.SESSION_INVALID})
        } else {
            this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
                callback(null, {returnCode: ReturnCode.SUCCEEDED, list: list})
            })
        }
    }

    // getSubscriptionItemDetails(id: number, callback){
    //     this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
    //         callback(list)
    //
    //     })
    // }
    getPricingDetails(id: number, callback) {
        this.pricingDAO.findPricingBySubscriptionId(id, function (list) {
            callback({returnCode: ReturnCode.SUCCEEDED, list: list})
        })
    }


    async subscribe(transaction: Transaction, callback) {
        var transaction_id = this.generate_transaction_id();
        var validate_transaction_detail = true;
        var returnCode = ReturnCode.FAILED;
        transaction.transaction_id = transaction_id;
        let transactionDAO = this.transactionDAO;
        //checksum
        let pricingStr = <string> (await this.pricingDAO.findPricingByPricingId(transaction.pricing_id));
        let pricingItem = JSON.parse(pricingStr);
        if (pricingItem.subscription_id != transaction.subscription_id) {
            callback(ReturnCode.DATA_INVALID);
            return;
        } else {
            let endDate = new Date();
            endDate.setDate(endDate.getDate() + 31);
            transaction.start_date = UtilsTS.dateToMySQLTimestamp(new Date());
            transaction.end_date = UtilsTS.dateToMySQLTimestamp(endDate);
            transaction.remaining_times = pricingItem.quantity;
            transaction.payment_completed = false;

            transactionDAO.saveTransaction(transaction, function (result) {
                if (result == ReturnCode.SUCCEEDED) {
                    console.log("Transaction succeed")
                    callback(result, transaction);
                } else {
                    console.log("Transaction failed")
                    callback(ReturnCode.FAILED)
                }

            })
        }
    }


    generate_transaction_id() {
        return Math.random().toString(16).substr(0, 9);
    }

}