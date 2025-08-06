class Notification {
    notificationId ?: number;

    toUserId ?: number;

    orderId ?: number;
    chatId ?: number;

    message ?: string;

    dateCreated ?: string;

    isStaff ?: boolean;
    isChat ?: boolean;


    constructor(notificationId: number, toUserId: number, orderId: number, chatId: number, message: string, dateCreated: string, isStaff: boolean, isChat: boolean) {
        this.notificationId = notificationId;
        this.toUserId = toUserId;
        this.orderId = orderId;
        this.chatId = chatId;
        this.message = message;
        this.dateCreated = dateCreated;
        this.isStaff = isStaff;
        this.isChat = isChat;
    }
}
export default Notification