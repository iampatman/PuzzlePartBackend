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
                        }
                        else {
                            for (var i in rows) {
                                let item = new Pricing();
                                item.pricing_id = rows[i].pricing_id
                                item.quantity = rows[i].quantity
                                item.price = rows[i].price
                                item.subscription_id = id
                                pricinglist.push(item);
                            }
                            resolve(pricinglist)
                        }
                        connection.end();
                    });
                }
            )
        })
    }

    async findPricingByPricingId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                    var queryString = "Select * from Pricing WHERE pricing_id = " + id;
                    connection.query(queryString, function (err, rows, fields) {
                        if (err)
                            reject(err)
                        else {
                            if (rows.length > 0) {
                                var priceItem = {
                                    pricing_id: rows[0].pricing_id,
                                    quantity: rows[0].quantity,
                                    price: rows[0].price,
                                    subscription_id: rows[0].subscription_id
                                }
                                resolve(JSON.stringify(priceItem))
                            } else {
                                resolve("")
                            }
                        }
                        connection.end();
                    });
                }
            )
        })
    }
}