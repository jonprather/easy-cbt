/*
  Warnings:

  - You are about to drop the column `rateMood` on the `CBT_FormDataType` table. All the data in the column will be lost.
  - Added the required column `nameMoodId` to the `CBT_FormDataType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CBT_FormDataType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "moodLabel" TEXT,
    "moodName" TEXT,
    "moodRating" INTEGER,
    "evidenceFor" TEXT,
    "evidenceAgainst" TEXT,
    "newThought" TEXT,
    "rateBelief" INTEGER,
    "rerateEmotion" INTEGER,
    "userId" TEXT NOT NULL,
    "nameMoodId" TEXT NOT NULL,
    CONSTRAINT "CBT_FormDataType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CBT_FormDataType" ("evidenceAgainst", "evidenceFor", "id", "name", "newThought", "rateBelief", "rerateEmotion", "userId") SELECT "evidenceAgainst", "evidenceFor", "id", "name", "newThought", "rateBelief", "rerateEmotion", "userId" FROM "CBT_FormDataType";
DROP TABLE "CBT_FormDataType";
ALTER TABLE "new_CBT_FormDataType" RENAME TO "CBT_FormDataType";
CREATE UNIQUE INDEX "CBT_FormDataType_nameMoodId_key" ON "CBT_FormDataType"("nameMoodId");
CREATE TABLE "new_NameMood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "CBT_FormDataTypeId" TEXT,
    "cBT_FormDataTypeId" TEXT,
    CONSTRAINT "NameMood_cBT_FormDataTypeId_fkey" FOREIGN KEY ("cBT_FormDataTypeId") REFERENCES "CBT_FormDataType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NameMood" ("CBT_FormDataTypeId", "id", "label", "value") SELECT "CBT_FormDataTypeId", "id", "label", "value" FROM "NameMood";
DROP TABLE "NameMood";
ALTER TABLE "new_NameMood" RENAME TO "NameMood";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
