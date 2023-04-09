import React, { useEffect, useState } from "react";
import "./App.css";
import ScrollToBottom from "react-scroll-to-bottom";
function Chats({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((m) => (
            <div
              className="message"
              id={username !== m.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{m.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{m.time}</p>
                  <p id="author">{m.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          value={currentMessage}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chats;
