import Product from "../model/Product";
import {myRequestToken} from "./Public-Api";

const token = localStorage.getItem("token");

export async function getAllProductsUser(): Promise<Product[]> {
    let url: string = `http://localhost:8083/user-api/getAllProducts`;

    const responseData = await myRequestToken(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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

const calculateDiscountedPrice = (price: number): { discountedPrice: number; discountPercentage: number } => {
    const discountPercentage = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    const discountAmount = (price * discountPercentage) / 100;
    const discountedPrice = price + discountAmount;
    return {discountedPrice, discountPercentage};
};


export async function getProductByProductIdUser(productId: number): Promise<Product> {
    let url: string = `http://localhost:8083/user-api/getProductById?productId=${productId}`;

    const responseData = await myRequestToken(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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