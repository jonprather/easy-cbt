import { api } from "../../utils/api";
import type { CBT_FormIdOptionalDataType } from "src/types/CBTFormTypes";
import type { Message } from "../molecules/Chat";
import { chatBotName } from "../molecules/Chat";
interface ChatProps {
  currentStep: number;
  formData: CBT_FormIdOptionalDataType;
  chatHistory: Message[];
  setChatHistory: React.Dispatch<Message[]>;
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
  // Would be better to colocate with columns maybe make it an object with a long name and a short name
  // will have to fix code tho where its used

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
    const userQueries: Message[] =
      chatHistory?.filter((ele) => ele.author === "user") ?? [];

    if (userQueries[userQueries?.length - 1]?.text === "") return false;
    // if (userQueries.length > 1) {
    //   if (
    //     userQueries[userQueries?.length - 1]?.text ===
    //     userQueries[userQueries?.length - 2]?.text
    //   ) {
    //     return false;
    //     // This is too restrictive...
    //   }
    // }
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
        onSuccess: (data: string) => {
          setChatHistory([
            ...chatHistory,
            { author: chatBotName ?? "Chaddie", text: String(data) },
          ]);
        },
      }
    );

  return { data, isLoading, isFetching, isError, error };
};

export default useChat;
