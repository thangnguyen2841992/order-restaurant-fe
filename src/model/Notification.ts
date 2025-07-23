class Notification {
    notificationId ?: number;

    toUserId ?: number;

    orderId ?: number;

    message ?: string;

    dateCreated ?: string;

    isStaff ?: boolean;


    constructor(notificationId: number, toUserId: number, orderId: number, message: string, dateCreated: string, isStaff: boolean) {
        this.notificationId = notificationId;
        this.toUserId = toUserId;
        this.orderId = orderId;
        this.message = message;
        this.dateCreated = dateCreated;
        this.isStaff = isStaff;
    }
}
export default Notification