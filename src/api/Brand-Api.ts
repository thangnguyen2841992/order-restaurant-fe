import {myRequestToken} from "./Public-Api";
import Brand from "../model/Brand";

export async function getAllBrands(): Promise<Brand[]> {
    const  url = `http://localhost:8083/brand-api/getAllBrands`;

    const responseData = await myRequestToken(url);

    let brands: Brand[] = [];

    for (const key in responseData) {
        brands.push(
            {
                brandId : responseData[key].brandId,
                brandName : responseData[key].brandName

            }
        );
    }

    return brands;
}