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
const Transaction_1 = require("../model/Transaction");
const ReturnCode_1 = require("../Common/ReturnCode");
const UtilsTS_1 = require("../Common/UtilsTS");
const SessionManager_1 = require("../Common/SessionManager");
const DiscountDAO_1 = require("../DAO/DiscountDAO");
/**
 * Created by NguyenTrung on 24/2/17.
 */
class SubscriptionController {
    constructor() {
        this.subDAO = new SubscriptionDAO_1.SubscriptionDAO();
        this.pricingDAO = new PricingDAO_1.PricingDAO();
        this.transactionDAO = new TransactionDAO_1.TransactionDAO();
        this.discountDAO = new DiscountDAO_1.DiscountDAO();
    }
    getSubscriptionItemList(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let mobilePhone = data.mobilePhone;
            let sessionID = data.sessionID;
            let sessionValid = (yield SessionManager_1.SessionManager.getInstance().checkSessionID(sessionID, mobilePhone));
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
    getSubscriptionItemDetails(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionID = data.sessionID;
            let subscription_id = data.subscription_id;
            let mobilePhone = data.mobilePhone;
            let sessionValid = (yield SessionManager_1.SessionManager.getInstance().checkSessionID(sessionID, mobilePhone));
            if (sessionValid != ReturnCode_1.ReturnCode.SUCCEEDED) {
                callback(null, { returnCode: sessionValid });
            }
            else {
                let returnCode = ReturnCode_1.ReturnCode.SUCCEEDED;
                let discountList = (yield this.subDAO.getDiscountDetailsBySubId(subscription_id));
                let pricingList = (yield this.pricingDAO.findPricingBySubscriptionId(subscription_id));
                let productList = (yield this.subDAO.getSubscriptionItemDetails(subscription_id));
                if (discountList == null || productList == null) {
                    returnCode = ReturnCode_1.ReturnCode.EXCEPTION;
                    callback(null, { returnCode: returnCode });
                }
                else {
                    if (pricingList.length == 0) {
                        returnCode = ReturnCode_1.ReturnCode.SUBSCRIPTION_ID_INVALID;
                    }
                    callback(null, {
                        returnCode: returnCode,
                        id: subscription_id,
                        pricingList: pricingList,
                        discountList: discountList,
                        productList: productList
                    });
                }
            }
        });
    }
    getPricingDetails(id, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let pricingList = (yield this.pricingDAO.findPricingBySubscriptionId(id));
            let returnCode = ReturnCode_1.ReturnCode.SUCCEEDED;
            if (pricingList == null) {
                returnCode = ReturnCode_1.ReturnCode.EXCEPTION;
            }
            callback({ returnCode: returnCode, list: pricingList });
        });
    }
    subscribe(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = new Transaction_1.Transaction();
            transaction.user_id = parseInt(data.user_id);
            transaction.start_date = data.startDate;
            transaction.pricing_id = parseInt(data.pricing_id);
            transaction.subscription_id = parseInt(data.subscription_id);
            transaction.discount_id = parseInt(data.discount_id);
            var transaction_id = this.generate_transaction_id();
            var validate_transaction_detail = true;
            var returnCode = ReturnCode_1.ReturnCode.FAILED;
            transaction.transaction_id = transaction_id;
            let transactionDAO = this.transactionDAO;
            let discountItem = (yield this.discountDAO.getDiscountDetailsByDiscountId(transaction.discount_id));
            if (discountItem == null) {
                callback(null, { returnCode: ReturnCode_1.ReturnCode.DATA_INVALID });
                return;
            }
            let pricingItem = (yield this.pricingDAO.findPricingByPricingId(transaction.pricing_id));
            if (pricingItem == null || pricingItem.subscriptionId != transaction.subscription_id) {
                callback(ReturnCode_1.ReturnCode.DATA_INVALID);
                return;
            }
            else {
                let endDate = new Date();
                let startDate = UtilsTS_1.UtilsTS.dateFromString(transaction.start_date);
                endDate.setDate(startDate.getDate() + discountItem.duration * 30);
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
    generate_transaction_id() {
        return Math.random().toString(16).substr(3, 8).toUpperCase();
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=SubscriptionController.js.map