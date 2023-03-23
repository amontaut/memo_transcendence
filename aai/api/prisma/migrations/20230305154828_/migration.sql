/*
  Warnings:

  - Made the column `player_onePoints` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `player_twoPoints` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "player_onePoints" SET NOT NULL,
ALTER COLUMN "player_onePoints" SET DEFAULT 0,
ALTER COLUMN "player_twoPoints" SET NOT NULL,
ALTER COLUMN "player_twoPoints" SET DEFAULT 0;
