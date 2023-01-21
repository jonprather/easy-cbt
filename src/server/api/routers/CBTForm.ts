import { z } from "zod";
// import { CBT_FormSchema } from "../../../types/CBTFormTypes";
// TODO this import broke not sure why it was working... broke after discord set upIDK why
export const CBT_FormSchema = z.object({
  name: z.string().optional(),
  moodName: z.string().optional(),
  moodLabel: z.string().optional(),
  moodRating: z.number().positive().optional(),
  automaticThoughts: z.array(
    z
      .object({
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
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const CBTFormRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(CBT_FormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user?.id;
        const thoughts = input.automaticThoughts
          .filter((element) => element?.thought && element?.isHot)
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
        const deleteUser = await prisma?.cBT_FormDataType.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});

// TODO set up queries and mutaitons here
//  I started but not right yet
// IDK check veresion of prisma etc check more tuts
