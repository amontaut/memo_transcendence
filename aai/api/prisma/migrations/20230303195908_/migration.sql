/*
  Warnings:

  - You are about to drop the `_FriendRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FriendRequests" DROP CONSTRAINT "_FriendRequests_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendRequests" DROP CONSTRAINT "_FriendRequests_B_fkey";

-- DropTable
DROP TABLE "_FriendRequests";

-- CreateTable
CREATE TABLE "_FriendRequestsReceived" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FriendRequestsSent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendRequestsReceived_AB_unique" ON "_FriendRequestsReceived"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendRequestsReceived_B_index" ON "_FriendRequestsReceived"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FriendRequestsSent_AB_unique" ON "_FriendRequestsSent"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendRequestsSent_B_index" ON "_FriendRequestsSent"("B");

-- AddForeignKey
ALTER TABLE "_FriendRequestsReceived" ADD CONSTRAINT "_FriendRequestsReceived_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendRequestsReceived" ADD CONSTRAINT "_FriendRequestsReceived_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendRequestsSent" ADD CONSTRAINT "_FriendRequestsSent_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendRequestsSent" ADD CONSTRAINT "_FriendRequestsSent_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
