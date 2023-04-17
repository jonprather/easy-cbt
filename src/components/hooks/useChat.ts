import { api } from "../../utils/api";
import type { CBT_FormIdOptionalDataType } from "src/types/CBTFormTypes";
import { chatBotName } from "../molecules/Chat";
import type { ChatMessageI } from "src/server/api/services/getOpenAIChat";
interface ChatProps {
  currentStep: number;
  formData: CBT_FormIdOptionalDataType;
  chatHistory: ChatMessageI[];
  setChatHistory: React.Dispatch<ChatMessageI[]>;
}
export const colNamesLongForm = [
  "select mood and rate the intensity of the mood",
  "Automatic Negative thoughts",
  "Evidence For the negative thought.",
  "Evidence against the negative thought",
  "New balanced Thought",
  "Rate belief in thought and rerate the strong mood.",
];
function getColumn(currentStep: number) {
  if (colNamesLongForm[currentStep]) {
    return colNamesLongForm[currentStep] ?? "";
  }
  return "";
}
const useChat = (
  { currentStep = 0, formData, chatHistory, setChatHistory }: ChatProps,
  { enabled, onSettled }: { enabled: boolean; onSettled: () => void }
) => {
  const queryIsAcceptable = () => {
    const userQueries: ChatMessageI[] =
      chatHistory?.filter((ele) => ele.role === "user") ?? [];

    if (userQueries[userQueries?.length - 1]?.content === "") return false;
    return true;
  };
  try {
  } catch (error) {}
  const { data, isLoading, isFetching, isError, error } =
    api.chatbot.askGPT.useQuery(
      {
        cbtTableColumn: getColumn(currentStep),
        chatHistory,
        formData,
      },
      {
        enabled: enabled && queryIsAcceptable(),
        onSettled,
        onSuccess: (data: { message: string; messageId: string }) => {
          console.log("DATA RESPONSE ", data);
          setChatHistory([
            ...chatHistory,
            { role: "assistant", content: data.message },
          ]);
        },
      }
    );

  return { data, isLoading, isFetching, isError, error };
};

export default useChat;
