import construct = Reflect.construct;
/**
 * Created by NguyenTrung on 28/2/17.
 */


export class SessionManager {
    private static _instance: SessionManager = null;

    constructor() {

    }

    static getInstance() {
        if (this._instance == null) {
            this._instance = new SessionManager();
        }

        return this._instance;
    }

    async getSessionID(username) {
        return new Promise((resolve, reject) => {
            resolve(username + "-123-ABC");
        });
    }

    async checkSessionID(sessionId, username) {
        return new Promise((resolve, reject) => {
            resolve(true)
        })

    }
}