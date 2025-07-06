class Image {
    imageId ?: number;
    productId ?: number;

    imageLink ?: string;

    dateCreated ?: string;

    imageDescription ?: string;


    constructor(imageId: number, productId: number, imageLink: string, dateCreated: string, imageDescription: string) {
        this.imageId = imageId;
        this.productId = productId;
        this.imageLink = imageLink;
        this.dateCreated = dateCreated;
        this.imageDescription = imageDescription;
    }
}

export default Image