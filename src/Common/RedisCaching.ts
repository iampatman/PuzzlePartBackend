/**
 * Created by NguyenTrung on 28/2/17.
 */

var Redis = require('redis')

export class RedisCaching {
    private static _instance: RedisCaching = null;
    private client = null;

    constructor() {
        this.client = Redis.createClient('6379', 'localhost')
    }


    static getInstance() {
        if (this._instance == null) {
            this._instance = new RedisCaching();

        }

        return this._instance;
    }

    setCache(key, value, timeoutinsec = 1000000000) {
        let valueObject = JSON.stringify(value);
        this.client.set(key, value, Redis.print);
        this.client.expire(key, timeoutinsec)
    }

    getCache(key, callback) {
        this.client.get(key, function (err, value) {
            if (err != null) {
                console.log(value);
                let valueObject = JSON.stringify(value);
                callback(null, valueObject)
            } else {
                callback(err, null)
            }

        });

    }
}