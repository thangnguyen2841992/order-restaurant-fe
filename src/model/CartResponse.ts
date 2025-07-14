import ProductCart from "./ProductCart";

class CartResponse {
    cartId ?: number;
    userId ?: number;
    productCartList ?: ProductCart[];
    dateCreated ?: string;

}
export default  CartResponse