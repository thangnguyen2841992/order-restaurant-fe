import CartResponse from "../model/CartResponse";
import {getUserToken, myRequest, myRequestToken} from "./Public-Api";
import Chat from "../model/Chat";
import Image from "../model/Image";

export async function getAllChatOfUser(chatId: number): Promise<Chat[]> {
    let url: string = `http://localhost:8083/chat/getAllChat?chatId=${chatId}`;


    const responseData = await myRequest(url);
    let chats: Chat[] = [];

    for (const key in responseData) {
        chats.push(
            {
                chatId: responseData[key].chatId,
                formUserId: responseData[key].formUserId,
                staffId: responseData[key].staffId,
                content: responseData[key].content,
                dateCreated: responseData[key].dateCreated,
            }
        );
    }

    return chats;
}