import Delivery from "./Delivery";
import Payment from "./Payment";
import User from "./User";
import ProductOrder from "./ProductOrder";

class OrderResponse {
     orderId ?: number;
     userId ?: User;
     totalPrice ?: number;
     isDelete ?: boolean;
     isProcess ?: boolean;
     isPaymented ?: boolean;
     isDone ?: boolean;
     deliveryId ?: Delivery;
     paymentId ?: Payment;
     description ?: string;
     dateCreated ?: string;
     dateUpdated ?: string;
     productOrder ?: ProductOrder[];


    constructor(orderId: number, userId: User, totalPrice: number, isDelete: boolean, isProcess: boolean, isPaymented: boolean, isDone: boolean, deliveryId: Delivery, paymentId: Payment, description: string, dateCreated: string, dateUpdated: string, productOrder: ProductOrder[]) {
        this.orderId = orderId;
        this.userId = userId;
        this.totalPrice = totalPrice;
        this.isDelete = isDelete;
        this.isProcess = isProcess;
        this.isPaymented = isPaymented;
        this.isDone = isDone;
        this.deliveryId = deliveryId;
        this.paymentId = paymentId;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.productOrder = productOrder;
    }
}

export default OrderResponse;