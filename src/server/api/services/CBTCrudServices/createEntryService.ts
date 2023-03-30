// messageService.ts
import type { CBT_FormData } from "../../routers/CBTForm";
import type { PrismaClient, cBT_FormDataType } from "@prisma/client";

interface MessageInput {
  name?: string;
  moodLabel?: string;
  moodName?: string;
  moodRating?: number;
  automaticThoughts?: {
    thought: string;
    isHot: boolean;
  }[];
  evidenceFor?: string;
  evidenceAgainst?: string;
  newThought?: string;
  rateBelief?: number;
  rerateEmotion?: number;
}

interface MessageOutput {
  id: string;
  name: string;
  moodLabel: string;
  moodName: string;
  moodRating: number;
  automaticThoughts: {
    thought: string;
    isHot: boolean;
  }[];
  evidenceFor: string;
  evidenceAgainst: string;
  newThought: string;
  rateBelief: number;
  rerateEmotion: number;
}
type inputObject = {
  input: CBT_FormData;
  userId: string;
  prisma: PrismaClient;
};
const createJournalEntry = async function ({
  input,
  userId,
  prisma,
}: inputObject) {
  const thoughts = input?.automaticThoughts
    ?.filter((element) => element?.thought)
    .map((ele) => ({
      thought: ele?.thought ?? "",
      isHot: ele?.isHot ?? false,
    }));

  const message = await prisma.cBT_FormDataType.create({
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

  return message;
};

export default createJournalEntry;
