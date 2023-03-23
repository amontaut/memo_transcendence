-- CreateEnum
CREATE TYPE "Status" AS ENUM ('GOING', 'ENDED');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('EASY', 'NORMAL', 'HARD');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "craetedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'GOING',
    "mode" "Mode" NOT NULL DEFAULT 'NORMAL',
    "player_oneId" INTEGER NOT NULL,
    "player_twoId" INTEGER,
    "player_onePoints" INTEGER,
    "player_twoPoints" INTEGER,
    "winnerId" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_player_oneId_fkey" FOREIGN KEY ("player_oneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_player_twoId_fkey" FOREIGN KEY ("player_twoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
