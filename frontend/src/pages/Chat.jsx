import {
  useEffect,
  useRef,
  useState,
} from "react";

import socket from "../services/socket";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Chat() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const userName = user.name || "FoodBridge User";

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Receive messages
  useEffect(() => {

    const receiveMessage = (data) => {

      setMessages((prev) => [
        ...prev,
        data,
      ]);

    };

    socket.on(
      "receiveMessage",
      receiveMessage
    );

    return () => {

      socket.off(
        "receiveMessage",
        receiveMessage
      );

    };

  }, []);

  // Send message
  const sendMessage = () => {

    if (!message.trim()) {
      return;
    }

    const data = {
      sender: userName,
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit(
      "sendMessage",
      data
    );

    // Show message immediately for sender
    setMessages((prev) => [
      ...prev,
      data,
    ]);

    setMessage("");

  };

  // Send using Enter key
  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();
      sendMessage();

    }

  };

  return (

    <div className="min-h-screen bg-[#f7fbf8]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN AREA */}

      <main className="ml-[260px] min-h-screen">

        {/* NAVBAR */}

        <Navbar />

        <section className="px-8 py-6">

          <div className="max-w-7xl mx-auto">

            {/* CHAT HEADER */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="px-7 py-6 border-b border-gray-100">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    {/* CHAT ICON */}

                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl">
                      💬
                    </div>

                    <div>

                      <h1 className="text-2xl font-bold text-gray-800">
                        FoodBridge Chat
                      </h1>

                      <div className="flex items-center gap-2 mt-1">

                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                        <p className="text-sm text-green-600 font-medium">
                          Live community chat
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* USER */}

                  <div className="hidden sm:flex items-center gap-3">

                    <div className="text-right">

                      <p className="text-sm font-semibold text-gray-800">
                        {userName}
                      </p>

                      <p className="text-xs text-gray-500 capitalize">
                        {user.role || "Member"}
                      </p>

                    </div>

                    <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                      {userName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                  </div>

                </div>

              </div>

              {/* CHAT BODY */}

              <div className="p-6">

                <div className="h-[65vh] flex flex-col">

                  {/* MESSAGES */}

                  <div className="flex-1 overflow-y-auto bg-[#f7fbf8] rounded-2xl border border-gray-100 p-5">

                    {messages.length === 0 ? (

                      /* EMPTY STATE */

                      <div className="h-full flex items-center justify-center">

                        <div className="text-center max-w-sm">

                          <div className="w-20 h-20 mx-auto rounded-3xl bg-green-100 flex items-center justify-center text-4xl mb-5">
                            💬
                          </div>

                          <h2 className="text-xl font-bold text-gray-800">
                            Start a conversation
                          </h2>

                          <p className="text-sm text-gray-500 mt-2 leading-6">
                            Communicate with FoodBridge members
                            and coordinate food donations, pickups,
                            and deliveries.
                          </p>

                          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Messages are delivered in real time
                          </div>

                        </div>

                      </div>

                    ) : (

                      <div className="flex flex-col gap-4">

                        {messages.map(
                          (msg, index) => {

                            const isMine =
                              msg.sender ===
                              userName;

                            return (

                              <div
                                key={`${msg.time}-${index}`}
                                className={`flex ${
                                  isMine
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >

                                <div
                                  className={`max-w-[75%] sm:max-w-[60%] ${
                                    isMine
                                      ? "items-end"
                                      : "items-start"
                                  } flex flex-col`}
                                >

                                  {/* SENDER */}

                                  {!isMine && (

                                    <div className="flex items-center gap-2 mb-1 px-2">

                                      <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                                        {msg.sender
                                          ?.charAt(0)
                                          .toUpperCase() || "U"}
                                      </div>

                                      <span className="text-xs font-semibold text-gray-600">
                                        {msg.sender ||
                                          "FoodBridge User"}
                                      </span>

                                    </div>

                                  )}

                                  {/* MESSAGE */}

                                  <div
                                    className={`px-5 py-3.5 rounded-2xl shadow-sm ${
                                      isMine
                                        ? "bg-green-600 text-white rounded-br-md"
                                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                                    }`}
                                  >

                                    <p className="text-[15px] leading-6 break-words">
                                      {msg.text}
                                    </p>

                                    <div
                                      className={`flex items-center justify-end gap-1 mt-1.5 ${
                                        isMine
                                          ? "text-green-100"
                                          : "text-gray-400"
                                      }`}
                                    >

                                      <span className="text-[10px]">
                                        {msg.time}
                                      </span>

                                      {isMine && (
                                        <span className="text-xs">
                                          ✓✓
                                        </span>
                                      )}

                                    </div>

                                  </div>

                                </div>

                              </div>

                            );

                          }
                        )}

                        <div
                          ref={messagesEndRef}
                        />

                      </div>

                    )}

                  </div>

                  {/* MESSAGE INPUT */}

                  <div className="mt-4">

                    <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">

                      <textarea
                        value={message}
                        onChange={(e) =>
                          setMessage(
                            e.target.value
                          )
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Write a message..."
                        rows="1"
                        className="flex-1 resize-none px-4 py-3 outline-none text-sm text-gray-700 placeholder-gray-400 max-h-28"
                      />

                      <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className={`px-6 py-3 rounded-xl font-semibold transition ${
                          message.trim()
                            ? "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <span className="hidden sm:inline">
                          Send
                        </span>

                        <span className="sm:hidden">
                          ➤
                        </span>
                      </button>

                    </div>

                    <p className="text-[11px] text-gray-400 mt-2 px-2">
                      Press Enter to send • Shift + Enter for a new line
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* CHAT INFORMATION */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

              <div className="bg-white rounded-2xl border border-gray-100 p-5">

                

              </div>


            

              </div>

            </div>


        </section>

      </main>

    </div>

  );
}