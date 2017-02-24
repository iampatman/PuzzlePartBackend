import {SubscriptionDAO} from "../DAO/SubscriptionDAO";
/**
 * Created by NguyenTrung on 24/2/17.
 */



export class SubscriptionController {
    subDAO: SubscriptionDAO;

    constructor() {
        this.subDAO = new SubscriptionDAO();
    }


    getSubscriptionItemList(callback){
        this.subDAO.getSubscriptionItemListByCat(-1, function (list) {
            callback(list)

        })
    }
}