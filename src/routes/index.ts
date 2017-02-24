import {Router} from 'express';
import {User} from "../model/User";
import * as bodyParser from 'body-parser';
import {UserController} from '../Controller/UserController';
import {SubscriptionController} from '../Controller/SubscriptionController';


const index = Router();
var userController = new UserController();
var subController = new SubscriptionController();
/* GET home page. */
index.get('/', function (req, res, next) {
    res.render('index', {title: 'Visual Studio Code!'});
});

/* GET Quick Start. */
index.get('/quickstart', function (req, res, next) {
    res.render('quickstart');
});

index.get('/user/register', function (req, res, next) {

    let user = new User("nguyentrung0904");
    console.log(user.username)
    let json = JSON.stringify(user);
    res.setHeader("content-type", "application/json");
    res.send(user);

});
index.post('/user/register', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))

    let user = new User(data.username);
    user.password = data.password
    userController.registerUser(user, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'result': result
        }))
    });

});

index.post('/user/login', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body))
    let username = data.username;
    let password = data.password;
    userController.login(username, password, function (result) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'result': result
        }))
    });

});


index.get('/subscription/get', function (req, res, next) {
    // let data = JSON.parse(JSON.stringify(req.body))
    // let username = data.username;
    // let password = data.password;
    subController.getSubscriptionItemList(function (list) {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            'list': list
        }))
    })


});
export default index;
