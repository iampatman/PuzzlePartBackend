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
}



