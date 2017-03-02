
import { SubscriptionItem } from '../model/SubscriptionItem';
import {DAOIF} from "./DAOIF";

var mysql = require('mysql');






/* ES6: */
export class SubscriptionDAO extends DAOIF{

    constructor(){
        super()
    }

    getSubscriptionItemListByCat(category: number, callback){
        super.getConnection(function (connection) {
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
        super.getConnection(function (connection) {
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

}