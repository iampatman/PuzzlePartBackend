"use strict";
var SubscriptionDAO_1 = require("../DAO/SubscriptionDAO");
/**
 * Created by NguyenTrung on 24/2/17.
 */
var SubscriptionController = (function () {
    function SubscriptionController() {
        this.subDAO = new SubscriptionDAO_1.SubscriptionDAO();
    }
    SubscriptionController.prototype.getSubscriptionItemList = function (callback) {
        this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
            callback(list);
        });
    };
    return SubscriptionController;
}());
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=SubscriptionController.js.map