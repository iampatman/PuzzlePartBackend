"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const SubscriptionDAO_1 = require("../DAO/SubscriptionDAO");
const PricingDAO_1 = require("../DAO/PricingDAO");
const TransactionDAO_1 = require("../DAO/TransactionDAO");
const ReturnCode_1 = require("../Common/ReturnCode");
const UtilsTS_1 = require("../Common/UtilsTS");
const SessionManager_1 = require("../Common/SessionManager");
/**
 * Created by NguyenTrung on 24/2/17.
 */
class SubscriptionController {
    constructor() {
        this.subDAO = new SubscriptionDAO_1.SubscriptionDAO();
        this.pricingDAO = new PricingDAO_1.PricingDAO();
        this.transactionDAO = new TransactionDAO_1.TransactionDAO();
    }
    getSubscriptionItemList(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = data.username;
            let sessionID = data.sessionID;
            let sessionValid = (yield SessionManager_1.SessionManager.getInstance().checkSessionID(sessionID, username));
            if (sessionValid != ReturnCode_1.ReturnCode.SUCCEEDED) {
                callback(null, { returnCode: sessionValid });
            }
            else {
                this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
                    callback(null, { returnCode: ReturnCode_1.ReturnCode.SUCCEEDED, list: list });
                });
            }
        });
    }
    // getSubscriptionItemDetails(id: number, callback){
    //     this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
    //         callback(list)
    //
    //     })
    // }
    getPricingDetails(id, callback) {
        this.pricingDAO.findPricingBySubscriptionId(id, function (list) {
            callback({ returnCode: ReturnCode_1.ReturnCode.SUCCEEDED, list: list });
        });
    }
    subscribe(transaction, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var transaction_id = this.generate_transaction_id();
            var validate_transaction_detail = true;
            var returnCode = ReturnCode_1.ReturnCode.FAILED;
            transaction.transaction_id = transaction_id;
            let transactionDAO = this.transactionDAO;
            //checksum
            let pricingStr = (yield this.pricingDAO.findPricingByPricingId(transaction.pricing_id));
            if (pricingStr == "") {
                callback(ReturnCode_1.ReturnCode.DATA_INVALID);
                return;
            }
            let pricingItem = JSON.parse(pricingStr);
            if (pricingItem.subscription_id != transaction.subscription_id) {
                callback(ReturnCode_1.ReturnCode.DATA_INVALID);
                return;
            }
            else {
                let endDate = new Date();
                endDate.setDate(endDate.getDate() + 31);
                transaction.start_date = UtilsTS_1.UtilsTS.dateToMySQLTimestamp(new Date());
                transaction.end_date = UtilsTS_1.UtilsTS.dateToMySQLTimestamp(endDate);
                transaction.remaining_times = pricingItem.quantity;
                transaction.payment_completed = false;
                transactionDAO.saveTransaction(transaction, function (result) {
                    if (result == ReturnCode_1.ReturnCode.SUCCEEDED) {
                        console.log("Transaction succeed");
                        callback(result, transaction);
                    }
                    else {
                        console.log("Transaction failed");
                        callback(ReturnCode_1.ReturnCode.FAILED);
                    }
                });
            }
        });
    }
    getTransactionsByUserId(userId, callback) {
        this.transactionDAO.getTransactionsByUserId(userId, (err, result) => {
            if (err != null) {
                callback(err, { returnCode: ReturnCode_1.ReturnCode.EXCEPTION });
            }
            else {
                callback(err, { returnCode: ReturnCode_1.ReturnCode.SUCCEEDED, list: result });
            }
        });
    }
    generate_transaction_id() {
        return Math.random().toString(16).substr(3, 8).toUpperCase();
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=SubscriptionController.js.map