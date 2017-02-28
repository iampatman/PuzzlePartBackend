/**
 * Created by NguyenTrung on 26/2/17.
 */
export class UtilsTS {
    static SESSION_TTL_IN_SECOND = 3600;
    static dateToMySQLTimestamp(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
}



