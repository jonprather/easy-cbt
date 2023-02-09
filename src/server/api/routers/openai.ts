import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CBT_FormSchema } from "./CBTForm";
import { z } from "zod";

import type { Message } from "src/components/molecules/Chat";

const input = z.object({
  cbtTableColumn: z.string(),
  formData: CBT_FormSchema,
  chatHistory: z.array(
    z.object({
      author: z.union([z.literal("Chaddie"), z.literal("user")]),
      text: z.string(),
    })
  ),
});
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatbotRouter = createTRPCRouter({
  askGPT: protectedProcedure.input(input).query(async ({ ctx, input }) => {
    try {
      if (!ctx.session) {
        throw new Error(`You are not authorized to access post This feature.`);
      }

      // Extract the prompt, contextual information, and user's query from the request
      const { cbtTableColumn, formData, chatHistory } = input;

      const generalInformation = `You are working on the CBT Table and the user is currently on the step/s of ${cbtTableColumn}`;

      const basePrompt = `You are acting as a helpful teacher or therapist guiding a user through learning the basics of CBT. 
      Please provide friendly and supportive guidance on the ${cbtTableColumn} section if its relevant to the question. If the question happens to be on a different aspect of CBT or the table please answer that query instead. 
      If there is something you don't know or if the user asks something inappropriate or outside the context of CBT or basic mental health, kindly inform them that "That is beyond my scope, please seek help elsewhere."`;
      // TODO extract user query from history array ie top of stack to place below
      //

      const userQueryArr: Message[] = chatHistory?.filter(
        (ele) => ele.author === "user"
      );
      const botAnswerArray: Message[] = chatHistory?.filter(
        (ele) => ele.author !== "user"
      );
      const userQuery: string | undefined =
        userQueryArr[userQueryArr?.length - 1]?.text.trim();

      if (!userQuery) {
        throw new Error(`No query was passed in the chat history`);
      }
      let previousUserQuestion = "";
      let previousBotAnswer = "";

      if (botAnswerArray.length > 0) {
        previousBotAnswer =
          botAnswerArray[botAnswerArray.length - 1]?.text ?? "";
      }
      if (userQuery.length > 1) {
        previousUserQuestion =
          userQueryArr[userQueryArr.length - 2]?.text ?? "";
      }
      const lastMessage = `In case its needed here is the prior user query followed by your response: (userQuery: ${previousUserQuestion}), (chatbot reply: "${previousBotAnswer}"`;

      const fullPrompt = `${basePrompt} The user has asked: "${userQuery}" 
      Additional information: "${generalInformation}"
      Prior Chat if applicable: '${lastMessage}'
      `;

      //   For testing... return this rather than use OPENAI tokens
      const fakeRequest = (text: string): Promise<string> =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const shouldReject = Math.random() < 0.5;
            if (shouldReject) {
              reject(new Error("Request failed"));
            } else {
              resolve(text);
            }
          }, 2000);
        });

      return fakeRequest(userQuery);

      //   const response = await openai.createCompletion({
      //     model: "text-davinci-003",
      //     prompt: fullPrompt,
      //     temperature: 0,
      //     max_tokens: 200,
      //   });

      //   return response?.data?.choices[0]?.text;
    } catch (error) {
      return {
        error: error,
      };
    }
  }),
});