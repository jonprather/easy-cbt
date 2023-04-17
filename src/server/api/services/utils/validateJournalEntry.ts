import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

async function validateJournalEntry(
  userId: string,
  entryId: string,
  prisma: PrismaClient
) {
  const post = await prisma?.cBT_FormDataType.findUnique({
    where: {
      id: entryId,
    },
    include: {
      automaticThoughts: true,
    },
  });

  if (!post) {
    throw new Error(`Post with id ${entryId} not found`);
  }

  if (post.userId !== userId) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `User ${userId} is not authorized to delete post ${entryId}`,
      cause: `User ${userId} is not authorized to delete post ${entryId}`,
    });
  }

  return post;
}

export default validateJournalEntry;
