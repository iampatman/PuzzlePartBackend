var wrapper =  require('node-mysql-wrapper');
var db = wrapper.wrap("mysql://root:123@localhost/puzzle?debug=false&charset=utf8");
import { User } from '../model/User';

var mysql = require('mysql');






/* ES6: */
export class UserDAO{

    constructor(){

    }
    findUserByUsername(username: string, callback){
        this.getConnection(function (connection) {
            var queryString = "Select * from User";
            var user = new User(username);
            connection.query(queryString, function (err, rows, fields) {
                if (err)
                    callback(false)
                for (var i in rows) {
                    console.log('Post Titles: ', rows[i].username);
                    if (rows[i].username == username) {
                        user.password = rows[i].password
                        break;
                    }
                }
                connection.end();
                callback(user)
            });

        })
    }
    saveUser(user: User, callback){
        this.getConnection(function (connection) {
            var sql = "INSERT INTO User SET ?";
            var values = {username: user.username, password: user.password};
            connection.query(sql,values, function (err, rows, fields) {
                if (err){
                    console.log(err.toString());
                    callback(false)
                }
                let result = rows.affectedRows != 0
                connection.end();
                callback(result)
            })
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