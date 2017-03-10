"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const SubscriptionItem_1 = require('../model/SubscriptionItem');
const DAOIF_1 = require("./DAOIF");
const Discount_1 = require("../model/Discount");
const SubscriptionDetail_1 = require("../model/SubscriptionDetail");
var mysql = require('mysql');
/* ES6: */
class SubscriptionDAO extends DAOIF_1.DAOIF {
    constructor() {
        super();
    }
    getSubscriptionItemListByCat(category, callback) {
        super.getConnection(function (err, connection) {
            var queryString = "select *, s.name as \"subscription_item_name\"  from SubscriptionItem s LEFT JOIN Company c On s.company_id = c.company_id ";
            var items = [];
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false);
                for (var i in rows) {
                    let item = new SubscriptionItem_1.SubscriptionItem();
                    item.subscription_id = rows[i].subscription_id;
                    item.name = rows[i].subscription_item_name;
                    item.introduction = rows[i].introduction;
                    item.rating = rows[i].rating;
                    item.smallImage = rows[i].small_image;
                    item.companyId = rows[i].company_id;
                    item.companyName = rows[i].name;
                    item.itemDescription = rows[i].description;
                    items.push(item);
                }
                connection.end();
                callback(items);
            });
        });
    }
    getSubscriptionItemDetails(id) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                var queryString = "select * from SubscriptionDetail s LEFT JOIN Product p " +
                    "ON s.product_id = p.product_id " +
                    "where subscription_id = " + id;
                connection.query(queryString, function (err, rows, fields) {
                    var items = [];
                    if (err)
                        reject(err);
                    else {
                        for (var i in rows) {
                            let item = new SubscriptionDetail_1.SubscriptionDetail();
                            item.subscription_id = rows[i].subscription_id;
                            item.product_id = rows[i].product_id;
                            item.product_name = rows[i].product_name;
                            item.introduction = rows[i].introduction;
                            items.push(item);
                        }
                        resolve(items);
                    }
                    connection.end();
                });
            });
        });
    }
    getDiscountDetailsBySubId(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _super("getConnection").call(this, function (err, connection) {
                    var queryString = "Select * from Discount_Subscription where subscription_id = " + id;
                    connection.query(queryString, function (err, rows, fields) {
                        var items = [];
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            for (var i in rows) {
                                let item = new Discount_1.Discount();
                                item.subscription_id = rows[i].subscription_id;
                                item.discount_id = rows[i].discount_id;
                                item.discount = rows[i].discount;
                                item.duration = rows[i].duration;
                                items.push(item);
                            }
                            resolve(items);
                        }
                        connection.end();
                    });
                });
            });
        });
    }
}
exports.SubscriptionDAO = SubscriptionDAO;
//# sourceMappingURL=SubscriptionDAO.js.map