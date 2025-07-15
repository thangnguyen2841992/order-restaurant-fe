import {getUserToken, myRequestToken} from "./Public-Api";
import CartResponse from "../model/CartResponse";

export async function getCartResponseOfUserId(): Promise<CartResponse> {
    const userTokenId = getUserToken().userId;
    const url = `http://localhost:8083/cart-api/getAllProductCartOfUserId?userId=${userTokenId}`;

    const token = localStorage.getItem("token");


    const responseData = await myRequestToken(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return {
        cartId: responseData.cartId,
        userId: responseData.userId,
        productCartList: responseData.productCartList,
        dateCreated: responseData.dateCreated

    };
}