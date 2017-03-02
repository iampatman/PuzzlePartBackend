import {DAOIF} from "./DAOIF";
/**
 * Created by NguyenTrung on 25/2/17.
 */


var mysql = require('mysql');


/* ES6: */
export class PricingDAO extends DAOIF {

    constructor() {
        super();
    }

    findPricingBySubscriptionId(id: number, callback) {
        super.getConnection(function (connection) {
                var queryString = "Select * from Pricing WHERE subscription_id = " + id;
                var pricelist = []
                connection.query(queryString, function (err, rows, fields) {
                    if (err) {
                        console.error(err)
                        callback(err, null)
                    }
                    else {
                        for (var i in rows) {
                            var priceItem = {
                                pricing_id: rows[i].pricing_id,
                                quantity: rows[i].quantity,
                                price: rows[i].price
                            }
                            pricelist.push(priceItem);
                        }
                        callback(null, pricelist)
                    }
                    connection.end();
                });
            }
        )
    }

    async findPricingByPricingId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (connection) {
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