import {OrderDetail} from "./OrderDetail";
/**
 * Created by NguyenTrung on 22/3/17.
 */
export class Order {
    orderId: number
    transactionId: number;
    notes: string;
    createdDate: Date;
    planned_pickup_time: Date;
    actual_pickup_time: Date;
    status: number;
    details: [OrderDetail];

    constructor() {

    }
}