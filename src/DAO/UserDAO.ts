import {User} from '../model/User';

var mysql = require('mysql');


/* ES6: */
export class UserDAO {

    constructor() {

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
                        for (var i in rows) {
                            console.log('Post Titles: ', rows[i].mobile_phone);
                            if (rows[i].mobile_phone == mobilePhone) {
                                user.password = rows[i].password
                                break;
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

    getConnection(callback) {
        var connection = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'Puzzle',
            }
        );
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
            callback(connection);
            //return connection;
        });
    }
}