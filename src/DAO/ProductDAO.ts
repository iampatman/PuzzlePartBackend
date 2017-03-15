import {DAOIF} from "./DAOIF";
import {Product} from "../model/Product";
/**
 * Created by NguyenTrung on 15/3/17.
 */
var mysql = require('mysql');


/* ES6: */
export class PricingDAO extends DAOIF {

    constructor() {
        super();
    }

    async findProductBySubscriptionId(id: number) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                    var queryString = "Select * from Subscription_Detail s left join Product p " +
                        "On s.product_id = p.product_id WHERE s.subscription_id = " + id;
                    var productlist = []
                    connection.query(queryString, function (err, rows, fields) {
                        if (err) {
                            console.error(err)
                            reject(err)
                        }
                        else {
                            for (var i in rows) {
                                let item = new Product();
                                item.introduction = rows[i].introduction
                                item.productName = rows[i].product_name
                                item.productId = rows[i].product_id
                                item.companyId = rows[i].company_id
                                item.image = rows[i].image
                                item.subscriptionId = id
                                item.price = rows[i].price
                                productlist.push(item);
                            }
                            resolve(productlist)
                        }
                        connection.end();
                    });
                }
            )
        });
    }


}