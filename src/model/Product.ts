import Brand from "./Brand";
import ProductUnit from "./ProductUnit";

class Product {
    productId ?: number;

    productName ?: string;

    productPrice ?: number;

    description ?: string;

    dateCreated ?: string;

    point ?: number;
    quantity ?: number;

    brand ?: Brand;
    productUnit ?: ProductUnit;
    isDelete ?: boolean;


    constructor(productId: number, productName: string, productPrice: number, description: string, dateCreated: string, point: number, quantity: number, brand: Brand, productUnit: ProductUnit, isDelete: boolean) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.description = description;
        this.dateCreated = dateCreated;
        this.point = point;
        this.quantity = quantity;
        this.brand = brand;
        this.productUnit = productUnit;
        this.isDelete = isDelete;
    }
}

export default Product