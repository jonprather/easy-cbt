import { z } from "zod";

import { getAllJournalEntries } from "../services/CBTCrudServices/getAllJournalEntries";
import { TRPCError } from "@trpc/server";
import validateJournalEntry from "../services/utils/validateJournalEntry";
import createJournalEntry from "../services/CBTCrudServices/createEntryService";
import deleteJournalEntry from "../services/CBTCrudServices/deleteEntryService";
import updateJournalEntryService from "../services/CBTCrudServices/updateJournalEntryService";
const sortBySchema = z.union([
  z.literal("createdAt"),
  z.literal("updatedAt"),
  z.literal("id"),
  z.literal("name"),
]);
export type TSortBy = z.infer<typeof sortBySchema>;
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

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const CBTFormRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(CBT_FormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        const data = await createJournalEntry({
          input,
          userId,
          prisma: ctx.prisma,
        });
        return data;
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

  getBatch: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        searchQuery: z.string().optional(),
        moodName: z.string().optional(),
        sortBy: z.object({
          property: z.union([
            z.literal("createdAt"),
            z.literal("updatedAt"),
            z.literal("id"),
            z.literal("name"),
          ]),
          direction: z.union([z.literal("asc"), z.literal("desc")]),
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      const { limit, skip, cursor, searchQuery, moodName, sortBy } = input;
      const trimmedSearchQuery = searchQuery?.trim();
      const trimmedMoodName = moodName?.trim();
      const { property, direction } = sortBy;
      const totalCount = await ctx.prisma.cBT_FormDataType.count({
        where: {
          userId: userId,
          name:
            trimmedSearchQuery && trimmedSearchQuery.length > 0
              ? {
                  contains: trimmedSearchQuery,
                  mode: "insensitive",
                }
              : undefined,
          moodName:
            trimmedMoodName && trimmedMoodName.length > 0
              ? {
                  contains: trimmedMoodName,
                  mode: "insensitive",
                }
              : undefined,
        },
      });
      const pageCount = Math.ceil(totalCount / limit);
      const items = await ctx.prisma.cBT_FormDataType.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy:
          property && direction
            ? {
                [property]: direction,
              }
            : undefined,
        where: {
          userId: userId,
          name:
            trimmedSearchQuery && trimmedSearchQuery.length > 0
              ? {
                  contains: trimmedSearchQuery,
                  mode: "insensitive",
                }
              : undefined,
          moodName:
            trimmedMoodName && trimmedMoodName.length > 0
              ? {
                  contains: trimmedMoodName,
                  mode: "insensitive",
                }
              : undefined,
        },

        include: {
          automaticThoughts: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
        pageCount,
      };
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
