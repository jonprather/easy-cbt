import type { Message } from "src/components/molecules/Chat";
import { colNamesLongForm } from "src/components/hooks/useChat";
import type { CBT_FormIdOptionalDataType } from "src/types/CBTFormTypes";
type PromptData = {
  cbtTableColumn: string;
  formData: CBT_FormIdOptionalDataType;
  chatHistory: Message[];
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
  `You are acting as a helpful teacher or therapist guiding a user through learning the basics of CBT. 
    Please provide friendly and supportive guidance on the ${cbtTableColumn} section if it's relevant to the question. If the question happens to be on a different aspect of CBT or the table, please answer that query instead. 
    You also have access to the current form data and can use it to provide more targeted advice and examples.
    If there is something you don't know or if the user asks something inappropriate or outside the context of CBT or basic mental health, kindly inform them that "That is beyond my scope, please seek help elsewhere."`;

const extractUserQuery = (chatHistory: Message[]): string => {
  const userQueryArr: Message[] = chatHistory?.filter(
    (ele) => ele.author === "user"
  );
  const userQuery: string | undefined =
    userQueryArr[userQueryArr?.length - 1]?.text.trim();

  if (!userQuery) {
    throw new Error(`No query was passed in the chat history`);
  }

  return userQuery;
};

const buildPreviousMessage = (chatHistory: Message[]): string => {
  const userQueryArr: Message[] = chatHistory?.filter(
    (ele) => ele.author === "user"
  );
  const botAnswerArray: Message[] = chatHistory?.filter(
    (ele) => ele.author !== "user"
  );
  const previousBotAnswer: string =
    botAnswerArray[botAnswerArray.length - 1]?.text ?? "";
  const previousUserQuestion: string =
    userQueryArr[userQueryArr.length - 2]?.text ?? "";

  return `In case it's needed, here is the prior user query followed by your response: (userQuery: ${previousUserQuestion}), (chatbot reply: "${previousBotAnswer}")`;
};

const buildColumnNamesPrompt = (colNamesLongForm: string[]): string =>
  `In this form, the steps are named in a general way which follows with some notes about columns which may not be clear.${colNamesLongForm.join(
    "; "
  )} Note that "EvidenceFor" provides arguments to support the ANT (stands for "Automatic Negative Thought"), while "EvidenceAgainst" tries to counter the ANT. The
    mood ratings range from low to high, with a scale from 1 to 100. A higher number represents a stronger feeling, for example, feeling very depressed at a rating of 66. After receiving CBT (Cognitive Behavioral Therapy), the rating may lower to 33, indicating a decrease in feelings of depression.`;

export const buildFullPrompt = (input: PromptData): string => {
  const { cbtTableColumn, formData, chatHistory } = input;

  const formDataString = extractFormData(formData).join("; ");
  const generalInformation = buildGeneralInformation(cbtTableColumn);
  const basePrompt = buildBasePrompt(cbtTableColumn);
  const userQuery = extractUserQuery(chatHistory);
  const previousMessage = buildPreviousMessage(chatHistory);
  const columnNamesPrompt = buildColumnNamesPrompt(colNamesLongForm);

  return `${basePrompt} The user has asked: "${userQuery}" 
      Form Columns names and explanation: ${columnNamesPrompt}
      Additional information: "${generalInformation}"
      Prior Chat if applicable: '${previousMessage}'
      Key value pairs of the Current formData: '${formDataString}'
      `;
};
