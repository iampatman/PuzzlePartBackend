import { User } from '../model/User';
import { UserDAO } from '../DAO/UserDAO';


export class UserController {
    userDAO: UserDAO;
    constructor(){
        this.userDAO = new UserDAO();
    }
    registerUser(user: User, callback){
        this.userDAO.saveUser(user, function (result) {
            callback(result)
        });

    }

    login(username: string, password: string, callback){
        let userDAO = new UserDAO();
        userDAO.findUserByUsername(username, function (user, err) {
            let result = false;
            if (user!=null){
                result = user.password == password;
            }
            callback(result)
        });

    }

}
