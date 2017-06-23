/**
 * Created by NguyenTrung on 15/3/17.
 */
import {DAOIF} from "./DAOIF";
import {Pricing} from "../model/Pricing";
import {Discount} from "../model/Discount";
import {Order} from "../model/Order";
import {ReturnCode} from "../Common/ReturnCode";
import {OrderDetail} from "../model/OrderDetail";
/**
 * Created by NguyenTrung on 25/2/17.
 */


var mysql = require('mysql');


/* ES6: */
export class OrderDAO extends DAOIF {

    constructor() {
        super();
    }

    async saveOrder(order: Order) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                    reject(err);
                }
                var sql = "INSERT INTO Order SET ";
                var values = {}
                connection.query(sql, values, function (err, rows, fields) {
                    if (err) {
                        console.log(err.toString());
                        reject(err)
                    } else {
                        let result = rows.affectedRows != 0
                        resolve(result ? ReturnCode.SUCCEEDED : ReturnCode.FAILED)
                    }
                    connection.end();

                })

            })
        })
    }

    async saveOrderDetail(orderDetail: OrderDetail) {
        return new Promise((resolve, reject) => {
            super.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                    reject(err);
                }
                var sql = "INSERT INTO OrderDetail SET ";
                var values = {}
                connection.query(sql, values, function (err, rows, fields) {
                    if (err) {
                        console.log(err.toString());
                        reject(err)
                    } else {
                        let result = rows.affectedRows != 0
                        resolve(result ? ReturnCode.SUCCEEDED : ReturnCode.FAILED)
                    }
                    connection.end();

                })

            })
        })
    }
}