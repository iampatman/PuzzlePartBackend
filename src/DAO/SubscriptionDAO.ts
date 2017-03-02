
import { SubscriptionItem } from '../model/SubscriptionItem';

var mysql = require('mysql');






/* ES6: */
export class SubscriptionDAO{

    constructor(){

    }

    getSubscriptionItemListByCat(category: number, callback){
        this.getConnection(function (connection) {
            var queryString = "select * from SubscriptionItem s LEFT JOIN Company c On s.company_id = c.company_id ";
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
                    item.companyId = rows[i].company_id;
                    item.companyName = rows[i].name
                    items.push(item)
                }
                connection.end();
                callback(items)
            });

        })
    }


    getSubscriptionItemDetails(id: number, callback){
        this.getConnection(function (connection) {
            var queryString = "Select * from SubscriptionItem where subscription_item_id = " + id;

            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false)
                else {
                    if (rows.length >= 1) {
                        let item = new SubscriptionItem();
                        item.subscription_id = rows[0].subscription_id;
                        item.name = rows[0].name;
                        item.introduction = rows[0].introduction;
                        item.rating = rows[0].rating;
                        item.smallImage = rows[0].small_image;
                    }
                }

                connection.end();
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