"use strict";
var UserDAO_1 = require('../DAO/UserDAO');
var UserController = (function () {
    function UserController() {
        this.userDAO = new UserDAO_1.UserDAO();
    }
    UserController.prototype.registerUser = function (user, callback) {
        this.userDAO.saveUser(user, function (result) {
            callback(result);
        });
    };
    UserController.prototype.login = function (username, password, callback) {
        var userDAO = new UserDAO_1.UserDAO();
        userDAO.findUserByUsername(username, function (user, err) {
            var result = false;
            if (user != null) {
                result = user.password == password;
            }
            callback(result);
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map