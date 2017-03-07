import {User} from '../model/User';
import {DAOIF} from "./DAOIF";
var mysql = require('mysql');


/* ES6: */
export class UserDAO extends DAOIF{

    constructor() {
        super();
    }

    async findUserByUsername(mobilePhone: string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.getConnection(function (connection) {
                    var queryString = "Select * from User where mobile_phone = " + mobilePhone;
                    var user = new User(mobilePhone);
                    connection.query(queryString, function (err, rows, fields) {
                        if (err)
                            reject(err)
                        if (rows.length > 0) {
                            if (rows[0].mobile_phone == mobilePhone) {
                                user.password = rows[0].password
                                user.email = rows[0].email
                                user.userId = rows[0].user_id
                                user.name = rows[0].name
                            }
                        }
                        connection.end();
                        resolve(user);
                    });
                })
            }, 3000);
        })
    }

    saveUser(user: User, callback) {
        this.getConnection(function (connection) {
            var sql = "INSERT INTO User SET ?";
            var values = {mobile_phone: user.mobilePhone, password: user.password, name: user.name};
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log(err.toString());
                    callback(err, false)
                }
                let result = rows.affectedRows != 0
                connection.end();
                callback(null, result)
            })
        })
    }
}