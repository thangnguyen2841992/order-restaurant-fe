import Product from "../model/Product";
import {myRequestToken} from "./Public-Api";
import OrderResponse from "../model/OrderResponse";

export async function getAllOrder(): Promise<OrderResponse[]> {
    let url: string = `http://localhost:8083/staff-api/getAllOrder`;

    const responseData = await myRequestToken(url);


    let orders: OrderResponse[] = [];

    for (const key in responseData) {
        orders.push(
            {
                orderId: responseData[key].orderId,
                userId: responseData[key].userId,
                totalPrice: responseData[key].totalPrice,
                isDelete: responseData[key].delete,
                isProcess: responseData[key].process,
                isPaymented: responseData[key].paymented,
                isDone: responseData[key].done,
                deliveryId: responseData[key].deliveryId,
                paymentId: responseData[key].paymentId,
                description: responseData[key].description,
                dateCreated: responseData[key].dateCreated,
                dateUpdated: responseData[key].dateUpdated,
                productOrder: responseData[key].productOrder,
            }
        );
    }

    return orders;
}