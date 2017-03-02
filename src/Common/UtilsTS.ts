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

    static sha256(params, callback) {
        var string = ""
        for (var param in params) {
            string += param;
            string += "|"
        }
        const hash = Crypto.createHmac('sha256', UtilsTS.SECRET_KEY)
            .update(string)
            .digest('hex');
        console.log(hash);
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
}



