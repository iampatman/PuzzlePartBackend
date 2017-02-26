/**
 * Created by NguyenTrung on 26/2/17.
 */
export class UtilsTS {

    static dateToMySQLTimestamp(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
}



