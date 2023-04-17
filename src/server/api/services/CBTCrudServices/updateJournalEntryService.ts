import validateJournalEntry from "../utils/validateJournalEntry";
import type { PrismaClient } from "@prisma/client";
import type { CBT_FormDataWithId } from "../../routers/CBTForm";
type inputObject = {
  input: CBT_FormDataWithId;
  userId: string;
  prisma: PrismaClient;
};
const updateJournalEntryService = async ({
  input,
  userId,
  prisma,
}: inputObject) => {
  const post = await validateJournalEntry(userId, input.id, prisma);

  const antList = await prisma?.automaticThoughts.findMany({
    where: {
      cBT_FormDataTypeId: input.id,
    },
  });

  const antDifference = antList?.filter(
    (ele) =>
      !input.automaticThoughts.some((inputAnt) => inputAnt?.id === ele.id)
  );
  const antDeleteArr = antDifference?.map((ele) => ele.id);

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

  const deletedAnts = await prisma.automaticThoughts.deleteMany({
    where: {
      id: {
        in: antDeleteArr,
      },
    },
  });
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

  await prisma?.cBT_FormDataType.update({
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
};
export default updateJournalEntryService;
