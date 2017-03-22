"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const UserDAO_1 = require('../DAO/UserDAO');
const SessionManager_1 = require("../Common/SessionManager");
const ReturnCode_1 = require("../Common/ReturnCode");
class UserController {
    constructor() {
        this.userDAO = new UserDAO_1.UserDAO();
    }
    registerUser(user, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnCode = ReturnCode_1.ReturnCode.FAILED;
            if (user.mobilePhone.length * user.password.length * user.name.length == 0) {
                callback(null, { returnCode: ReturnCode_1.ReturnCode.DATA_INVALID });
                return;
            }
            try {
                let foundUser = yield this.userDAO.findUserByMobileNumber(user.mobilePhone);
                if (foundUser != null) {
                    callback(null, { returnCode: ReturnCode_1.ReturnCode.MOBILE_NUMBER_DUPLICATE });
                    return;
                }
                let result = yield this.userDAO.saveUser(user);
                returnCode = result == true ? ReturnCode_1.ReturnCode.SUCCEEDED : ReturnCode_1.ReturnCode.FAILED;
                callback(null, { returnCode: returnCode });
            }
            catch (err) {
                console.error(err);
                callback(err, { returnCode: ReturnCode_1.ReturnCode.EXCEPTION });
            }
        });
    }
    login(mobilePhone, password, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnCode = ReturnCode_1.ReturnCode.FAILED;
            let error = null;
            let sessionID = "";
            let user = null;
            try {
                if (mobilePhone.length * password.length == 0) {
                    callback(null, { returnCode: ReturnCode_1.ReturnCode.DATA_INVALID });
                    throw new Error();
                }
                let userDAO = new UserDAO_1.UserDAO();
                user = (yield userDAO.findUserByMobileNumber(mobilePhone));
                if (user == null) {
                    returnCode = ReturnCode_1.ReturnCode.ACCOUNT_NOT_EXIST;
                    return;
                }
                else {
                    if (user.password == password) {
                        returnCode = ReturnCode_1.ReturnCode.SUCCEEDED;
                        user.password = "";
                        sessionID = (yield SessionManager_1.SessionManager.getInstance().getSessionID(user.mobilePhone));
                    }
                    else {
                        returnCode = ReturnCode_1.ReturnCode.USERNAME_OR_PASS_INCORRECT;
                    }
                }
            }
            catch (err) {
                error = err;
                returnCode = ReturnCode_1.ReturnCode.EXCEPTION;
            }
            finally {
                callback(error, { returnCode: returnCode, sessionID: sessionID, details: user });
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
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map