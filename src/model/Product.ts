import Brand from "./Brand";
import ProductUnit from "./ProductUnit";
import brand from "./Brand";
import productUnit from "./ProductUnit";

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


    constructor(productId: number, productName: string, productPrice: number, description: string, dateCreated: string, point: number, quantity: number, brand: Brand, productUnit: ProductUnit) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.description = description;
        this.dateCreated = dateCreated;
        this.point = point;
        this.quantity = quantity;
        this.brand = brand;
        this.productUnit = productUnit;
    }
}

export default Product