-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "id42" TEXT,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tFA_secret" TEXT,
    "tFA_enabled" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FriendRequests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Friends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
);

-- CreateTable
CREATE TABLE "_Blocked" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Members" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Admins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Banned" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Muted" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Invites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_FriendRequests_AB_unique" ON "_FriendRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendRequests_B_index" ON "_FriendRequests"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Friends_AB_unique" ON "_Friends"("A", "B");

-- CreateIndex
CREATE INDEX "_Friends_B_index" ON "_Friends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Blocked_AB_unique" ON "_Blocked"("A", "B");

-- CreateIndex
CREATE INDEX "_Blocked_B_index" ON "_Blocked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Members_AB_unique" ON "_Members"("A", "B");

-- CreateIndex
CREATE INDEX "_Members_B_index" ON "_Members"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Admins_AB_unique" ON "_Admins"("A", "B");

-- CreateIndex
CREATE INDEX "_Admins_B_index" ON "_Admins"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Banned_AB_unique" ON "_Banned"("A", "B");

-- CreateIndex
CREATE INDEX "_Banned_B_index" ON "_Banned"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Muted_AB_unique" ON "_Muted"("A", "B");

-- CreateIndex
CREATE INDEX "_Muted_B_index" ON "_Muted"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Invites_AB_unique" ON "_Invites"("A", "B");

-- CreateIndex
CREATE INDEX "_Invites_B_index" ON "_Invites"("B");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendRequests" ADD CONSTRAINT "_FriendRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendRequests" ADD CONSTRAINT "_FriendRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friends" ADD CONSTRAINT "_Friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friends" ADD CONSTRAINT "_Friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Blocked" ADD CONSTRAINT "_Blocked_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Blocked" ADD CONSTRAINT "_Blocked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Members" ADD CONSTRAINT "_Members_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Members" ADD CONSTRAINT "_Members_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Admins" ADD CONSTRAINT "_Admins_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Admins" ADD CONSTRAINT "_Admins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Banned" ADD CONSTRAINT "_Banned_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Banned" ADD CONSTRAINT "_Banned_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Muted" ADD CONSTRAINT "_Muted_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Muted" ADD CONSTRAINT "_Muted_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Invites" ADD CONSTRAINT "_Invites_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Invites" ADD CONSTRAINT "_Invites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
