class ProductCart {
    productCartId ?: number;

    cartId ?: number;

    productId ?: number;

    quantity ?: number;

    dateCreated ?: string;

    dateUpdated ?: string;


    constructor(productCartId: number, cartId: number, productId: number, quantity: number, dateCreated: string, dateUpdated: string) {
        this.productCartId = productCartId;
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }
}

export default ProductCart