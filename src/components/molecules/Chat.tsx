import React, { useState } from "react";
import { FaWindowClose, FaTelegramPlane } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { SiChatbot } from "react-icons/si";
import type { CBT_FormDataType } from "src/types/CBTFormTypes";
import type { ChatMessageI } from "src/server/api/services/getOpenAIChat";
// import * as Dialog from "@radix-ui/react-dialog";

export const chatBotName = "Chaddie";

const introChat =
  "Hi I'm Chaddie I am here to help you with any questions related to this CBT process.";
import useChat from "../hooks/useChat";
type Props = {
  currentStep: number;
  data: CBT_FormDataType;
};
const Chat: React.FC<Props> = ({ currentStep, data }) => {
  const [showChat, setShowChat] = useState(false);
  const [formSubmitted, setformSubmitted] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatMessageI[]>([
    {
      role: "assistant",
      content: introChat,
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  const resetChatHistory = () => {
    setChatHistory([
      {
        role: "assistant",
        content: introChat,
      },
    ]);
  };

  const { isFetching, isError, error } = useChat(
    {
      currentStep,
      formData: data,
      chatHistory,
      setChatHistory,
    },
    { enabled: formSubmitted, onSettled: () => setformSubmitted(false) }
  );
  // TODO refactor- can move the setChatHistory logic inside useChat and pass just the data out

  // TODO make breaks in the comments either based on the response or at a certain limit just break it up.

  const initBotConversation = () => {
    setChatHistory([...chatHistory, { role: "user", content: currentMessage }]);
    setCurrentMessage("");
    setformSubmitted(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initBotConversation();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("IN HANDLEKEY", e, e.key);
    if (currentMessage.trim() === "") return;
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();

      initBotConversation();
    }
  };
  return (
    <div className="fixed right-8 top-10 flex flex-col xs:max-w-7xl ">
      <button
        onClick={toggleChat}
        className="btn-secondary btn-circle btn-lg btn fixed bottom-20 right-4  max-w-xs text-2xl xs:bottom-4 xs:right-4 xs:ml-0"
      >
        {/* <FaQuestionCircle /> */}
        {showChat ? <FaWindowClose /> : <SiChatbot className="text-2xl" />}
      </button>
      {showChat && (
        <div className=" rounded-box fixed bottom-0 right-0  z-50 flex h-[100%] max-h-[80rem] w-full min-w-[20rem] max-w-sm flex-col  overflow-hidden bg-neutral shadow-xl xs:bottom-24 xs:right-4 xs:h-[80%] sm:w-2/3">
          <div className=" justify left-0 flex justify-between  bg-secondary p-4 text-white">
            <span className="text-md flex items-center ">
              <SiChatbot className="mr-3 text-lg" />
              Chaddie
            </span>
            <div className="text-md">
              <button
                onClick={resetChatHistory}
                className="btn-secondary btn-ghost mr-20  text-lg  xs:ml-0"
              >
                <GrPowerReset />
              </button>
              <button
                onClick={toggleChat}
                className="btn-secondary btn-ghost xs:hidden "
              >
                <span className="text-lg">
                  <FaWindowClose />
                </span>
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-auto overflow-y-auto overflow-x-hidden overscroll-contain">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.role === "user" ? "chat-end" : "chat-start"
                } xs:pl-2 xs:pr-2`}
              >
                <div
                  className={`chat-bubble ${
                    message.role === "user"
                      ? "chat-bubble-primary"
                      : "chat-bubble-secondary"
                  }`}
                >
                  {/* <p>{message.author}:</p> */}
                  <p className="text overflow-clip overflow-ellipsis">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isFetching && (
              <div className="xs:pr-2` chat chat-start xs:pl-2">
                <div className={`chat-bubble  chat-bubble-secondary `}>
                  <p>...typing</p>
                </div>
              </div>
            )}
            {isError && (
              <div className="xs:pr-2` chat chat-start xs:pl-2">
                <div className={`chat-bubble  chat-bubble-secondary `}>
                  <p>{error?.message}</p>
                </div>
              </div>
            )}
          </div>
          <div className="relative z-10 bg-secondary p-4 text-white  ">
            <form onSubmit={handleSubmit}>
              <div className="relative mb-1">
                <textarea
                  className="textarea h-12 w-full  resize-none bg-neutral text-white"
                  placeholder="Ask the chatbot something..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="btn-square btn-sm btn absolute bottom-3 right-2 z-50 border-none bg-transparent text-lg  text-gray-300 hover:bg-transparent disabled:bg-transparent disabled:text-gray-500"
                  type="submit"
                  disabled={!currentMessage}
                >
                  <FaTelegramPlane />
                </button>
              </div>
              {/* TODO Could make this work on enter... */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
