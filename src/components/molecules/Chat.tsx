import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { SiChatbot } from "react-icons/si";
import type { CBT_FormDataType } from "src/types/CBTFormTypes";
export const chatBotName = "Chaddie";
export interface Message {
  author: "user" | typeof chatBotName;
  text: string;
}

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

  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      author: chatBotName,
      text: introChat,
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  const resetChatHistory = () => {
    setChatHistory([
      {
        author: chatBotName,
        text: introChat,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setChatHistory([...chatHistory, { author: "user", text: currentMessage }]);
    setCurrentMessage("");
    setformSubmitted(true);
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
        <div className="rounded-box fixed bottom-20 right-0 flex h-[80%] max-h-[80rem] w-full min-w-[20rem] max-w-sm  flex-col overflow-hidden bg-white shadow-xl xs:bottom-24 xs:right-4 sm:w-2/3">
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
          <div className="flex-grow overflow-y-scroll">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.author === "user" ? "chat-end" : "chat-start"
                } xs:pl-2 xs:pr-2`}
              >
                <div
                  className={`chat-bubble ${
                    message.author === "user"
                      ? "chat-bubble-primary"
                      : "chat-bubble-secondary"
                  }`}
                >
                  {/* <p>{message.author}:</p> */}
                  <p className="text overflow-clip overflow-ellipsis">
                    {message.text}
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
          <div className="  bg-secondary p-4 text-white xs:right-6 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <textarea
                  className="textarea h-12 w-full bg-white  text-black"
                  placeholder="Ask the chatbot something..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
              </div>
              {/* TODO Could make this work on enter... */}
              <button
                className="btn-accent btn"
                type="submit"
                disabled={!currentMessage}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

// TODO better validation ie when they are blocked or when error etc
// when loading if do it this way
//streaming might be cool to do...
// TODO yes just better UX like the scroll to bottom and
// Yeah and handle errors and stuff
// This would be a good time to save work for this basic draft...
