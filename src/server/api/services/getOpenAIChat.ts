import { TRPCError } from "@trpc/server";
import { OpenAIApi, Configuration } from "openai";
import type {
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
      throw new Error("The bot didn't respond. Please try again later.");
    }

    return {
      message: response?.data?.choices[0]?.message?.content,
      messageId: response.data.id,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Error connecting to chat. ${String(error)}`,
      cause: error,
    });
  }
};

// GPT-3 encoder may want to use to track amount of tokens
