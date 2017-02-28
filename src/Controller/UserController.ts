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
        this.userDAO.saveUser(user, function (result) {
            callback(result)
        });

    }

    async login(username: string, password: string, callback) {
        let userDAO = new UserDAO();
        let user = <User> (await userDAO.findUserByUsername(username));
        let returnCode = ReturnCode.FAILED;
        let sessionID = ""
        if (user != null) {
            if (user.password == password) {
                returnCode = ReturnCode.SUCCEEDED;
                sessionID = <string> (await SessionManager.getInstance().getSessionID(user.username));
            }
        }
        callback(null, {returnCode: returnCode, sessionID: sessionID})
    }

}
