class WaitingChatResponse {
    messageId ?: number;
    content ?: string;
    userId ?: number;
    userName ?: string;
    dateCreated ?: string;
    staffAssignId ?: number;
    staffAssignName ?: string;
    deleted ?: boolean;


    constructor(messageId: number, content: string, userId: number, userName: string, dateCreated: string, staffAssignId: number, staffAssignName: string, deleted: boolean) {
        this.messageId = messageId;
        this.content = content;
        this.userId = userId;
        this.userName = userName;
        this.dateCreated = dateCreated;
        this.staffAssignId = staffAssignId;
        this.staffAssignName = staffAssignName;
        this.deleted = deleted;
    }
}

export default WaitingChatResponse