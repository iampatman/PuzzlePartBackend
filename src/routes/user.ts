import {Router} from 'express';

const users = Router();

/* GET users listing. */
users.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
users.get('/user', function(req, res, next) {
  res.render('index', { title: 'Visual Studio Code!' });
});
export default users;
