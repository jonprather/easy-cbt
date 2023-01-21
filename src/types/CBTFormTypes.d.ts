import * as z from "zod";

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

export type CBT_FormDataType = z.infer<typeof CBT_FormSchema>;

// automaticThoughts: z.array(
//   z
//     .object({
//       thought: z.string(),
//       isHot: z.boolean(),
//     })
//     .optional()
// ),
