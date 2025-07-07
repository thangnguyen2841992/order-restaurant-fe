import {myRequestToken} from "./Public-Api";
import Product from "../model/Product";

const token = localStorage.getItem("token");

export async function getAllProducts(): Promise<Product[]> {
    let url: string = `http://localhost:8083/staff-api/getAllProducts`;

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
                productUnit: responseData[key].productUnit
            }
        );
    }

    return products;
}

export async function getAllProductsOfBrand(brandId: number): Promise<Product[]> {
    let url: string = `http://localhost:8083/staff-api/getAllProductsOfBrand?brandId=${brandId}`;

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
                productUnit: responseData[key].productUnit
            }
        );
    }

    return products;
}

export async function getProductByProductId(productId: number): Promise<Product> {
    let url: string = `http://localhost:8083/staff-api/getProductById?productId=${productId}`;

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
        productUnit: responseData.productUnit
    };
}
