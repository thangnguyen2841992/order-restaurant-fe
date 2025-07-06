import {myRequestToken} from "./Public-Api";
import Product from "../model/Product";

export async function getAllProducts(): Promise<Product[]> {
    let url: string = `http://localhost:8083/staff-api/getAllProducts`;

    const token = localStorage.getItem("token");


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
                point: responseData[key].point,
                brand: responseData[key].brand,
                productUnit: responseData[key].productUnit
            }
        );
    }

    return products;
}
