"use strict";
var User = (function () {
    function User(username) {
        this.username = username;
    }
    return User;
}());
exports.User = User;
var user = new User("Nguen");
user.userId = 3;
console.log(user.userId);
//# sourceMappingURL=User.js.map