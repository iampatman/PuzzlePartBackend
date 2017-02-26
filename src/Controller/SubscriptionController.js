"use strict";
var SubscriptionDAO_1 = require("../DAO/SubscriptionDAO");
var PricingDAO_1 = require("../DAO/PricingDAO");
var TransactionDAO_1 = require("../DAO/TransactionDAO");
var ReturnCode_1 = require("../Common/ReturnCode");
var UtilsTS_1 = require("../Common/UtilsTS");
/**
 * Created by NguyenTrung on 24/2/17.
 */
var SubscriptionController = (function () {
    function SubscriptionController() {
        this.subDAO = new SubscriptionDAO_1.SubscriptionDAO();
        this.pricingDAO = new PricingDAO_1.PricingDAO();
        this.transactionDAO = new TransactionDAO_1.TransactionDAO();
    }
    SubscriptionController.prototype.getSubscriptionItemList = function (callback) {
        this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
            callback(list);
        });
    };
    // getSubscriptionItemDetails(id: number, callback){
    //     this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
    //         callback(list)
    //
    //     })
    // }
    SubscriptionController.prototype.getPricingDetails = function (id, callback) {
        this.pricingDAO.findPricingBySubscriptionId(id, function (list) {
            callback(list);
        });
    };
    SubscriptionController.prototype.subscribe = function (transaction, callback) {
        var transaction_id = this.generate_transaction_id();
        var validate_transaction_detail = true;
        transaction.transaction_id = transaction_id;
        var transactionDAO = this.transactionDAO;
        //checksum
        this.pricingDAO.findPricingByPricingId(transaction.pricing_id, function (pricingItem) {
            if (pricingItem.subscription_id != transaction.subscription_id) {
                callback(ReturnCode_1.ReturnCode.DATA_INVALID);
                return;
            }
            else {
                var endDate = new Date();
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
    };
    SubscriptionController.prototype.generate_transaction_id = function () {
        return Math.random().toString(16).substr(0, 9);
    };
    return SubscriptionController;
}());
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=SubscriptionController.js.map