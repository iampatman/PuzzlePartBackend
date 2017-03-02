"use strict";
const SubscriptionItem_1 = require('../model/SubscriptionItem');
const DAOIF_1 = require("./DAOIF");
var mysql = require('mysql');
/* ES6: */
class SubscriptionDAO extends DAOIF_1.DAOIF {
    constructor() {
        super();
    }
    getSubscriptionItemListByCat(category, callback) {
        super.getConnection(function (connection) {
            var queryString = "select * from SubscriptionItem s LEFT JOIN Company c On s.company_id = c.company_id ";
            var items = [];
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false);
                for (var i in rows) {
                    let item = new SubscriptionItem_1.SubscriptionItem();
                    item.subscription_id = rows[i].subscription_id;
                    item.name = rows[i].name;
                    item.introduction = rows[i].introduction;
                    item.rating = rows[i].rating;
                    item.smallImage = rows[i].small_image;
                    item.companyId = rows[i].company_id;
                    item.companyName = rows[i].name;
                    items.push(item);
                }
                connection.end();
                callback(items);
            });
        });
    }
    getSubscriptionItemDetails(id, callback) {
        super.getConnection(function (connection) {
            var queryString = "Select * from SubscriptionItem where subscription_item_id = " + id;
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false);
                else {
                    if (rows.length >= 1) {
                        let item = new SubscriptionItem_1.SubscriptionItem();
                        item.subscription_id = rows[0].subscription_id;
                        item.name = rows[0].name;
                        item.introduction = rows[0].introduction;
                        item.rating = rows[0].rating;
                        item.smallImage = rows[0].small_image;
                    }
                }
                connection.end();
            });
        });
    }
}
exports.SubscriptionDAO = SubscriptionDAO;
//# sourceMappingURL=SubscriptionDAO.js.map