import type { PrismaClient, cBT_FormDataType } from "@prisma/client";
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
      // optional: pass the original error to retain stack trace
      cause: `User ${userId} is not authorized to delete post ${entryId}`,
    });
  }

  return post;
}

export default validateJournalEntry;

// Ok TODO this should work now replace this in RUD parts read one uses it

//can also abstract the DB layer and use dep injection rather than passing prisma directly can create a fn to use persistance layer
// and have that layer be dep injected....
