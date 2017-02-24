var wrapper =  require('node-mysql-wrapper');
var db = wrapper.wrap("mysql://root:123@localhost/puzzle?debug=false&charset=utf8");
import { SubscriptionItem } from '../model/SubscriptionItem';

var mysql = require('mysql');






/* ES6: */
export class SubscriptionDAO{

    constructor(){

    }

    getSubscriptionItemListByCat(category: number, callback){
        this.getConnection(function (connection) {
            var queryString = "Select * from SubscriptionItem";
            var items = [];

            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false)
                for (var i in rows) {
                    let item = new SubscriptionItem();
                    item.subscription_id = rows[i].subscription_id;
                    item.name = rows[i].name;
                    item.introduction = rows[i].introduction;
                    item.rating = rows[i].rating;
                    item.smallImage = rows[i].small_image;
                    items.push(item)
                }
                connection.end();
                callback(items)
            });

        })
    }

    getConnection(callback){
        var connection = mysql.createConnection(
            {
                host     : 'localhost',
                user     : 'root',
                password : '123',
                database : 'Puzzle',
            }
        );
        connection.connect(function(err) {
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