import {myRequestToken} from "./Public-Api";
import Brand from "../model/Brand";

export async function getAllBrands(): Promise<Brand[]> {
    const  url = `http://localhost:8083/brand-api/getAllBrands`;

    const token = localStorage.getItem("token");


    const responseData = await myRequestToken(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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