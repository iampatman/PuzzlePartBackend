"use strict";

var User_1 = require('../model/User');
var mysql = require('mysql');
/* ES6: */
var UserDAO = (function () {
    function UserDAO() {
    }
    UserDAO.prototype.findUserByUsername = function (username, callback) {
        this.getConnection(function (connection) {
            var queryString = "Select * from User";
            var user = new User_1.User(username);
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false);
                for (var i in rows) {
                    console.log('Post Titles: ', rows[i].username);
                    if (rows[i].username == username) {
                        user.password = rows[i].password;
                        break;
                    }
                }
                connection.end();
                callback(user);
            });
        });
    };
    UserDAO.prototype.saveUser = function (user, callback) {
        this.getConnection(function (connection) {
            var sql = "INSERT INTO User SET ?";
            var values = { username: user.username, password: user.password };
            connection.query(sql, values, function (err, rows, fields) {
                if (err) {
                    console.log(err.toString());
                    callback(false);
                }
                var result = rows.affectedRows != 0;
                connection.end();
                callback(result);
            });
        });
    };
    UserDAO.prototype.getConnection = function (callback) {
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
    };
    return UserDAO;
}());
exports.UserDAO = UserDAO;
//# sourceMappingURL=UserDAO.js.map