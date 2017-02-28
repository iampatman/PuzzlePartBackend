"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const User_1 = require('../model/User');
var mysql = require('mysql');
/* ES6: */
class UserDAO {
    constructor() {
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.getConnection(function (connection) {
                        var queryString = "Select * from User where username = " + username;
                        var user = new User_1.User(username);
                        connection.query(queryString, function (err, rows, fields) {
                            if (err)
                                reject(err);
                            for (var i in rows) {
                                console.log('Post Titles: ', rows[i].username);
                                if (rows[i].username == username) {
                                    user.password = rows[i].password;
                                    break;
                                }
                            }
                            connection.end();
                            resolve(user);
                        });
                    });
                }, 3000);
            });
        });
    }
    saveUser(user, callback) {
        this.getConnection(function (connection) {
            var sql = "INSERT INTO User SET ?";
            var values = { username: user.username, password: user.password };
            connection.query(sql, values, function (err, rows, fields) {
                if (err) {
                    console.log(err.toString());
                    callback(false);
                }
                let result = rows.affectedRows != 0;
                connection.end();
                callback(result);
            });
        });
    }
    getConnection(callback) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123',
            database: 'Puzzle',
        });
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
exports.UserDAO = UserDAO;
//# sourceMappingURL=UserDAO.js.map