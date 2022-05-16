import React, { useEffect, useState } from "react";
import "./styles.scss";
import { NotificationCSS } from "../../constants";
import { INotification } from "../../services/Interfaces";
import CloseIcon from "../../assets/close.svg";

type NotificationToasterProps = {
  notification: INotification;
  deleteNotification: (e: string) => void;
};

type Ttoaster = {
  type: string;
  color: string;
  icon: any;
  message: string;
};
export const NotificationToaster: React.FC<NotificationToasterProps> = ({
  notification,
  deleteNotification,
}) => {
  const [toast, setToaster] = useState<Ttoaster | null>(null);

  const messageMapper = (message: string) => {
    const pieces = message.toUpperCase().split(" ");

    if (pieces.includes("SALE")) {
      message = `${message} !`;
    }

    if (pieces.includes("NEW")) {
      message = `~~ ${message}`;
    }

    if (pieces.includes("LIMITED") && pieces.includes("EDITION")) {
      message = message.toUpperCase();
    }
    return message;
  };

  useEffect(() => {
    const toasterCss: any = NotificationCSS.find(
      (css) => css.type === notification.type
    );
    toasterCss.message = messageMapper(notification.message);
    setToaster(toasterCss);
  }, [notification]);

  return (
    <>
      {toast ? (
        <div className="notification-box notification-pos-wrap">
          <div
            className="box-wrapper notification-pos-wrap"
            style={{ backgroundColor: toast.color }}
          >
            <div className="image-wrapper">
              <img src={toast.icon} alt="" />
            </div>
            <div className="type-message-wrapper">
              <p className="type-content">{toast.type} :</p>
              <p className="message-content">{toast.message}</p>
            </div>
            <button
              className="btn-wrapper"
              onClick={() => deleteNotification(notification.message)}
            >
              <img src={CloseIcon} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
