import {SubscriptionItem} from '../model/SubscriptionItem';
import {DAOIF} from "./DAOIF";
import {Discount} from "../model/Discount";
import {SubscriptionDetail} from "../model/SubscriptionDetail";

var mysql = require('mysql');


/* ES6: */
export class SubscriptionDAO extends DAOIF {

    constructor() {
        super()
    }

    getSubscriptionItemListByCat(category: number, callback) {
        super.getConnection(function (err, connection) {
            var queryString = "select *, s.name as \"subscription_item_name\"  from SubscriptionItem s LEFT JOIN Company c On s.company_id = c.company_id ";
            var items = [];
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false)
                for (var i in rows) {
                    let item = new SubscriptionItem();
                    item.subscription_id = rows[i].subscription_id;
                    item.name = rows[i].subscription_item_name;
                    item.introduction = rows[i].introduction;
                    item.rating = rows[i].rating;
                    item.smallImage = rows[i].small_image;
                    item.companyId = rows[i].company_id;
                    item.companyName = rows[i].name
                    item.itemDescription = rows[i].description
                    items.push(item)
                }
                connection.end();
                callback(items)
            });

        })
    }


    getSubscriptionItemDetails(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                var queryString = "select * from SubscriptionDetail s LEFT JOIN Product p " +
                    "ON s.product_id = p.product_id " +
                    "where subscription_id = " + id;
                connection.query(queryString, function (err, rows, fields) {
                    var items = []
                    if (err)
                        reject(err)
                    else {
                        for (var i in rows) {
                            let item = new SubscriptionDetail();
                            item.subscription_id = rows[i].subscription_id;
                            item.product_id = rows[i].product_id;
                            item.product_name = rows[i].product_name;
                            item.introduction = rows[i].introduction
                            items.push(item)
                        }
                        resolve(items)
                    }
                    connection.end();
                });

            })
        });
    }

    async getDiscountDetailsBySubId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                var queryString = "Select * from Discount_Subscription where subscription_id = " + id;
                connection.query(queryString, function (err, rows, fields) {
                    var items = []
                    if (err) {
                        console.error(err)
                        reject(err);
                    } else {
                        for (var i in rows) {
                            let item = new Discount();
                            item.subscription_id = rows[i].subscription_id;
                            item.discount_id = rows[i].discount_id;
                            item.discount = rows[i].discount;
                            item.duration = rows[i].duration;
                            items.push(item)
                        }
                        resolve(items)
                    }
                    connection.end();
                });

            })
        })
    }


    async getDiscountDetailsByDiscountId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                var queryString = "Select * from Discount_Subscription where discount_id = " + id;
                connection.query(queryString, function (err, rows, fields) {
                    if (err) {
                        console.error(err)
                        reject(err);
                    } else {
                        if (rows.length > 0) {
                            let item = new Discount();
                            item.subscription_id = rows[0].subscription_id;
                            item.discount_id = rows[0].discount_id;
                            item.discount = rows[0].discount;
                            item.duration = rows[0].duration;
                            resolve(item)
                        }
                    }
                    connection.end();
                });

            })
        })
    }

}