import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chats from "./Chats";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat && (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="Join..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          ></input>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            value={room}
          ></input>
          <button onClick={joinRoom}>Join</button>
        </div>
      )}
      {showChat && <Chats socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;
