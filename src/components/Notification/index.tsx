import React, { useEffect, useState } from "react";
import "./styles.scss";
import { NotificationCSS } from "../../constants";
import { INotification } from "../../services/Interfaces";
import CloseIcon from "../../assets/close.svg";

type NotificationToasterProps = {
  notification: INotification;
  deleteNotification: (e: string) => void;
  position: string;
};

type Ttoaster = {
  type: string;
  color: string;
  textColor: string;
  icon: any;
  message?: string;
};
export const NotificationToaster: React.FC<NotificationToasterProps> = ({
  notification,
  deleteNotification,
  position,
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
      const indexOfLimited = pieces.findIndex((x: string) => x === "LIMITED");
      const indexOfEdition = pieces.findIndex((x: string) => x === "EDITION");
      if (indexOfLimited === indexOfEdition - 1) {
        message = message.toUpperCase();
      }
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
        <div className={`notification-box notification-pos-wrap ${position}`}>
          <div
            className={`box-wrapper notification-pos-wrap ${position}`}
            style={{ backgroundColor: toast.color, color: toast.textColor }}
          >
            <div className="image-wrapper">
              <img src={toast.icon} alt="" />
              <p className="type-content">{toast.type} :</p>
            </div>
            <div className="type-message-wrapper">
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
