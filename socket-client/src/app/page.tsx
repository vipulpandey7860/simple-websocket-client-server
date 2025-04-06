"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3000");

    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
    };

    // event or simply message
    newSocket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && currentMessage) {
      socket.send(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="send message"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>send</button>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </>
  );
}
