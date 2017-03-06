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
        this.userDAO.saveUser(user, function (err, result) {
            let returnCode = ReturnCode_1.ReturnCode.FAILED;
            if (err != null) {
                returnCode = ReturnCode_1.ReturnCode.EXCEPTION;
            }
            else {
                returnCode = result == true ? ReturnCode_1.ReturnCode.SUCCEEDED : ReturnCode_1.ReturnCode.FAILED;
            }
            callback(returnCode);
        });
    }
    login(mobilePhone, password, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let userDAO = new UserDAO_1.UserDAO();
            let user = (yield userDAO.findUserByUsername(mobilePhone));
            let returnCode = ReturnCode_1.ReturnCode.USERNAME_OR_PASS_INCORRECT;
            let sessionID = "";
            if (user != null) {
                if (user.password == password) {
                    returnCode = ReturnCode_1.ReturnCode.SUCCEEDED;
                    sessionID = (yield SessionManager_1.SessionManager.getInstance().getSessionID(user.mobilePhone));
                }
            }
            callback(null, { returnCode: returnCode, sessionID: sessionID });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map