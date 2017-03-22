import {DAOIF} from "./DAOIF";
import {Pricing} from "../model/Pricing";
/**
 * Created by NguyenTrung on 25/2/17.
 */


var mysql = require('mysql');


/* ES6: */
export class PricingDAO extends DAOIF {

    constructor() {
        super();
    }

    async findPricingBySubscriptionId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                var queryString = "Select * from Pricing WHERE subscription_id = " + id;
                var pricinglist = []
                connection.query(queryString, function (err, rows, fields) {
                    if (err) {
                        console.error(err)
                        reject(err)
                        return;
                    }
                    for (var i in rows) {
                        let item = new Pricing();
                        item.pricingId = rows[i].pricing_id
                        item.quantity = rows[i].quantity
                        item.price = rows[i].price
                        item.subscriptionId = id
                        pricinglist.push(item);
                    }
                    resolve(pricinglist);
                    connection.end();
                });
            });
        });
    }

    async findPricingByPricingId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                if (err) {
                    console.error(err);
                    reject(err)
                    return;
                }
                var queryString = "Select * from Pricing WHERE pricing_id = " + id;
                connection.query(queryString, function (err, rows, fields) {
                    if (err)
                        reject(err)
                    else {
                        if (rows.length > 0) {
                            var pricingItem = new Pricing();
                            pricingItem.pricingId = rows[0].pricing_id;
                            pricingItem.quantity = rows[0].quantity;
                            pricingItem.price = rows[0].price;
                            pricingItem.subscriptionId = rows[0].subscription_id;
                            resolve(pricingItem)
                        } else {
                            resolve(null)
                        }
                    }
                    connection.end();
                });
            });

        })
    }
}