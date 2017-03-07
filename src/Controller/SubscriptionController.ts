import {SubscriptionDAO} from "../DAO/SubscriptionDAO";
import {PricingDAO} from "../DAO/PricingDAO";
import {TransactionDAO} from "../DAO/TransactionDAO";
import {Transaction} from "../model/Transaction";
import {ReturnCode} from "../Common/ReturnCode";
import {UtilsTS} from "../Common/UtilsTS";
import {SessionManager} from "../Common/SessionManager";


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
        let mobilePhone = data.mobilePhone;
        let sessionID = data.sessionID;
        let sessionValid = <number> (await SessionManager.getInstance().checkSessionID(sessionID, mobilePhone))
        if (sessionValid != ReturnCode.SUCCEEDED) {
            callback(null, {returnCode: sessionValid})
        } else {
            this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
                callback(null, {returnCode: ReturnCode.SUCCEEDED, list: list})
            })
        }
    }

    async getSubscriptionItemDetails(data, callback) {
        let sessionID = data.sessionID;
        let subscription_id = data.subscription_id
        let mobilePhone = data.mobilePhone
        let sessionValid = <number> (await SessionManager.getInstance().checkSessionID(sessionID, mobilePhone))
        if (sessionValid != ReturnCode.SUCCEEDED) {
            callback(null, {returnCode: sessionValid})
        } else {
            let returnCode = ReturnCode.SUCCEEDED;
            let discountList = <[]> (await this.subDAO.getDiscountDetailsBySubId(subscription_id));
            let pricingList = <[]> (await this.pricingDAO.findPricingBySubscriptionId(subscription_id))
            let productList = <[]> (await this.subDAO.getSubscriptionItemDetails(subscription_id));
            if (discountList == null || productList == null) {
                returnCode = ReturnCode.EXCEPTION
                callback(null, {returnCode: returnCode})
            } else {
                if (pricingList.length == 0) {
                    returnCode = ReturnCode.SUBSCRIPTION_ID_INVALID
                }
                callback(null, {
                    returnCode: returnCode,
                    id: subscription_id,
                    pricingList: pricingList,
                    discountList: discountList,
                    productList: productList
                })
            }
        }
    }


    async getPricingDetails(id: number, callback) {
        let pricingList = <[]> (await this.pricingDAO.findPricingBySubscriptionId(id));
        let returnCode = ReturnCode.SUCCEEDED
        if (pricingList == null) {
            returnCode = ReturnCode.EXCEPTION;
        }
        callback({returnCode: returnCode, list: pricingList})
    }


    async subscribe(transaction: Transaction, callback) {
        var transaction_id = this.generate_transaction_id();
        var validate_transaction_detail = true;
        var returnCode = ReturnCode.FAILED;
        transaction.transaction_id = transaction_id;
        let transactionDAO = this.transactionDAO;
        //checksum
        let pricingStr = <string> (await this.pricingDAO.findPricingByPricingId(transaction.pricing_id));
        if (pricingStr == "") {
            callback(ReturnCode.DATA_INVALID);
            return;
        }
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
        return Math.random().toString(16).substr(3, 8).toUpperCase();
    }

}