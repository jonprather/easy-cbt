import { colNamesLongForm } from "src/components/hooks/useChat";
import type { CBT_FormIdOptionalDataType } from "src/types/CBTFormTypes";
import type { ChatMessageI } from "./getOpenAIChat";
type PromptData = {
  cbtTableColumn: string;
  formData: CBT_FormIdOptionalDataType;
  chatHistory: ChatMessageI[];
};

const extractFormData = (formData: CBT_FormIdOptionalDataType): string[] => {
  const extractedData: string[] = [];

  for (const [key, value] of Object.entries(formData)) {
    if (key === "automaticThoughts" && Array.isArray(value)) {
      value?.forEach((thought, index: number) => {
        if (thought && thought.isHot) {
          extractedData.push(
            `Automatic Thought ${index + 1}: ${thought.thought}`
          );
        }
      });
    } else if (value) {
      extractedData.push(`${key}: ${String(value)}`);
    }
  }

  return extractedData;
};

const buildGeneralInformation = (cbtTableColumn: string): string =>
  `You are working on the CBT Table and the user is currently on the step/s of ${cbtTableColumn}`;

const buildBasePrompt = (cbtTableColumn: string): string =>
  `You are acting as a helpful teacher or therapist guiding a user through learning the basics of CBT through a web app with form steps for various parts of the process. 
    Please provide friendly and supportive guidance on the ${cbtTableColumn} section if it's relevant to the question. If the question happens to be on a different aspect of CBT or the table, please answer that query instead. 
    You also have access to the current form data and can use it to provide more targeted advice and examples.
    If there is something you don't know or if the user asks something inappropriate or outside the context of CBT or basic mental health, kindly inform them that "That is beyond my scope, please seek help elsewhere."`;

const extractUserQuery = (chatHistory: ChatMessageI[]): string => {
  const userQueryArr: ChatMessageI[] = chatHistory?.filter(
    (ele) => ele.role === "user"
  );
  const userQuery: string | undefined =
    userQueryArr[userQueryArr?.length - 1]?.content.trim();

  if (!userQuery) {
    throw new Error(`No query was passed in the chat history`);
  }

  return userQuery;
};

const buildPreviousMessage = (chatHistory: ChatMessageI[]) => {
  const userQueryArr: ChatMessageI[] = chatHistory?.filter(
    (ele) => ele.role === "user"
  );
  const botAnswerArray: ChatMessageI[] = chatHistory?.filter(
    (ele) => ele.role === "assistant"
  );
  const previousBotAnswer: string =
    botAnswerArray[botAnswerArray.length - 1]?.content ?? "";
  const previousUserQuestion: string =
    userQueryArr[userQueryArr.length - 2]?.content ?? "";
  return [
    { role: "user", content: previousUserQuestion },
    { role: "assistant", content: previousBotAnswer },
  ];
};

const buildColumnNamesPrompt = (colNamesLongForm: string[]): string =>
  `In this form, the steps are named in a general way which follows with some notes about columns which may not be clear.${colNamesLongForm.join(
    "; "
  )} Note that "EvidenceFor" provides arguments to support the ANT (stands for "Automatic Negative Thought"), while "EvidenceAgainst" tries to counter the ANT. The
    mood ratings range from low to high, with a scale from 1 to 100. A higher number represents a stronger feeling, for example, feeling very depressed at a rating of 66. After receiving CBT (Cognitive Behavioral Therapy), the rating may lower to 33, indicating a decrease in feelings of depression.`;

export const buildFullPrompt = (input: PromptData) => {
  const { cbtTableColumn, formData, chatHistory } = input;

  const formDataString = extractFormData(formData).join("; ");
  const generalInformation = buildGeneralInformation(cbtTableColumn);
  const basePrompt = buildBasePrompt(cbtTableColumn);
  const userQuery = extractUserQuery(chatHistory);
  const [prevUserMessage, prevChatBotMessage] =
    buildPreviousMessage(chatHistory);
  const columnNamesPrompt = buildColumnNamesPrompt(colNamesLongForm);

  const messageArray: ChatMessageI[] = [
    {
      role: "system",
      content: `${basePrompt} how the apps Form Columns names work:${columnNamesPrompt}
      So when a user asks for help use the current step the user on is as context and try to limit your response to just that step to not overwhelm the user with info unless they ask for an overview of the app or the process. Assume the form data given shows you what step they are on.
      `,
    },
    {
      role: "user",
      content: `${generalInformation}.Also Key value pairs of the Current formData: ${formDataString}`,
    },
    {
      role: "user",
      content: `previous user message: ${String(prevUserMessage?.content)}`,
    },
    {
      role: "assistant",
      content: `your Prior assistant message ${String(
        prevChatBotMessage?.content
      )}`,
    },
    {
      role: "user",
      content: `help the user with the following query: ${userQuery}`,
    },
  ];
  return messageArray;
};
