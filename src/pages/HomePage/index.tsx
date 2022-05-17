/* eslint-disable no-unreachable */
/* eslint-disable no-octal */
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../constants/index";
import { NotificationToaster } from "../../components/Notification";
import { INotification } from "../../services/Interfaces";
import TimeGif from "../../assets/timer.gif";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import ReactIcon from "../../assets/react.svg";
import MongoDbIcon from "../../assets/mongodb.svg";
import NodeIcon from "../../assets/node.svg";
import SocketIcon from "../../assets/socket.svg";

import "./styles.scss";

type TPostition = { value: string; label: string; default: boolean };
type TTechnologies = { url: string; title: string; icon: any };

const socket = socketIOClient(BASE_URL);

window.onbeforeunload = () => {
  socket.emit("close", sessionStorage.getItem("userId"));
};
const technologies = [
  { title: "React", icon: ReactIcon, url: "https://reactjs.org/" },
  { title: "Node", icon: NodeIcon, url: "https://nodejs.dev/learn" },
  { title: "Mongo DB", icon: MongoDbIcon, url: "https://www.mongodb.com/" },
  { title: "Socket IO", icon: SocketIcon, url: "https://socket.io/docs/v4/" },
];

const positionList = [
  { value: "top-right", label: "Top Right", default: true },
  { value: "bottom-right", label: "Bottom Right", default: false },
  { value: "bottom-left", label: "Bottom Left", default: false },
  { value: "top-left", label: "Top Left", default: false },
];

export const HomePage: React.FC = () => {
  const [message, setMessage] = useState<INotification | null>(null);
  const [position, setPosition] = useState<string>("top-right");

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const removeMessage = async (message: string) => {
    setMessage(null);
    socket.emit("delete", {
      id: sessionStorage.getItem("userId"),
      message: message,
    });
  };

  useEffect(() => {
    setInterval(() => {
      socket.emit("messages", { id: sessionStorage.getItem("userId") });
    }, randomIntFromInterval(5, 10) * 1000);

    socket.on("return", (data: INotification) => {
      setMessage(data);
      setTimeout(() => {
        setMessage(null);
      }, randomIntFromInterval(1, 4) * 1000);
    });

    return () => {
      socket.emit("close", sessionStorage.getItem("userId"));
    };
  }, []);

  return (
    <div>
      <Header />
      <>
        <img className="timer-img" src={TimeGif} alt="" />
        <p>Get Notifcation between 5-10 seconds </p>
      </>

      <h4>Toaster Position</h4>
      <div className="postion-wrapper">
        <div>
          {positionList.map((pos: TPostition) => {
            return (
              <p>
                <input
                  type="radio"
                  value={pos.value}
                  name="position"
                  defaultChecked={pos.default}
                  onChange={(e) => setPosition(e.target.value)}
                />{" "}
                {pos.label}
                <br />
              </p>
            );
          })}
        </div>
      </div>

      <div className="tech-wrapper">
        <h4>Technologies Used</h4>

        <div className="stack-wrapper">
          {technologies.map((tech: TTechnologies) => {
            return <Card url={tech.url} title={tech.title} icon={tech.icon} />;
          })}
        </div>
      </div>

      {message ? (
        <NotificationToaster
          notification={message}
          deleteNotification={(data: string) => removeMessage(data)}
          position={position}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
