import {User} from "../model/User";
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

    setCache(key, value, timeoutinsec = 10000000) {
        // if (typeof value == "object") {
        //
        //     value = valueObject;
        // }
        let valueObject = JSON.stringify(value);
        this.client.set(key, valueObject, Redis.print);
        this.client.expire(key, timeoutinsec)
    }

    getCache(key, callback) {
        this.client.get(key, function (err, value) {
            if (err == null) {
                let valueObject = JSON.parse(value);
                callback(null, valueObject)
            } else {
                callback(err, null)
            }
        });
    }
}