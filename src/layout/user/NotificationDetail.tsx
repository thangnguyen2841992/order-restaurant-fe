import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {formatDateTime} from "../../api/Public-Api";
import Notification from "../../model/Notification";

interface NotificationDetailInterface {
    showNotificationArea : boolean;
    totalNotification : number;
    notifications : Notification[];
    setShowNotificationArea : (value : boolean) => void;
}
const NotificationDetail: React.FC<NotificationDetailInterface> = ({showNotificationArea, totalNotification, setShowNotificationArea, notifications}) => {
  return (
      <div hidden={!showNotificationArea} className={'notification-detail-area'}>
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
          <div style={{marginTop : '10px'}} className="notification-detail-area-content">
              {
                  notifications.map((notification) => (
                      <div className="notification-detail-area-content-item">
                          <div className="notification-detail-area-content-item-top">
                              {notification.message}
                          </div>
                          <div className="notification-detail-area-content-item-bottom">
                              {formatDateTime(notification.dateCreated ? notification.dateCreated : '')}
                          </div>
                      </div>
                  ))
              }

          </div>
      </div>
  )
}
export default NotificationDetail