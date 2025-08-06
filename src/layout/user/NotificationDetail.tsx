import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {formatDateTime, getUserToken} from "../../api/Public-Api";
import Notification from "../../model/Notification";
import {Client} from "@stomp/stompjs";
import notification from "../../model/Notification";

interface NotificationDetailInterface {
    showNotificationArea: boolean;
    totalNotification: number;
    notifications: Notification[];
    setShowNotificationArea: (value: boolean) => void;
    setShowChatArea: (value: boolean) => void;
    type: string;
    client: Client;
    setReloadChat: (value: boolean) => void;
}

const NotificationDetail: React.FC<NotificationDetailInterface> = ({
                                                                       type,
                                                                       showNotificationArea,
                                                                       totalNotification,
                                                                       setShowNotificationArea,
                                                                       notifications,
                                                                       setShowChatArea,
                                                                       client,
                                                                       setReloadChat
                                                                   }) => {

    const handleApproChat = () => {
        setShowChatArea(true);
        setReloadChat(true);
        setShowNotificationArea(false);
    }
    return (
        <div style={type === 'user' ? {top: '80px'} : {top: '60px'}} hidden={!showNotificationArea}
             className={'notification-detail-area'}>
            <div className="cart-detail-area-header">
                <div className="cart-detail-area-header-left">
                    <div className="cart-detail-area-header-left-title">
                        Thông báo
                    </div>
                    <div className="cart-detail-area-header-left-des">
                        ({totalNotification} thông báo)
                    </div>
                </div>
                <div className="cart-detail-area-header-right" onClick={() => setShowNotificationArea(false)}>
                    <div className={'cart-detail-area-header-right-text'}>
                        Đóng
                    </div>
                    <div className={'cart-detail-area-header-right-icon'}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
            </div>
            <div style={{marginTop: '10px'}} className="notification-detail-area-content">
                {
                    notifications.map((notification) => (
                        <div className="notification-detail-area-content-item">
                            <div className="notification-detail-area-content-item-left">
                                <div className="notification-detail-area-content-item-top">
                                    <div className="notification-detail-area-content-item-top-message">
                                        {notification.message}
                                    </div>
                                    <div className="notification-detail-area-content-item-top-action" onClick={() => {
                                        handleApproChat();
                                    }}>
                                        {notification.isChat  ? 'Bạn hãy trả lời khách hàng.' : 'Bạn hãy kiểm tra đơn hàng.'}
                                    </div>
                                </div>
                                <div className="notification-detail-area-content-item-bottom">
                                    {formatDateTime(notification.dateCreated ? notification.dateCreated : '')}
                                </div>
                            </div>

                            <div title={'Xóa'} className="notification-detail-area-content-item-right">
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>

                        </div>
                    ))
                }

            </div>
        </div>
    )
}
export default NotificationDetail