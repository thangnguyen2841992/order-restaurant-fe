import ChatResponse from "../model/ChatResponse";
import {getUserToken, myRequestToken} from "./Public-Api";

export async function findAllChatOfUser(): Promise<ChatResponse[]> {
    let url: string = `http://localhost:8083/all-api/findAllChatOfUser?userId=${getUserToken().userId}`;

    const responseData = await myRequestToken(url);

    let chatResponses: ChatResponse[] = [];

    for (const key in responseData) {
        chatResponses.push(
            {
                formUserId: responseData[key].formUserId,
                formUserName: responseData[key].formUserName,
                toUserId: responseData[key].toUserId,
                toUserName: responseData[key].toUserName,
                chatRoomId: responseData[key].chatRoomId,
                content: responseData[key].content,
                showPopup: responseData[key].showPopup,
                dateCreated: responseData[key].dateCreated
            }
        );
    }

    return chatResponses;
}