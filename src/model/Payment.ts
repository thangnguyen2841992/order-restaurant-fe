class Payment {
    paymentId ?: number;
    name ?: string;


    constructor(paymentId: number, name: string) {
        this.paymentId = paymentId;
        this.name = name;
    }
}

export default Payment;