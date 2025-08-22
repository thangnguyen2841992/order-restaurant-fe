import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faComment} from "@fortawesome/free-solid-svg-icons";
import {findWaitingChatByDeleted, getAllChatRoomOfStaffId} from "../../api/Staff-Api";
import WaitingChatResponse from "../../model/WaitingChatResponse";
import notification from "../../model/Notification";
import {getUserToken} from "../../api/Public-Api";
import {Client} from "@stomp/stompjs";
import ChatRoomResponse from "../../model/ChatRoomResponse";
import ChatComponent from "../user/ChatComponent";

interface ChatStaffInterface {
    reloadChat: boolean;
    reloadChatRoom: boolean;
    showChatStaff: boolean;
    showChatPopUp: boolean;
    setShowChatStaff: (showChatStaff: boolean) => void;
    setChatRoomId: (showChatStaff: number) => void;
    setShowChatPopUp: (showChatStaff: boolean) => void;
    setReloadChatRoom: (showChatStaff: boolean) => void;
    setReloadChat: (showChatStaff: boolean) => void;
    client: Client;
    isVisible: number[];
    chatRoomId: number;

}

const ChatStaff: React.FC<ChatStaffInterface> = ({
                                                     showChatStaff,
                                                     setShowChatStaff,
                                                     reloadChat,
                                                     client,
                                                     reloadChatRoom,
                                                     setReloadChatRoom,
                                                     setReloadChat,
                                                     isVisible,
                                                     showChatPopUp,
                                                     setShowChatPopUp,
                                                     chatRoomId,
                                                     setChatRoomId
                                                 }) => {
    const [waitingChats, setWaitingChats] = useState<WaitingChatResponse[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoomResponse[]>([]);
    const [showWaitingChat, setShowWaitingChat] = useState(true);
    const [showChatRoom, setShowChatRoom] = useState(false);
    useEffect(() => {
        findWaitingChatByDeleted().then((data) => {
            setWaitingChats(data);
        }).catch((error) => {
            console.log(error);
        })
        getAllChatRoomOfStaffId().then((data) => {
            setChatRooms(data);
        }).catch((error) => {
            console.log(error);
        })
        setReloadChat(false);
    }, [reloadChat]);

    const showChatRoomArea = () => {
        setShowChatRoom(true);
        setShowWaitingChat(false);
        getAllChatRoomOfStaffId().then((data) => {
            setChatRooms(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleAddChatRoom = (messageId: number) => {
        if (client) {
            let chatSend = JSON.stringify({
                messageId: messageId,
                staffId: getUserToken().userId
            })
            client.publish({
                destination: '/app/add-chatRoom',
                body: chatSend
            });
        }
    }
    const handleCloseChatRoom = (chatRoomId: number) => {
        if (client) {
            let chatSend = JSON.stringify({
                chatRoomId: chatRoomId,
            })
            client.publish({
                destination: '/app/close-chatRoom',
                body: chatSend
            });
        }
    }
    return (
        <div className={'chat-staff-area'}>
            <div onClick={() => {
                setShowChatStaff(!showChatStaff)
            }} hidden={showChatStaff} className="chat-icon">
                <FontAwesomeIcon icon={faComment}/>
            </div>
            <div hidden={!showChatStaff} className="chat-staff-list-waiting-chat">
                <div className="chat-staff-list-waiting-chat-header">
                    <div className="chat-staff-list-waiting-chat-header-left">
                            <span onClick={() => {
                                setShowWaitingChat(true);
                                setShowChatRoom(false);
                            }}>
                                Danh sách tin nhắn chờ
                            </span>
                        <span> | </span>
                        <span onClick={() => {
                            showChatRoomArea();
                        }}>
                                Danh sách phòng chat
                            </span>
                    </div>
                    <div onClick={() => {
                        setShowChatStaff(false)
                    }} className="chat-staff-list-waiting-chat-header-right">
                        <FontAwesomeIcon icon={faClose}/>
                    </div>
                </div>
                <div className="chat-staff-list-waiting-chat-content" hidden={!showWaitingChat}>
                    <div className="chat-staff-list-waiting-chat-content-header">
                        <div className="chat-staff-list-waiting-chat-content-process">
                            Stt
                        </div>
                        <div className="chat-staff-list-waiting-chat-content-name">
                            Khách hàng
                        </div>
                        <div className="chat-staff-list-waiting-chat-content-process">
                            Trạng thái
                        </div>

                        <div className="chat-staff-list-waiting-chat-content-process">
                            Hành động
                        </div>

                    </div>
                    {
                        waitingChats && waitingChats.length > 0 && waitingChats.map((waitingChat: WaitingChatResponse, index: number) => (
                            <div className="chat-staff-list-waiting-chat-content-item">
                                <div className="chat-staff-list-waiting-chat-content-process-item">
                                    {index + 1}
                                </div>
                                <div className="chat-staff-list-waiting-chat-content-name-item">
                                    {waitingChat.userName}
                                </div>
                                <div className="chat-staff-list-waiting-chat-content-process-item">
                                    Đang chờ
                                </div>

                                <div className="chat-staff-list-waiting-chat-content-process-item">
                                    <button
                                        onClick={() => handleAddChatRoom(waitingChat.messageId ? waitingChat.messageId : 0)}
                                        className={'btn btn-outline-primary'}>Xử lý
                                    </button>
                                </div>

                            </div>
                        ))

                    }

                </div>
                <div className="chat-staff-list-waiting-chat-content" hidden={!showChatRoom}>
                    <div className="chat-staff-list-waiting-chat-content-header">
                        <div className="chat-staff-list-waiting-chat-content-process">
                            Stt
                        </div>
                        <div className="chat-staff-list-waiting-chat-content-name">
                            Khách hàng
                        </div>
                        <div className="chat-staff-list-waiting-chat-content-process">
                            Trạng thái
                        </div>

                        <div className="chat-staff-list-waiting-chat-content-process">
                            Hành động
                        </div>

                    </div>
                    {
                        chatRooms && chatRooms.length > 0 && chatRooms.map((chatResponse: ChatRoomResponse, index: number) => (
                            <div style={{
                                backgroundColor: isVisible.includes(Number(chatResponse.chatRoomId))  ? 'orange' : 'transparent',
                                transition: 'background-color 0.5s ease',
                            }} className={`chat-staff-list-waiting-chat-content-item  ${isVisible.includes(Number(chatResponse.chatRoomId))   ? 'blink' : ''}`}>
                                <div className="chat-staff-list-waiting-chat-content-process-item">
                                    {index + 1}
                                </div>
                                <div className="chat-staff-list-waiting-chat-content-name-item">
                                    {chatResponse.formUsername}
                                </div>
                                <div className="chat-staff-list-waiting-chat-content-process-item">
                                    <button onClick={() => {
                                        setShowChatPopUp(true);
                                        setReloadChatRoom(true);
                                        setChatRoomId(chatResponse.chatRoomId ? chatResponse.chatRoomId : 0)
                                    }} className={'btn btn-outline-success'}>Trò chuyện
                                    </button>
                                </div>

                                <div className="chat-staff-list-waiting-chat-content-process-item">
                                    <button onClick={() => {
                                        handleCloseChatRoom(chatResponse.chatRoomId ? chatResponse.chatRoomId : 0)
                                    }} className={'btn btn-outline-danger'}>Kết thúc
                                    </button>
                                </div>

                            </div>
                        ))

                    }

                </div>

            </div>
            <ChatComponent isStaff={true} setReloadChat={setReloadChatRoom} reloadChat={reloadChatRoom}
                           chatRoomId={chatRoomId ? chatRoomId : 0} client={client ? client : new Client()}
                           showChat={showChatPopUp} setShowChat={setShowChatPopUp}/>
        </div>
    )

}
export default ChatStaff;