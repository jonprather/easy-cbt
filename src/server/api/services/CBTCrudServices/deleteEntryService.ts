// messageService.ts
import type { CBT_FormData } from "../../routers/CBTForm";
import type { PrismaClient, cBT_FormDataType } from "@prisma/client";
import validateJournalEntry from "../utils/validateJournalEntry";

type inputObject = {
  id: string;
  userId: string;
  prisma: PrismaClient;
};
const deleteJournalEntry = async function ({
  id,
  userId,
  prisma,
}: inputObject) {
  await validateJournalEntry(userId, id, prisma);
  const deletePost = await prisma?.cBT_FormDataType.delete({
    where: {
      id: id,
    },
  });
  return deletePost;
};

export default deleteJournalEntry;
