import React, {ChangeEvent, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Client} from "@stomp/stompjs";
import {formatDate, formatDateTime, getUserToken} from "../../api/Public-Api";
import ChatResponse from "../../model/ChatResponse";
import {findAllChatOfUser} from "../../api/Chat-Api";

interface ChatComponentInterface {
    client : Client;
    showChat :  boolean;
    setShowChat : (value : boolean) => void;
    reloadChat : boolean;
    chatId : number;
}

const ChatComponent: React.FC<ChatComponentInterface> = ({client, showChat, setShowChat, reloadChat, chatId}) => {
    const [chats, setChats] = useState<ChatResponse[]>([]);
    const [content, setContent] = useState('');
    const handleChangeContent = (e : ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }
    // Theo dõi sự thay đổi của value
    useEffect(() => {
        if (reloadChat) {
            findAllChatOfUser().then((data) => {
                setChats(data);
            }).catch((error) => {
                console.log(error)
            });
        }
    }, [reloadChat]); // Chạy lại khi value thay đổi


     const showChatArea = () => {
         setShowChat(true);
         findAllChatOfUser().then((data) => {
             setChats(data);
         }).catch((error) => {
             console.log(error)
         });
     }

    const handleChat = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (client) {
                let chatSend = JSON.stringify({
                    formUserId: getUserToken().userId,
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
            <div hidden={showChat} onClick={() => {showChatArea()}} title={'Bạn cần tư vấn gì? Hãy chia sẻ với chúng tôi'} className="chat-icon">
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
                    <div hidden={chats.length > 0} className="chat-popup-content-default">
                        Bạn cần tư vấn gì vậy? <br/> Chúng tôi sẽ phản hồi ngay.
                    </div>
                    {
                        chats && chats.length > 0 && chats.map((chat, index) => (
                            <div key={index} className={'list-chat-box-item'}>
                                <div hidden={chat.formUserId !== getUserToken().userId}
                                     className="list-chat-box-item-formUser">
                                    <div style={{backgroundColor: '#0070f6', borderRadius: '20px', padding: '5px 10px', maxWidth:'100%', wordWrap: 'break-word'}}
                                         className={'list-chat-box-item-formUser-right'}>
                                        {chat.content}
                                    </div>
                                    <div style={{fontSize: '13px'}}>{formatDateTime(chat.dateCreated ? chat.dateCreated : '')}</div>
                                </div>
                                <div hidden={chat.formUserId === getUserToken().userId}
                                     className="list-chat-box-item-toUser">
                                    <div className={'list-chat-box-item-toUser-left'} style={{display: 'flex'}}>
                                        <div style={{
                                            backgroundColor: '#e5e5e5',
                                            borderRadius: '20px',
                                            padding: '5px 10px',
                                            maxWidth:'100%',
                                            wordWrap: 'break-word'
                                        }} className={'list-chat-box-item-toUser-right'}>
                                            {chat.content}
                                        </div>
                                    </div>

                                    <div style={{fontSize: '13px', marginLeft: '50px'}}>{formatDateTime(chat.dateCreated ? chat.dateCreated : '')}</div>

                                </div>
                            </div>
                        ))
                    }
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