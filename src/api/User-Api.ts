import Product from "../model/Product";
import {getUserToken, myRequestToken} from "./Public-Api";
import Notification from "../model/Notification";

export async function getAllProductsUser(): Promise<Product[]> {
    let url: string = `http://localhost:8083/user-api/getAllProducts`;

    const responseData = await myRequestToken(url);

    let products: Product[] = [];

    for (const key in responseData) {
        products.push(
            {
                productId: responseData[key].productId,
                productName: responseData[key].productName,
                productPrice: responseData[key].productPrice,
                description: responseData[key].description,
                dateCreated: responseData[key].dateCreated,
                quantity: responseData[key].quantity,
                point: responseData[key].point,
                brand: responseData[key].brand,
                productUnit: responseData[key].productUnit,
                isDelete: responseData[key].delete,
                productOriginalPrice : calculateDiscountedPrice(responseData[key].productPrice).discountedPrice,
                productPercent : calculateDiscountedPrice(responseData[key].productPrice).discountPercentage


            }
        );
    }

    return products;
}

export async function getAllNotificationUser(): Promise<Notification[]> {
    let url: string = `http://localhost:8083/user-api/getAllNotificationsOfUser?userId=${getUserToken().userId}`;

    const responseData = await myRequestToken(url);

    let notifications: Notification[] = [];

    for (const key in responseData) {
        notifications.push(
            {
                notificationId: responseData[key].notificationId,
                toUserId: responseData[key].toUserId,
                orderId: responseData[key].orderId,
                message: responseData[key].message,
                isStaff: responseData[key].staff,
            }
        );
    }

    return notifications;
}

const calculateDiscountedPrice = (price: number): { discountedPrice: number; discountPercentage: number } => {
    const discountPercentage = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    const discountAmount = (price * discountPercentage) / 100;
    const discountedPrice = price + discountAmount;
    return {discountedPrice, discountPercentage};
};


export async function getProductByProductIdUser(productId: number): Promise<Product> {
    let url: string = `http://localhost:8083/user-api/getProductById?productId=${productId}`;

    const responseData = await myRequestToken(url);

    return {
        productId: responseData.productId,
        productName: responseData.productName,
        productPrice: responseData.productPrice,
        description: responseData.description,
        dateCreated: responseData.dateCreated,
        quantity: responseData.quantity,
        point: responseData.point,
        brand: responseData.brand,
        productUnit: responseData.productUnit,
        isDelete: responseData.delete

    };
}