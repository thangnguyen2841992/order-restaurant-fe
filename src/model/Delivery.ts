class Delivery {
    deliveryId ?: number;
    name ?: string;


    constructor(deliveryId: number, name: string) {
        this.deliveryId = deliveryId;
        this.name = name;
    }
}

export default Delivery;