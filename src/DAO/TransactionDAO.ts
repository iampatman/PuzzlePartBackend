/**
 * Created by NguyenTrung on 25/2/17.
 */
import {Transaction} from "../model/Transaction";
import {ReturnCode} from "../Common/ReturnCode"
import {DAOIF} from "./DAOIF";
var mysql = require('mysql');


export class TransactionDAO extends DAOIF{

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

}