/**
 * Created by NguyenTrung on 26/2/17.
 */
var mysql = require('mysql');

export class DAOIF {
    constructor(){

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
                console.error('Error connecting: ' + err.stack);
                return;
            }
            console.log('Connected as id ' + connection.threadId);
            callback(connection);
        });
    }
}