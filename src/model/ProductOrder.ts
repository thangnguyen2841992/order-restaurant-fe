class ProductOrder {
    productOrderId ?: number;

    orderId ?: number;

    quantity ?: number;

    productId ?: number;

    dateCreated ?: string;

    isDelete ?: string;


    constructor(productOrderId: number, orderId: number, quantity: number, productId: number, dateCreated: string, isDelete: string) {
        this.productOrderId = productOrderId;
        this.orderId = orderId;
        this.quantity = quantity;
        this.productId = productId;
        this.dateCreated = dateCreated;
        this.isDelete = isDelete;
    }
}

export default ProductOrder;