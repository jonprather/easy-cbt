import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { CBT_FormSchema } from "./CBTForm";
import { z } from "zod";
import { buildFullPrompt } from "../services/buildPromptService";
import { fakeRequest } from "../services/fakeRequestForTesting";
import { getOpenAIChat } from "../services/getOpenAIChat";
import { TRPCError } from "@trpc/server";

const input = z.object({
  cbtTableColumn: z.string(),
  formData: CBT_FormSchema,
  chatHistory: z.array(
    z.object({
      role: z.union([
        z.literal("assistant"),
        z.literal("user"),
        z.literal("system"),
      ]),
      content: z.string(),
    })
  ),
});

export const chatbotRouter = createTRPCRouter({
  askGPT: publicProcedure.input(input).query(async ({ ctx, input }) => {
    try {
      // if (!ctx.session) {
      //   throw new Error(`Sorry, at this time we only allow authenticated users to use this feature.`);
      // }
      const messageArray = buildFullPrompt(input);

      // for testing
      // return fakeRequest(prompt);

      return getOpenAIChat(messageArray);
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `An unexpected error occurred, please try again later. ${String(
          error
        )}`,
        cause: error,
      });
    }
  }),
});
