import ProductCart from "./ProductCart";

class CartResponse {
    cartId ?: number;
    userId ?: number;
    totalPrice ?: number;
    totalProduct ?: number;
    productCartList ?: ProductCart[];
    dateCreated ?: string;


    constructor(cartId: number, userId: number, totalPrice: number, totalProduct: number, productCartList: ProductCart[], dateCreated: string) {
        this.cartId = cartId;
        this.userId = userId;
        this.totalPrice = totalPrice;
        this.totalProduct = totalProduct;
        this.productCartList = productCartList;
        this.dateCreated = dateCreated;
    }
}
export default  CartResponse