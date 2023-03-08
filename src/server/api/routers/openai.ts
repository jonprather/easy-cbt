import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { CBT_FormSchema } from "./CBTForm";
import { z } from "zod";
import { buildFullPrompt } from "../services/buildPromptService";
import { fakeRequest } from "../services/fakeRequestForTesting";
import { getOpenAIChat } from "../services/getOpenAIChat";

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

export const chatbotRouter = createTRPCRouter({
  askGPT: publicProcedure.input(input).query(async ({ ctx, input }) => {
    try {
      // if (!ctx.session) {
      //   throw new Error(`You are not authorized to access This feature.`);
      // }
      const prompt = buildFullPrompt(input);

      // for testing
      // return fakeRequest(prompt);

      return getOpenAIChat(prompt);
    } catch (error) {
      return error;
    }
  }),
});
