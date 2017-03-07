/**
 * Created by NguyenTrung on 25/2/17.
 */


export class ReturnCode {
    static SUCCEEDED = 1;
    static FAILED = 0;

    static EXCEPTION = -5000;
    static DATA_INVALID = -1001;
    static SESSION_INVALID = -1002;
    static SESSION_TIMEOUT = -1003;
    static CHECKSUM_INCORRECT = -1004;
    static USERNAME_OR_PASS_INCORRECT = -1005;
    static SUBSCRIPTION_ID_INVALID = -1006;
}

