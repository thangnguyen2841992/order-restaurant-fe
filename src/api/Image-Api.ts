import {myRequest} from "./Public-Api";
import Image from "../model/Image";

export async function getAllImagesOfProductId(productId : number): Promise<Image[]> {
    let url: string = `http://localhost:8083/image-api/getAllImagesOfProduct?productId=${productId}`;


    const responseData = await myRequest(url);
    let images: Image[] = [];

    for (const key in responseData) {
        images.push(
            {
                productId: responseData[key].product.productId,
                imageId: responseData[key].imageId,
                imageLink: responseData[key].imageLink,
                imageDescription: responseData[key].imageDescription,
                dateCreated: responseData[key].dateCreated,
            }
        );
    }

    return images;
}
