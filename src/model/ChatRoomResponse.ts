class chatRoomResponse {
    chatRoomId ?: number;

    formUserId ?: number;
    formUsername ?: string;

    staffId ?: number;
    staffName ?: string;

    dateCreated ?: string;

    isClosed ?: boolean;


    constructor(chatRoomId: number, formUserId: number, formUsername: string, staffId: number, staffName: string, dateCreated: string, isClosed: boolean) {
        this.chatRoomId = chatRoomId;
        this.formUserId = formUserId;
        this.formUsername = formUsername;
        this.staffId = staffId;
        this.staffName = staffName;
        this.dateCreated = dateCreated;
        this.isClosed = isClosed;
    }
}
export default chatRoomResponse