import {Router} from 'express';
import {UserController} from "../Controller/UserController";
import {User} from "../model/User";
import {UtilsTS} from "../Common/UtilsTS";
import {ReturnCode} from "../Common/ReturnCode";

const user = Router();
var userController = new UserController();

/* GET users listing. */
// users.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// users.get('/user', function(req, res, next) {
//   res.render('index', { title: 'Visual Studio Code!' });
// });




user.post('/register', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let mobilePhone = data.mobilePhone;
    let user = new User(mobilePhone);
    user.password = data.password
    user.name = data.name
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([mobilePhone, user.password, user.name], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            userController.registerUser(user, function (err, result) {
                res.send(result);
            });
        }
    })
});


user.post('/login', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let mobilePhone = data.mobilePhone;
    let password = data.password;
    let sig = data.sig
    res.setHeader("content-type", "application/json");
    UtilsTS.validateChecksum([mobilePhone, password], sig).then((validRequest) => {
        if (validRequest == false) {
            res.send(JSON.stringify({returnCode: ReturnCode.CHECKSUM_INCORRECT}))
        } else {
            userController.login(mobilePhone, password, function (err, result) {
                res.send(result)
            });
        }
    })
});
export default user;
