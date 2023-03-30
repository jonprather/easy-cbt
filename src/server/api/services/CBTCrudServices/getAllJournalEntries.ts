import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllJournalEntries = async (userId: string) => {
  try {
    return await prisma.cBT_FormDataType.findMany({
      where: {
        userId: userId,
      },
      include: {
        automaticThoughts: true,
      },
    });
  } catch (error) {
    throw new Error(`Error getting form data: ${String(error)}`);
  }
};
