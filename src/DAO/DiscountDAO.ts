/**
 * Created by NguyenTrung on 15/3/17.
 */
import {DAOIF} from "./DAOIF";
import {Pricing} from "../model/Pricing";
import {Discount} from "../model/Discount";
/**
 * Created by NguyenTrung on 25/2/17.
 */


var mysql = require('mysql');


/* ES6: */
export class DiscountDAO extends DAOIF {

    constructor() {
        super();
    }

    async getDiscountDetailsByDiscountId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                    reject(err);
                }
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