class TotalQuantityProductResponse {
    productId ?: number;

    productName ?: string;
    brandName ?: string;
    productUnitName ?: string;

    totalQuantity ?: number;
    month ?: number;
    totalPrice ?: number;
    productPrice ?: number;


    constructor(productId: number, productName: string, brandName: string, productUnitName: string, totalQuantity: number, month: number, totalPrice: number, productPrice: number) {
        this.productId = productId;
        this.productName = productName;
        this.brandName = brandName;
        this.productUnitName = productUnitName;
        this.totalQuantity = totalQuantity;
        this.month = month;
        this.totalPrice = totalPrice;
        this.productPrice = productPrice;
    }
}
export default TotalQuantityProductResponse