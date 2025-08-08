class ChatResponse {
    formUserId ?: number;

    formUserName ?: string;
    toUserId ?: number;

    toUserName ?: string;

    chatRoomId ?: number;

    content ?: string;

    dateCreated ?: string;
    showPopup ?: boolean;


    constructor(formUserId: number, formUserName: string, toUserId: number, toUserName: string, chatRoomId: number, content: string, dateCreated: string, showPopup: boolean) {
        this.formUserId = formUserId;
        this.formUserName = formUserName;
        this.toUserId = toUserId;
        this.toUserName = toUserName;
        this.chatRoomId = chatRoomId;
        this.content = content;
        this.dateCreated = dateCreated;
        this.showPopup = showPopup;
    }
}

export default ChatResponse