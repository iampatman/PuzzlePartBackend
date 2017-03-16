import DateTimeFormat = Intl.DateTimeFormat;
/**
 * Created by NguyenTrung on 26/2/17.
 */
var Crypto = require('crypto');

export class UtilsTS {
    static SESSION_TTL_IN_SECOND = 3600;
    static SECRET_KEY = "taoTrungne0904!"

    static dateToMySQLTimestamp(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }


    static callbackToPromise(method, ...args) {
        return new Promise(function (resolve, reject) {
            return method(...args, function (err, result) {
                return err ? reject(err) : resolve(result);
            });
        });
    }

    static dateFromString(str: String): Date {
        return new Date();
    }

    static sha256(params, callback) {
        var string = ""
        for (var param in params) {
            string += param;
            string += "|"
        }
        string += UtilsTS.SECRET_KEY
        const hash = Crypto.createHash('sha256')
            .update(string)
            .digest('hex');
        callback(null, hash.toUpperCase())
    }

    static async validateChecksum(params, sig) {
        return new Promise((resolve, reject) => {
            UtilsTS.sha256(params, (err, checksum) => {
                if (err == null) {
                    let result = checksum == sig
                    resolve(true);
                } else {
                    reject(err);
                }
            })
        });

    }


    static async encrypt(str) {
        var crypto = require('crypto'),
            algorithm = 'aes-256-ctr',
            password = UtilsTS.SECRET_KEY;
        return new Promise((solve, reject) => {
            var cipher = crypto.createCipher(algorithm, password)
            var crypted = cipher.update(str, 'utf8', 'hex')
            crypted += cipher.final('hex');
            solve(crypted)
        });

    }

    static async decrypt(text) {
        var crypto = require('crypto'),
            algorithm = 'aes-256-ctr',
            password = UtilsTS.SECRET_KEY;
        return new Promise((solve, reject) => {
            var decipher = crypto.createDecipher(algorithm, password)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8');
            solve(dec)
        });

    }
}


UtilsTS.decrypt("5cdf83c3722120227d18b65ebfc23eb8").then((value) => {
    console.log(value)
})