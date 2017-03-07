import {SubscriptionDetail} from "./SubscriptionDetail";
import {Discount} from "./Discount";
/**
 * Created by NguyenTrung on 24/2/17.
 */
export class SubscriptionItem{
    subscription_id: number;
    name: string;
    smallImage: string;
    introduction: string;
    rating: number;
    companyName: string;
    companyId: string;
    itemDescription: string;
    details: [SubscriptionDetail];
    discounts: [Discount];

    constructor(){
    }
}



