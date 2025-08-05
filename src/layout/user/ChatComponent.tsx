import React, {ChangeEvent, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faMessage, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Client} from "@stomp/stompjs";
import {getUserToken} from "../../api/Public-Api";
import {getAllChatOfUser} from "../../api/Chat-Api";
import Chat from "../../model/Chat";

interface ChatComponentInterface {
    client : Client;
    showChat :  boolean;
    setShowChat : (value : boolean) => void;
    reloadChat : boolean;
    chatId : number;
}

const ChatComponent: React.FC<ChatComponentInterface> = ({client, showChat, setShowChat, reloadChat, chatId}) => {
    const [chats, setChats] = useState<Chat[]>([]);
    useEffect(() => {
        getAllChatOfUser(chatId).then((data) => {
            setChats(data);
        })
    }, [reloadChat]);

    const [content, setContent] = useState('');
    const handleChangeContent = (e : ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }
    const handleChat = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (client) {
                let chatSend = JSON.stringify({
                    formUserId: getUserToken().userId,
                    staffId: 0,
                    content : content
                })
                client.publish({
                    destination: '/app/add-chat',
                    body: chatSend
                });
                setContent('');
            }
        }
    }
    return (
        <div className={'chat-area'}>
            <div hidden={showChat} onClick={() => {setShowChat(true);}} title={'Bạn cần tư vấn gì? Hãy chia sẻ với chúng tôi'} className="chat-icon">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </div>
            <div hidden={!showChat} className="chat-popup-area">
                    <div className="chat-popup-header">
                        <div className="chat-popup-header-left">
                            {chatId !== 0 ? chatId : 'Đang chờ...'}
                        </div>
                        <div onClick={()=> {setShowChat(false);}} title={'Đóng cửa sổ chat'} className="chat-popup-header-right">
                            <FontAwesomeIcon icon={faClose}/>
                        </div>
                    </div>
                <div className="chat-popup-content">
                    <div className="chat-popup-content-default">
                        Bạn cần tư vấn gì vậy? <br/> Chúng tôi sẽ phản hồi ngay.
                    </div>
                </div>
                <div className="chat-popup-form">
                    <div className="chat-popup-form-left">
                        <input value={content} type="text"  placeholder={'Hãy nhập gì đó'} onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {handleChat(event);}} onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeContent(e)}/>
                        <span>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatComponent