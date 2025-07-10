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
                isDelete: responseData[key].delete

            }
        );
    }

    return products;
}