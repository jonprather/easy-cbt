import { z } from "zod";
// import { CBT_FormSchema } from "../../../types/CBTFormTypes";
// TODO this import broke not sure why it was working... broke after discord set upIDK why
import { cBT_FormDataType } from "@prisma/client";
// So i have
import { CBTData } from "src/types/CBTFormTypes";
import { TRPCError, initTRPC } from "@trpc/server";
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
const CBT_FormSchemaWithId = CBT_FormSchema.extend({
  id: z.string(),
});
// TODO maybe just get the prisma types here
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const CBTFormRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(CBT_FormSchema)
    // Replace this with the correct zod schema use the CBTDATA type back to zod
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        const thoughts = input.automaticThoughts
          .filter((element) => element?.thought)
          .map((ele) => ({
            thought: ele?.thought ?? "",
            isHot: ele?.isHot ?? false,
          }));
        await ctx.prisma.cBT_FormDataType.create({
          data: {
            name: input.name,
            moodLabel: input.moodLabel,
            moodName: input.moodName,
            moodRating: input.moodRating,
            automaticThoughts: {
              create: thoughts,
            },
            evidenceFor: input.evidenceFor,
            evidenceAgainst: input.evidenceAgainst,
            newThought: input.newThought,
            rateBelief: input.rateBelief,
            rerateEmotion: input.rerateEmotion,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      } catch (error) {
        // console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          // optional: pass the original error to retain stack trace
          cause: error,
        });
      }
    }),
  // NOT sure why this isnt returning the type with updatedAt on it...
  // so it comes from the prisma schema
  // TODO get to the bottom of this to fix TABLE TS errors that use data.entry.updatedAt
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user?.id;

    return ctx.prisma.cBT_FormDataType.findMany({
      where: {
        userId: userId,
      },
      include: {
        automaticThoughts: true,
      },
    });
    // Need the where clause to make it authorized to one user but if wanted it to be public omit it
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;

      const post = await ctx.prisma?.cBT_FormDataType.findUnique({
        where: {
          id: input?.id,
        },
        include: {
          automaticThoughts: true,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Post with id ${input.id} not found`,
          // optional: pass the original error to retain stack trace
          cause: `Post with id ${input.id} not found`,
        });
      }
      if (post.userId !== userId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `User ${userId} is not authorized to view post ${input.id}`,
          // optional: pass the original error to retain stack trace
          cause: `User ${userId} is not authorized to view post ${input.id}`,
        });
      }
      return post;
    }),

  // TODO extract the logic into anothe rlayer of abstraction to help with testing...

  // So for this id should be required...
  // Or should i have the id be seperate as something passed to it...
  // Ok this works but all is hot and only hot has to be to be saved
  update: protectedProcedure
    .input(CBT_FormSchemaWithId)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;

        const post = await ctx.prisma?.cBT_FormDataType.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!post) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Post with id ${input.id} not found`,
            // optional: pass the original error to retain stack trace
            cause: `Post with id ${input.id} not found`,
          });
        }
        if (post.userId !== userId) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `User ${userId} is not authorized to delete post ${input.id}`,
            // optional: pass the original error to retain stack trace
            cause: `User ${userId} is not authorized to update post ${input.id}`,
          });
        }
        //  Ok in production not sure why this doesnt update correctly anymore...
        //  it doesnt seem to have an effect...
        const antList = await prisma?.automaticThoughts.findMany({
          where: {
            cBT_FormDataTypeId: input.id,
          },
        });
        console.log("ANTLIST AND INPUT", antList, input.automaticThoughts);
        const antDifference = antList?.filter(
          (ele) =>
            !input.automaticThoughts.some((inputAnt) => inputAnt?.id === ele.id)
        );
        const antDeleteArr = antDifference?.map((ele) => ele.id);
        console.log("ANT DIFF", antDifference);
        //so if the element is in input.element then remove it
        // so we are left with the
        const antPrismaUpdateObj = input.automaticThoughts
          .filter((ele) => ele?.id)
          .map((ele) => {
            return {
              data: {
                thought: ele?.thought,
                isHot: ele?.isHot,
                cBT_FormDataType: ele?.cBT_FormDataType,
              },
              where: { id: ele?.id },
            };
          });

        const antPrismaCreateObj = input.automaticThoughts
          .filter((ele) => !ele?.id)
          .map((ele) => {
            return {
              thought: ele?.thought ?? "",
              isHot: ele?.isHot ?? false,
            };
          });

        // how do i handle the id here? i mean if its new it doesnt have and id?? where: {id: ele.id}}})
        const deletedAnts = await ctx.prisma.automaticThoughts.deleteMany({
          where: {
            id: {
              in: antDeleteArr,
            },
          },
        });
        const updatedPost = await ctx.prisma?.cBT_FormDataType.update({
          where: {
            id: input.id,
          },

          data: {
            name: input.name,
            moodLabel: input.moodLabel,
            moodName: input.moodName,
            moodRating: input.moodRating,
            evidenceFor: input.evidenceFor,
            evidenceAgainst: input.evidenceAgainst,
            newThought: input.newThought,
            rateBelief: input.rateBelief,
            rerateEmotion: input.rerateEmotion,
            automaticThoughts: {
              update: antPrismaUpdateObj,
            },
          },
        });

        await ctx.prisma?.cBT_FormDataType.update({
          where: {
            id: input?.id ?? "",
          },
          data: {
            automaticThoughts: {
              create: antPrismaCreateObj,
            },
          },
        });

        return updatedPost;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error updating post ${String(error)}`,
          cause: error,
        });
      }
    }),
  // Ok so this one is a mess not sure how to update the nested field of automatic thoughts...
  // working on it
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      const post = await ctx.prisma?.cBT_FormDataType.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!post) {
        throw new Error(`Post with id ${input.id} not found`);
      }
      if (post.userId !== userId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `User ${userId} is not authorized to delete post ${input.id}`,
          // optional: pass the original error to retain stack trace
          cause: `User ${userId} is not authorized to delete post ${input.id}`,
        });
      }
      const deletePost = await ctx.prisma?.cBT_FormDataType.delete({
        where: {
          id: input.id,
        },
      });
      return deletePost;
    }),
});

// TODO check edge cases again for diff errors add TESTING
