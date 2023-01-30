import { z } from "zod";
// import { CBT_FormSchema } from "../../../types/CBTFormTypes";
// TODO this import broke not sure why it was working... broke after discord set upIDK why

// So i have
export const CBT_FormSchema = z.object({
  name: z.string().optional(),
  moodName: z.string().optional(),
  moodLabel: z.string().optional(),
  moodRating: z.number().positive().optional(),
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
  rateBelief: z.number().positive().optional(),
  rerateEmotion: z.number().positive().optional(),
});
const CBT_FormSchemaWithId = CBT_FormSchema.extend({
  id: z.string(),
});
// TODO maybe just get the prisma types here
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const CBTFormRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(CBT_FormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        const thoughts = input.automaticThoughts
          .filter((element) => element?.thought)
          .map(({ thought, isHot }) => ({ thought, isHot }));
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
        console.log(error);
      }
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cBT_FormDataType.findMany({
      include: {
        automaticThoughts: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;

      const post = await prisma?.cBT_FormDataType.findUnique({
        where: {
          id: input.id,
        },
        include: {
          automaticThoughts: true,
        },
      });
      if (!post) {
        throw new Error(`Post with id ${input.id} not found`);
      }
      if (post.userId !== userId) {
        throw new Error(
          `User ${userId} is not authorized to access post ${input.id}`
        );
      }
      return post;
    }),

  // So for this id should be required...
  // Or should i have the id be seperate as something passed to it...
  // Ok this works but all is hot and only hot has to be to be saved
  update: protectedProcedure
    .input(CBT_FormSchemaWithId)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;

        const post = await prisma?.cBT_FormDataType.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!post) {
          throw new Error(`Post with id ${input.id} not found`);
        }
        if (post.userId !== userId) {
          throw new Error(
            `User ${userId} is not authorized to delete post ${input.id}`
          );
        }
        // ok this is returning undefined for id...
        // ok so its adding new ones on top of the
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
          .filter((ele) => !ele.id)
          .map((ele) => {
            return {
              thought: ele.thought,
              isHot: ele.isHot,
            };
          });

        // how do i handle the id here? i mean if its new it doesnt have and id?? where: {id: ele.id}}})

        const updatedPost = await prisma?.cBT_FormDataType.update({
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

        const addNewThoughts = await prisma?.cBT_FormDataType.update({
          where: {
            id: input.id,
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
      }
    }),
  // Ok so this one is a mess not sure how to update the nested field of automatic thoughts...
  // working on it
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        const post = await prisma?.cBT_FormDataType.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!post) {
          throw new Error(`Post with id ${input.id} not found`);
        }
        if (post.userId !== userId) {
          throw new Error(
            `User ${userId} is not authorized to delete post ${input.id}`
          );
        }
        // TODO for update and delete make sure it also updates or deletes the AT related to it
        const deletePost = await prisma?.cBT_FormDataType.delete({
          where: {
            id: input.id,
          },
        });
        return deletePost;
      } catch (error) {
        console.log(error);
      }
    }),
});

// TODO set up queries and mutaitons here
//  I started but not right yet
// IDK check veresion of prisma etc check more tuts
//maybe woudl be easier to do ti sepretely ie call auto model and update it manually

// can take the hook logic extract it and add the normal error handler logic in central location etc and loading spinners liek normal

// also
// TODO make sure deletes happen on cascade or if not delete manually
// Can add a you have shown improvement etc celebration
