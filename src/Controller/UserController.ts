import {User} from '../model/User';
import {UserDAO} from '../DAO/UserDAO';
import {SessionManager} from "../Common/SessionManager";
import {ReturnCode} from "../Common/ReturnCode";

export class UserController {
    userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    async registerUser(user: User, callback) {
        let returnCode = ReturnCode.FAILED;
        if (user.mobilePhone.length * user.password.length * user.name.length == 0) {
            callback(null, {returnCode: ReturnCode.DATA_INVALID});
            return;
        }
        try {
            let foundUser = await this.userDAO.findUserByMobileNumber(user.mobilePhone);
            if (foundUser != null) {
                callback(null, {returnCode: ReturnCode.MOBILE_NUMBER_DUPLICATE});
                return;
            }
            let result = await this.userDAO.saveUser(user);
            returnCode = result == true ? ReturnCode.SUCCEEDED : ReturnCode.FAILED
            callback(null, {returnCode: returnCode})
        } catch (err) {
            console.error(err);
            callback(err, {returnCode: ReturnCode.EXCEPTION})
        }
    }

    async login(mobilePhone: string, password: string, callback) {
        let returnCode = ReturnCode.FAILED;
        let error = null;
        let sessionID = ""
        let user = null;

        try {
            if (mobilePhone.length * password.length == 0) {
                callback(null, {returnCode: ReturnCode.DATA_INVALID});
                throw new Error();
            }
            let userDAO = new UserDAO();
            user = <User> (await userDAO.findUserByMobileNumber(mobilePhone));
            if (user == null) {
                returnCode = ReturnCode.ACCOUNT_NOT_EXIST;
                return;
            } else {
                if (user.password == password) {
                    returnCode = ReturnCode.SUCCEEDED;
                    user.password = ""
                    sessionID = <string> (await SessionManager.getInstance().getSessionID(user.mobilePhone));
                } else {
                    returnCode = ReturnCode.USERNAME_OR_PASS_INCORRECT
                }
            }
        } catch (err) {
            error = err
            returnCode = ReturnCode.EXCEPTION;
        } finally {
            callback(error, {returnCode: returnCode, sessionID: sessionID, details: user})
        }


        // userDAO.findUserByUsername(mobilePhone).then((userObj) => {
        //     return new Promise((resolve, reject) => {
        //         let user = <User> userObj
        //         if (user != null) {
        //             if (user.password == password) {
        //                 returnCode = ReturnCode.SUCCEEDED;
        //                 user.password = ""
        //                 SessionManager.getInstance().getSessionID(user.mobilePhone)
        //             )
        //         ;
        //     }
        //     }
        //     })
        //
        // }).catch(err => {
        //
        // })
    }


}
