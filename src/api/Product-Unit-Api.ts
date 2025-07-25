import {myRequestToken} from "./Public-Api";
import ProductUnit from "../model/ProductUnit";

export async function getAllProductUnits(): Promise<ProductUnit[]> {
    const  url = `http://localhost:8083/product-unit-api/getAll`;

    const responseData = await myRequestToken(url);

    let productUnits: ProductUnit[] = [];

    for (const key in responseData) {
        productUnits.push(
            {
                productUnitId : responseData[key].productUnitId,
                productUnitName : responseData[key].productUnitName

            }
        );
    }

    return productUnits;
}