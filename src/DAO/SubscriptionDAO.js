"use strict";

var SubscriptionItem = require('../model/SubscriptionItem');
var mysql = require('mysql');
/* ES6: */
var SubscriptionDAO = (function () {
    function SubscriptionDAO() {
    }
    SubscriptionDAO.prototype.getSubscriptionItemListByCat = function (category, callback) {
        this.getConnection(function (connection) {
            var queryString = "Select * from SubscriptionItem";
            var items = [];
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false);
                for (var i in rows) {
                    var item = new SubscriptionItem_1.SubscriptionItem();
                    item.subscription_id = rows[i].subscription_id;
                    item.name = rows[i].name;
                    item.introduction = rows[i].introduction;
                    item.rating = rows[i].rating;
                    item.smallImage = rows[i].small_image;
                    items.push(item);
                }
                connection.end();
                callback(items);
            });
        });
    };
    SubscriptionDAO.prototype.getConnection = function (callback) {
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
    return SubscriptionDAO;
}());
exports.SubscriptionDAO = SubscriptionDAO;
//# sourceMappingURL=SubscriptionDAO.js.map