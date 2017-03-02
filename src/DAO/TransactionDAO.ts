/**
 * Created by NguyenTrung on 25/2/17.
 */
import {Transaction} from "../model/Transaction";
import {ReturnCode} from "../Common/ReturnCode"
import {DAOIF} from "./DAOIF";
var mysql = require('mysql');


export class TransactionDAO extends DAOIF {

    constructor() {
        super();
    }

    saveTransaction(transaction, callback) {
        this.getConnection(function (connection) {
            var sql = "INSERT INTO Transaction SET ?";
            var values = {
                transaction_id: transaction.transaction_id,
                subscription_id: transaction.subscription_id,
                user_id: transaction.user_id,
                pricing_id: transaction.pricing_id,
                start_date: transaction.start_date,
                end_date: transaction.end_date,
                remaining_times: transaction.remaining_times,
            };
            connection.query(sql, values, function (err, rows, fields) {
                if (err) {
                    console.log(err.toString());
                    callback(err, {returnCode: ReturnCode.EXCEPTION})
                } else {
                    let result = rows.affectedRows != 0
                    connection.end();
                    callback(result ? ReturnCode.SUCCEEDED : ReturnCode.FAILED)
                }

            })
        })
    }

    getTransactionsByUserId(userId, callback) {
        this.getConnection(function (connection) {
            var sql = "SELECT * FROM Transaction Where user_id = " + userId;
            var items = []
            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err.toString());
                    callback(err)
                } else {
                    for (var i in rows) {
                        var transaction = new Transaction()
                        transaction.transaction_id = rows[i].transaction_id;
                        transaction.subscription_id = rows[i].subscription_id
                        transaction.user_id = rows[i].user_id
                        transaction.pricing_id = rows[i].pricing_id
                        transaction.start_date = rows[i].start_date
                        transaction.end_date = rows[i].end_date
                        transaction.remaining_times = rows[i].remaining_times
                        items.push(transaction)
                    }
                    connection.end();
                    callback(null, items)
                }
            })
        })
    }

}