import {myRequestToken} from "./Public-Api";
import Product from "../model/Product";
import Notification from "../model/Notification";

export async function getAllProducts(): Promise<Product[]> {
    let url: string = `http://localhost:8083/staff-api/getAllProducts`;

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
                isDelete: responseData[key].delete

            }
        );
    }

    return products;
}

export async function getAllProductsOfBrand(brandId: number): Promise<Product[]> {
    let url: string = `http://localhost:8083/staff-api/getAllProductsOfBrand?brandId=${brandId}`;

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
                isDelete: responseData[key].delete

            }
        );
    }

    return products;
}

export async function getAllNotificationsOfStaff(): Promise<Notification[]> {
    let url: string = `http://localhost:8083/staff-api/getAllNotificationsOfStaff`;

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


export async function getProductByProductId(productId: number): Promise<Product> {
    let url: string = `http://localhost:8083/staff-api/getProductById?productId=${productId}`;

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


