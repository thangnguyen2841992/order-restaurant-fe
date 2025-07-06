import Brand from "./Brand";
import ProductUnit from "./ProductUnit";

class Product {
    productId ?: number;

    productName ?: string;

    productPrice ?: number;

    description ?: string;

    dateCreated ?: string;

    point ?: number;

    brand ?: Brand;
    productUnit ?: ProductUnit;


    constructor(productId: number, productName: string, productPrice: number, description: string, dateCreated: string, point: number, brand: Brand, productUnit: ProductUnit) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.description = description;
        this.dateCreated = dateCreated;
        this.point = point;
        this.brand = brand;
        this.productUnit = productUnit;
    }
}

export default Product