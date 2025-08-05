class Chat {
    chatId ?: number;

    formUserId ?: number;

    staffId ?: number;
    content ?: string;
    dateCreated ?: string;


    constructor(chatId: number, formUserId: number, staffId: number, content: string, dateCreated: string) {
        this.chatId = chatId;
        this.formUserId = formUserId;
        this.staffId = staffId;
        this.content = content;
        this.dateCreated = dateCreated;
    }
}

export default Chat