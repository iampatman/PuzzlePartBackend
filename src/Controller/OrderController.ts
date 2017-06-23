/**
 * Created by NguyenTrung on 17/3/17.
 */
import {SubscriptionDAO} from "../DAO/SubscriptionDAO";
import {PricingDAO} from "../DAO/PricingDAO";
import {TransactionDAO} from "../DAO/TransactionDAO";
import {Transaction} from "../model/Transaction";
import {ReturnCode} from "../Common/ReturnCode";
import {UtilsTS} from "../Common/UtilsTS";
import {SessionManager} from "../Common/SessionManager";
import {Discount} from "../model/Discount";
import {DiscountDAO} from "../DAO/DiscountDAO";
import {Pricing} from "../model/Pricing";
import {ProductDAO} from "../DAO/ProductDAO";


/**
 * Created by NguyenTrung on 24/2/17.
 */


export class OrderController {
    productDAO: ProductDAO;

    constructor() {
        this.productDAO = new ProductDAO();
    }

    async saveOrder(data, callback) {
    }

}