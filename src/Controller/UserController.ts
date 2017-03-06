import {User} from '../model/User';
import {UserDAO} from '../DAO/UserDAO';
import {SessionManager} from "../Common/SessionManager";
import {ReturnCode} from "../Common/ReturnCode";

export class UserController {
    userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    registerUser(user: User, callback) {
        this.userDAO.saveUser(user, function (err, result) {
            let returnCode = ReturnCode.FAILED;
            if (err != null) {
                returnCode = ReturnCode.EXCEPTION;
            } else {
                returnCode = result == true ? ReturnCode.SUCCEEDED : ReturnCode.FAILED
            }
            callback(returnCode)
        });

    }

    async login(mobilePhone: string, password: string, callback) {
        let userDAO = new UserDAO();
        let user = <User> (await userDAO.findUserByUsername(mobilePhone));
        let returnCode = ReturnCode.USERNAME_OR_PASS_INCORRECT;
        let sessionID = ""
        if (user != null) {
            if (user.password == password) {
                returnCode = ReturnCode.SUCCEEDED;
                sessionID = <string> (await SessionManager.getInstance().getSessionID(user.mobilePhone));
            }
        }
        callback(null, {returnCode: returnCode, sessionID: sessionID})
    }

}
