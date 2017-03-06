export class User{
    userId: number;
    username: string;
    password: string;
    name: string;
    email: string;
    mobilePhone: string;
    constructor(mobilePhone: string){
        this.mobilePhone = mobilePhone;
    }
}

