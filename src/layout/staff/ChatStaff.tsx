import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faComment} from "@fortawesome/free-solid-svg-icons";
import {findWaitingChatByDeleted} from "../../api/Staff-Api";
import WaitingChatResponse from "../../model/WaitingChatResponse";
import notification from "../../model/Notification";

interface ChatStaffInterface {
    reloadChat:boolean;
    showChatStaff: boolean;
    setShowChatStaff: (showChatStaff: boolean) => void;
}
const ChatStaff : React.FC<ChatStaffInterface> = ({showChatStaff, setShowChatStaff, reloadChat}) => {
    const [waitingChats, setWaitingChats] = useState<WaitingChatResponse[]>([]);
    const [showWaitingChat, setShowWaitingChat] = useState(true);
    const [showChatRoom, setShowChatRoom] = useState(false);
    useEffect(() => {
        findWaitingChatByDeleted().then((data) =>{
            setWaitingChats(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [reloadChat]);

    const handleAddChatRoom = (messageId : number) => {

    }
  return (
      <div className={'chat-staff-area'}>
          <div onClick={() => {setShowChatStaff(!showChatStaff)}} hidden={showChatStaff} className="chat-icon">
              <FontAwesomeIcon icon={faComment} />
          </div>
            <div hidden={!showChatStaff} className="chat-staff-list-waiting-chat">
                    <div className="chat-staff-list-waiting-chat-header">
                        <div className="chat-staff-list-waiting-chat-header-left">
                            <span onClick={() => {setShowWaitingChat(true); setShowChatRoom(false)}}>
                                Danh sách tin nhắn chờ
                            </span>
                            <span> | </span>
                            <span onClick={() => {setShowChatRoom(true); setShowWaitingChat(false)}}>
                                Danh sách phòng chat
                            </span>
                        </div>
                        <div onClick={() => {setShowChatStaff(false)}} className="chat-staff-list-waiting-chat-header-right">
                            <FontAwesomeIcon icon={faClose} />
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
                        waitingChats && waitingChats.length > 0  && waitingChats.map((waitingChat: WaitingChatResponse, index : number) => (
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
                                    <button onClick={() => handleAddChatRoom(waitingChat.messageId ? waitingChat.messageId : 0)} className={'btn btn-outline-primary'}>Xử lý</button>
                                </div>

                            </div>
                        ))

                    }

                </div>
            </div>

      </div>
  )

}
export default ChatStaff;