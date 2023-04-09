import {
  OpenAIApi,
  Configuration,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage,
} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAI = new OpenAIApi(configuration);
export interface ChatMessageI {
  role: "user" | "system" | "assistant";
  content: string;
}

export const getOpenAIChat = async (
  chatGPTMessages: Array<ChatCompletionRequestMessage>
) => {
  try {
    if (!chatGPTMessages) {
      return {
        text: "No chatGPTMessages",
      };
    }

    const request: CreateChatCompletionRequest = {
      messages: chatGPTMessages,
      model: "gpt-3.5-turbo",
    };

    const response = await openAI.createChatCompletion(request);
    if (!response?.data || !response?.data?.choices) {
      return {
        text: "The bot didn't respond. Please try again later.",
      };
    }

    return {
      message: response?.data?.choices[0]?.message?.content,
      messageId: response.data.id,
    };
  } catch (error) {
    console.log("E: ", error);
    throw new Error(String(error));
  }
};

// GPT-3 encoder may want to use to track amount of tokens
