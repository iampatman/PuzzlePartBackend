export class User{
    userId: number;
    username: string;
    password: string;
    email: string;
    mobilePhone: string;

    constructor(username: string){
        this.username = username;
    }
}

let user = new User("Nguen");
user.userId = 3;
console.log(user.userId)


