import { z } from "zod";
// import { CBT_FormSchema } from "../../../types/CBTFormTypes";
// TODO this import broke not sure why it was working... broke after discord set upIDK why
// TODO refactor into own controllers
// also can refactor throws to be more concise ie dont have to build TRPC error in multiple spots just in catch
//  and throw in the prior locaitons

import { getAllJournalEntries } from "../services/CBTCrudServices/getAllJournalEntries";
import { TRPCError } from "@trpc/server";
import validateJournalEntry from "../services/utils/validateJournalEntry";
import createJournalEntry from "../services/CBTCrudServices/createEntryService";
import deleteJournalEntry from "../services/CBTCrudServices/deleteEntryService";
import updateJournalEntryService from "../services/CBTCrudServices/updateJournalEntryService";
export const CBT_FormSchema = z.object({
  name: z.string().optional(),
  moodName: z.string().optional(),
  moodLabel: z.string().optional(),
  moodRating: z.number().optional(),
  automaticThoughts: z.array(
    z
      .object({
        id: z.string().optional(),
        thought: z.string(),
        isHot: z.boolean(),
        cBT_FormDataType: z
          .object({
            id: z.string(),
          })
          .optional(),
      })
      .optional()
  ),
  evidenceFor: z.string().optional(),
  evidenceAgainst: z.string().optional(),
  newThought: z.string().optional(),
  rateBelief: z.number().optional(),
  rerateEmotion: z.number().optional(),
});
export type CBT_FormData = z.infer<typeof CBT_FormSchema>;
const CBT_FormSchemaWithId = CBT_FormSchema.extend({
  id: z.string(),
});
export type CBT_FormDataWithId = z.infer<typeof CBT_FormSchemaWithId>;

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const CBTFormRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(CBT_FormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        await createJournalEntry({ input, userId, prisma: ctx.prisma });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `An unexpected error occurred, please try again later. ERROR: ${String(
            error
          )}`,
          cause: error,
        });
      }
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    try {
      const userId = ctx.session.user?.id;
      const data = getAllJournalEntries(userId);
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Error getting post ${String(error)}`,
        cause: error,
      });
    }
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        const post = await validateJournalEntry(userId, input?.id, ctx.prisma);

        return post;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error getting post ${String(error)}`,
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(CBT_FormSchemaWithId)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;

        const updatedPost = await updateJournalEntryService({
          input,
          userId,
          prisma: ctx.prisma,
        });

        return updatedPost;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error updating post ${String(error)}`,
          cause: error,
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        await validateJournalEntry(userId, input?.id, ctx.prisma);
        const deletePost = await deleteJournalEntry({
          userId,
          id: input?.id,
          prisma: ctx.prisma,
        });

        return deletePost;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error deleting post ${String(error)}`,
          cause: error,
        });
      }
    }),
});

// TODO check edge cases again for diff errors add TESTING
// TODO  also check error is properly thrown
// consider persistence layer abstraction
// Also make sure it sorts by most recent...  on top of table display
